// app/api/test-db/route.ts
import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { logger } from '@/lib/logger'

export const runtime = 'nodejs'

export async function GET() {
  const requestId = crypto.randomUUID()
  
  try {
    // Test basic database connectivity
    const testQuery = await query('SELECT NOW() as current_time, version() as db_version')
    
    // Test quotes table exists
    const quotesTest = await query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'quotes' 
      ORDER BY ordinal_position
    `)
    
    // Test contacts table exists
    const contactsTest = await query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'contacts' 
      ORDER BY ordinal_position
    `)
    
    // Test countries table exists
    const countriesTest = await query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'countries' 
      ORDER BY ordinal_position
    `)
    
    // Test sample data
    const quotesCount = await query('SELECT COUNT(*) as count FROM quotes')
    const contactsCount = await query('SELECT COUNT(*) as count FROM contacts')
    const countriesCount = await query('SELECT COUNT(*) as count FROM countries')
    
    return NextResponse.json({
      status: 'Database connection successful',
      requestId,
      database: {
        time: testQuery.rows[0]?.current_time,
        version: testQuery.rows[0]?.db_version
      },
      tables: {
        quotes: {
          exists: quotesTest.rows.length > 0,
          columns: quotesTest.rows.map(r => ({ name: r.column_name, type: r.data_type })),
          count: quotesCount.rows[0]?.count || 0
        },
        contacts: {
          exists: contactsTest.rows.length > 0,
          columns: contactsTest.rows.map(r => ({ name: r.column_name, type: r.data_type })),
          count: contactsCount.rows[0]?.count || 0
        },
        countries: {
          exists: countriesTest.rows.length > 0,
          columns: countriesTest.rows.map(r => ({ name: r.column_name, type: r.data_type })),
          count: countriesCount.rows[0]?.count || 0
        }
      }
    })
    
  } catch (error) {
    logger.error('Database test error', { 
      requestId, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
    
    return NextResponse.json({
      status: 'Database connection failed',
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
