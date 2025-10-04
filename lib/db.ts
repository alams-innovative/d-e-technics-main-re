// lib/db.ts
import { Pool } from 'pg'

let pool: Pool | null = null

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      min: 2,
      max: 10,
      idleTimeoutMillis: 30000,
    })

    // Ensure TLS is required for production
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL?.includes('sslmode=require')) {
      console.warn('⚠️  DATABASE_URL should include ?sslmode=require for production')
    }
  }
  return pool
}

export async function query(text: string, params?: any[]) {
  const pool = getPool()
  const client = await pool.connect()
  try {
    const result = await client.query(text, params)
    return result
  } finally {
    client.release()
  }
}

export async function transaction<T>(callback: (client: any) => Promise<T>): Promise<T> {
  const pool = getPool()
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await callback(client)
    await client.query('COMMIT')
    return result
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}
