// scripts/db-inspect.js
// Run: node scripts/db-inspect.js
// Uses DATABASE_URL from .env.local in the project root

import { Pool } from 'pg'
import fs from 'fs'
import path from 'path'

function loadEnvLocal() {
  try {
    const envPath = path.resolve(process.cwd(), '.env.local')
    const content = fs.readFileSync(envPath, 'utf8')
    const env = {}
    for (const rawLine of content.split('\n')) {
      const line = rawLine.trim()
      if (!line || line.startsWith('#')) continue
      const eq = line.indexOf('=')
      if (eq === -1) continue
      const key = line.slice(0, eq).trim()
      let value = line.slice(eq + 1).trim()
      // strip surrounding quotes
      value = value.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1')
      env[key] = value
    }
    return env
  } catch {
    return {}
  }
}

async function main() {
  const env = { ...process.env, ...loadEnvLocal() }
  const connectionString = env.DATABASE_URL
  if (!connectionString) {
    console.error('❌ DATABASE_URL not found in .env.local or environment')
    process.exit(1)
  }

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  })

  try {
    // 1) All tables (public)
    const tablesRes = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `)
    const tables = tablesRes.rows.map(r => r.table_name)

    console.log('=== TABLES (public) ===')
    tables.forEach(t => console.log(`- ${t}`))
    console.log('')

    // For each table: columns, types, constraints, first 5 rows
    for (const table of tables) {
      console.log(`=== TABLE: ${table} ===`)

      // 2) All columns
      const colsRes = await pool.query(
        `
        SELECT 
          column_name,
          data_type,
          character_maximum_length,
          is_nullable,
          column_default
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = $1
        ORDER BY ordinal_position
        `,
        [table]
      )

      console.log('> COLUMNS:')
      for (const c of colsRes.rows) {
        const type =
          c.character_maximum_length
            ? `${c.data_type}(${c.character_maximum_length})`
            : c.data_type
        console.log(
          `  - ${c.column_name} | ${type} | ${c.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}${c.column_default ? ` | DEFAULT ${c.column_default}` : ''}`
        )
      }

      // 3) Primary key(s)
      const pkRes = await pool.query(
        `
        SELECT
          tc.constraint_name,
          kcu.column_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
        WHERE tc.table_schema = 'public'
          AND tc.table_name = $1
          AND tc.constraint_type = 'PRIMARY KEY'
        ORDER BY kcu.ordinal_position
        `,
        [table]
      )
      if (pkRes.rows.length) {
        const pkCols = pkRes.rows.map(r => r.column_name)
        console.log('> PRIMARY KEY:')
        console.log(`  - (${pkCols.join(', ')})`)
      } else {
        console.log('> PRIMARY KEY:')
        console.log('  - none')
      }

      // 4) Unique constraints
      const uqRes = await pool.query(
        `
        SELECT
          tc.constraint_name,
          STRING_AGG(kcu.column_name, ', ' ORDER BY kcu.ordinal_position) AS columns
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
        WHERE tc.table_schema = 'public'
          AND tc.table_name = $1
          AND tc.constraint_type = 'UNIQUE'
        GROUP BY tc.constraint_name
        ORDER BY tc.constraint_name
        `,
        [table]
      )
      console.log('> UNIQUE CONSTRAINTS:')
      if (uqRes.rows.length) {
        for (const r of uqRes.rows) {
          console.log(`  - ${r.constraint_name}: (${r.columns})`)
        }
      } else {
        console.log('  - none')
      }

      // 5) Foreign keys (and rules)
      const fkRes = await pool.query(
        `
        SELECT
          tc.constraint_name,
          kcu.column_name,
          ccu.table_name AS foreign_table_name,
          ccu.column_name AS foreign_column_name,
          rc.update_rule,
          rc.delete_rule
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
        JOIN information_schema.referential_constraints AS rc
          ON tc.constraint_name = rc.constraint_name
          AND tc.table_schema = rc.constraint_schema
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
          AND ccu.table_schema = tc.table_schema
        WHERE tc.table_schema = 'public'
          AND tc.table_name = $1
          AND tc.constraint_type = 'FOREIGN KEY'
        ORDER BY tc.constraint_name, kcu.ordinal_position
        `,
        [table]
      )
      console.log('> FOREIGN KEYS:')
      if (fkRes.rows.length) {
        for (const fk of fkRes.rows) {
          console.log(
            `  - ${fk.constraint_name}: ${fk.column_name} -> ${fk.foreign_table_name}(${fk.foreign_column_name}) [on update ${fk.update_rule}, on delete ${fk.delete_rule}]`
          )
        }
      } else {
        console.log('  - none')
      }

      // 6) First 5 rows
      console.log('> FIRST 5 ROWS:')
      try {
        const sampleRes = await pool.query(`SELECT * FROM "${table}" LIMIT 5`)
        if (sampleRes.rows.length === 0) {
          console.log('  - no rows')
        } else {
          for (const row of sampleRes.rows) {
            console.log('  -', JSON.stringify(row))
          }
        }
      } catch (e) {
        console.log('  - failed to fetch rows:', e.message)
      }

      console.log('') // spacer per table
    }
  } finally {
    await pool.end()
  }
}

main().catch(err => {
  console.error('❌ Error:', err?.message || err)
  process.exit(1)
})
