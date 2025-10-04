// app/api/quotes/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { query } from '@/lib/db'
import { getSession } from '@/lib/auth'
import { getUserPermissions, canAccessResource, filterByScope } from '@/lib/perms'
import { validateCSRF } from '@/lib/csrf'
import { checkRateLimit, getClientIP } from '@/lib/ratelimit'
import { quotesQuerySchema, quoteSchema } from '@/lib/zod-schemas'
import { logger } from '@/lib/logger'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const requestId = crypto.randomUUID()
  
  try {
    // Get session
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    
    if (!sessionCookie) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      )
    }

    const session = await getSession(sessionCookie.value)
    if (!session) {
      return NextResponse.json(
        { error: { code: 'INVALID_SESSION', message: 'Invalid or expired session' } },
        { status: 401 }
      )
    }

    // Check permissions
    const userPermissions = await getUserPermissions(session.user_id)
    if (!userPermissions || !canAccessResource(userPermissions, 'QUOTES', 'READ')) {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } },
        { status: 403 }
      )
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const queryValidation = quotesQuerySchema.safeParse(Object.fromEntries(searchParams))
    
    if (!queryValidation.success) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Invalid query parameters', details: queryValidation.error.issues } },
        { status: 400 }
      )
    }

    const { page, limit, status, owner_id, country_code, from, to, search } = queryValidation.data

    // Build query
    let whereClause = 'WHERE 1=1'
    const params: any[] = []
    let paramCount = 0

    // Apply scope filtering
    const hasAllScope = canAccessResource(userPermissions, 'QUOTES', 'READ', undefined)
    if (!hasAllScope) {
      whereClause += ` AND q.owner_id = $${++paramCount}`
      params.push(session.user_id)
    }

    if (status) {
      whereClause += ` AND q.status = $${++paramCount}`
      params.push(status)
    }

    if (owner_id) {
      whereClause += ` AND q.owner_id = $${++paramCount}`
      params.push(owner_id)
    }

    if (country_code) {
      whereClause += ` AND q.country_code = $${++paramCount}`
      params.push(country_code)
    }

    if (from) {
      whereClause += ` AND q.created_at >= $${++paramCount}`
      params.push(from)
    }

    if (to) {
      whereClause += ` AND q.created_at <= $${++paramCount}`
      params.push(to)
    }

    if (search) {
      whereClause += ` AND (q.name ILIKE $${++paramCount} OR q.email ILIKE $${++paramCount} OR q.product ILIKE $${++paramCount})`
      const searchPattern = `%${search}%`
      params.push(searchPattern, searchPattern, searchPattern)
    }

    // Get total count
    const countResult = await query(`
      SELECT COUNT(*) as total
      FROM quotes q
      ${whereClause}
    `, params)

    const total = parseInt(countResult.rows[0].total)

    // Get quotes with pagination
    const offset = (page - 1) * limit
    const quotesResult = await query(`
      SELECT 
        q.*,
        u.username as owner_username,
        c.country_name,
        c.flag_emoji
      FROM quotes q
      LEFT JOIN users u ON q.owner_id = u.id
      LEFT JOIN countries c ON q.country_code = c.country_code
      ${whereClause}
      ORDER BY q.created_at DESC
      LIMIT $${++paramCount} OFFSET $${++paramCount}
    `, [...params, limit, offset])

    const quotes = quotesResult.rows.map(row => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      country_code: row.country_code,
      product: row.product,
      message: row.message,
      status: row.status,
      owner_id: row.owner_id,
      estimated_value: parseFloat(row.estimated_value || 0),
      created_at: row.created_at,
      updated_at: row.updated_at,
      owner: row.owner_username ? { username: row.owner_username } : null,
      country: row.country_name ? {
        country_name: row.country_name,
        flag_emoji: row.flag_emoji
      } : null
    }))

    return NextResponse.json({
      quotes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    logger.error('Get quotes error', { 
      requestId, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
    
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'An internal error occurred' } },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID()
  const clientIP = getClientIP(request)
  
  try {
    // Rate limiting
    const rateLimit = await checkRateLimit(request, clientIP, 30, 5 * 60 * 1000) // 30 requests per 5 minutes
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests' } },
        { status: 429 }
      )
    }

    // Validate CSRF
    if (!await validateCSRF(request)) {
      return NextResponse.json(
        { error: { code: 'CSRF_ERROR', message: 'Invalid CSRF token' } },
        { status: 403 }
      )
    }

    // Get session
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    
    if (!sessionCookie) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      )
    }

    const session = await getSession(sessionCookie.value)
    if (!session) {
      return NextResponse.json(
        { error: { code: 'INVALID_SESSION', message: 'Invalid or expired session' } },
        { status: 401 }
      )
    }

    // Check permissions
    const userPermissions = await getUserPermissions(session.user_id)
    if (!userPermissions || !canAccessResource(userPermissions, 'QUOTES', 'CREATE')) {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } },
        { status: 403 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validation = quoteSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 
          { code: 'VALIDATION_ERROR', 
            message: 'Invalid input', 
            details: validation.error.issues
          } 
        },
        { status: 400 }
      )
    }

    const quoteData = validation.data

    // Set owner to current user if not specified or if user doesn't have ALL scope
    if (!quoteData.owner_id || !canAccessResource(userPermissions, 'QUOTES', 'CREATE', undefined)) {
      quoteData.owner_id = session.user_id
    }

    // Insert quote
    const result = await query(`
      INSERT INTO quotes (
        name, email, phone, country_code, product, message, 
        status, owner_id, estimated_value
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `, [
      quoteData.name,
      quoteData.email,
      quoteData.phone,
      quoteData.country_code,
      quoteData.product,
      quoteData.message,
      quoteData.status,
      quoteData.owner_id,
      quoteData.estimated_value
    ])

    const quote = result.rows[0]

    // Log event
    await query(`
      INSERT INTO events (event_type, table_name, record_id, actor_id, changes)
      VALUES ($1, $2, $3, $4, $5)
    `, [
      'quote_created',
      'quotes',
      quote.id,
      session.user_id,
      JSON.stringify({ quote: quoteData })
    ])

    logger.info('Quote created', { 
      requestId, 
      quoteId: quote.id, 
      userId: session.user_id 
    })

    return NextResponse.json({ quote }, { status: 201 })

  } catch (error) {
    logger.error('Create quote error', { 
      requestId, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
    
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'An internal error occurred' } },
      { status: 500 }
    )
  }
}
