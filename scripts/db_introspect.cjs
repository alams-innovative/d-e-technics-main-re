// Read-only Postgres introspection script (CommonJS)
// Usage: node scripts/db_introspect.cjs "postgresql://user:pass@host/db?sslmode=require"

const { Client } = require('pg')

async function main() {
  const connStr = process.argv[2] || process.env.DATABASE_URL
  if (!connStr) {
    console.error('Missing DATABASE_URL. Pass as first arg or set env DATABASE_URL.')
    process.exit(1)
  }
  const client = new Client({ connectionString: connStr, ssl: { rejectUnauthorized: false } })
  await client.connect()

  const queries = {
    tables: `
      select table_schema, table_name, table_type
      from information_schema.tables
      where table_schema not in ('pg_catalog','information_schema')
      order by table_schema, table_name;
    `,
    columns: `
      select table_schema, table_name, column_name, data_type, is_nullable,
             column_default, udt_name, character_maximum_length, numeric_precision, numeric_scale
      from information_schema.columns
      where table_schema not in ('pg_catalog','information_schema')
      order by table_schema, table_name, ordinal_position;
    `,
    constraints: `
      select tc.table_schema, tc.table_name, tc.constraint_name, tc.constraint_type,
             kcu.column_name, ccu.table_schema as foreign_table_schema,
             ccu.table_name as foreign_table_name, ccu.column_name as foreign_column_name
      from information_schema.table_constraints tc
      left join information_schema.key_column_usage kcu
        on tc.constraint_name = kcu.constraint_name and tc.table_schema = kcu.table_schema and tc.table_name = kcu.table_name
      left join information_schema.constraint_column_usage ccu
        on tc.constraint_name = ccu.constraint_name and tc.table_schema = ccu.table_schema
      where tc.table_schema not in ('pg_catalog','information_schema')
      order by tc.table_schema, tc.table_name, tc.constraint_name;
    `,
    indexes: `
      select schemaname as table_schema, tablename as table_name, indexname, indexdef
      from pg_indexes
      where schemaname not in ('pg_catalog','information_schema')
      order by schemaname, tablename, indexname;
    `,
    enums: `
      select n.nspname as enum_schema, t.typname as enum_name, e.enumlabel as enum_value
      from pg_type t
      join pg_enum e on t.oid = e.enumtypid
      join pg_catalog.pg_namespace n on n.oid = t.typnamespace
      where n.nspname not in ('pg_catalog','information_schema')
      order by enum_schema, enum_name, e.enumsortorder;
    `,
    extensions: `
      select extname as extension, extversion as version from pg_extension order by extname;
    `
  }

  const result = {}
  for (const [key, sql] of Object.entries(queries)) {
    const { rows } = await client.query(sql)
    result[key] = rows
  }

  await client.end()
  console.log(JSON.stringify(result))
}

main().catch(err => {
  console.error('Introspection failed:', err.message)
  process.exit(1)
})
