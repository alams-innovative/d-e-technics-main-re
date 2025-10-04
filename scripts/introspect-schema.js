// scripts/introspect-schema.js
// Read-only database introspection for countries/contacts/quotes tables
import { Pool } from 'pg'
import fs from 'fs'

function loadEnvFile() {
  try {
    const envFile = fs.readFileSync('.env.local', 'utf8')
    const envVars = {}
    envFile.split('\n').forEach(line => {
      line = line.trim()
      if (line && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=')
        if (key && valueParts.length > 0) {
          envVars[key] = valueParts.join('=').replace(/^"(.*)"$/, '$1')
        }
      }
    })
    return envVars
  } catch (e) {
    console.error('Failed to read .env.local:', e.message)
    return {}
  }
}

async function run() {
  const env = loadEnvFile()
  if (!env.DATABASE_URL) {
    console.error('DATABASE_URL not found in .env.local')
    process.exit(1)
  }

  const pool = new Pool({
    connectionString: env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  })

  const client = await pool.connect()
  try {
    console.log('=== Columns (countries, contacts, quotes) ===')
    const cols = await client.query(`
      SELECT table_name, column_name, data_type, character_maximum_length AS max_len, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name IN ('countries','contacts','quotes')
      ORDER BY table_name, ordinal_position
    `)
    for (const r of cols.rows) {
      console.log(`${r.table_name}.${r.column_name} -> ${r.data_type}${r.max_len ? `(${r.max_len})` : ''} ${r.is_nullable}`)
    }

    console.log('\n=== Foreign Keys (contacts, quotes) ===')
    const fks = await client.query(`
      SELECT
        con.conname AS constraint_name,
        rel.relname AS table_name,
        att2.attname AS column_name,
        rel_conf.relname AS referenced_table,
        att.attname AS referenced_column,
        con.condeferrable,
        con.condeferred
      FROM pg_constraint con
      JOIN pg_class rel ON rel.oid = con.conrelid
      JOIN pg_namespace nsp ON nsp.oid = rel.relnamespace
      JOIN pg_class rel_conf ON rel_conf.oid = con.confrelid
      JOIN pg_attribute att ON att.attrelid = rel_conf.oid AND att.attnum = con.confkey[1]
      JOIN pg_attribute att2 ON att2.attrelid = rel.oid AND att2.attnum = con.conkey[1]
      WHERE con.contype = 'f'
        AND nsp.nspname = 'public'
        AND rel.relname IN ('contacts','quotes')
      ORDER BY rel.relname, con.conname
    `)
    for (const r of fks.rows) {
      console.log(`${r.constraint_name}: ${r.table_name}.${r.column_name} -> ${r.referenced_table}.${r.referenced_column} deferrable=${r.condeferrable} initially_deferred=${r.condeferred}`)
    }
  } finally {
    client.release()
    await pool.end()
  }
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
