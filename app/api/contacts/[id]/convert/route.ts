// app/api/contacts/[id]/convert/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { query } from '@/lib/db'
import { getSession } from '@/lib/auth'
import { getUserPermissions, canAccessResource } from '@/lib/perms'
import { validateCSRF } from '@/lib/csrf'
import { checkRateLimit, getClientIP } from '@/lib/ratelimit'
import { logger } from '@/lib/logger'

export const runtime = 'nodejs'

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const requestId = crypto.randomUUID()
  const clientIP = getClientIP(request)
  try {
    const limit = await checkRateLimit(request, clientIP, 60, 5 * 60 * 1000)
    if (!limit.allowed) return new NextResponse(JSON.stringify({ error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests' }, requestId }), { status: 429, headers: { 'Content-Type': 'application/json', 'X-Request-Id': requestId } })

    if (!(await validateCSRF(request))) return new NextResponse(JSON.stringify({ error: { code: 'CSRF_ERROR', message: 'Invalid CSRF token' }, requestId }), { status: 403, headers: { 'Content-Type': 'application/json', 'X-Request-Id': requestId } })

    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    if (!sessionCookie) return new NextResponse(JSON.stringify({ error: { code: 'UNAUTHORIZED', message: 'Authentication required' }, requestId }), { status: 401, headers: { 'Content-Type': 'application/json', 'X-Request-Id': requestId } })
    const session = await getSession(sessionCookie.value)
    if (!session) return new NextResponse(JSON.stringify({ error: { code: 'INVALID_SESSION', message: 'Invalid or expired session' }, requestId }), { status: 401, headers: { 'Content-Type': 'application/json', 'X-Request-Id': requestId } })

    const perms = await getUserPermissions(session.user_id)
    if (!perms) return new NextResponse(JSON.stringify({ error: { code: 'FORBIDDEN', message: 'Insufficient permissions' }, requestId }), { status: 403, headers: { 'Content-Type': 'application/json', 'X-Request-Id': requestId } })

    const { id: idParam } = await context.params
    const id = Number(idParam)
    const cur = await query('SELECT * FROM contacts WHERE id = $1', [id])
    if (cur.rows.length === 0) return new NextResponse(JSON.stringify({ error: { code: 'NOT_FOUND', message: 'Contact not found' }, requestId }), { status: 404, headers: { 'Content-Type': 'application/json', 'X-Request-Id': requestId } })
    const contact = cur.rows[0]

    const allowed = canAccessResource(perms, 'CONTACTS', 'UPDATE', contact.owner_id)
    if (!allowed) return new NextResponse(JSON.stringify({ error: { code: 'FORBIDDEN', message: 'Insufficient permissions' }, requestId }), { status: 403, headers: { 'Content-Type': 'application/json', 'X-Request-Id': requestId } })

    // Create quote from contact
    const result = await query(
      `INSERT INTO quotes (name,email,phone,country_code,product,message,status,owner_id,estimated_value)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,
      [
        contact.name,
        contact.email,
        contact.phone,
        contact.country_code,
        contact.subject || 'General Inquiry',
        contact.message,
        'pending',
        session.user_id,
        0
      ]
    )
    const quoteId = result.rows[0].id

    // Mark contact as converted
    await query('UPDATE contacts SET converted_to_quote_id = $1, status = $2, updated_at = NOW() WHERE id = $3', [quoteId, 'converted', id])

    // Log events
    await query(
      `INSERT INTO events (event_type, table_name, record_id, actor_id, changes)
       VALUES ($1,$2,$3,$4,$5)`,
      ['contact_converted', 'contacts', id, session.user_id, JSON.stringify({ to_quote_id: quoteId })]
    )
    await query(
      `INSERT INTO events (event_type, table_name, record_id, actor_id, changes)
       VALUES ($1,$2,$3,$4,$5)`,
      ['quote_created_from_contact', 'quotes', quoteId, session.user_id, JSON.stringify({ from_contact_id: id })]
    )

    return new NextResponse(JSON.stringify({ quote: { id: quoteId } }), { status: 201, headers: { 'Content-Type': 'application/json', 'X-Request-Id': requestId } })
  } catch (error) {
    logger.error('Contact convert error', { requestId, error: error instanceof Error ? error.message : 'Unknown error' })
    return new NextResponse(JSON.stringify({ error: { code: 'INTERNAL_ERROR', message: 'An internal error occurred' }, requestId }), { status: 500, headers: { 'Content-Type': 'application/json', 'X-Request-Id': requestId } })
  }
}
