// app/api/quotes/[id]/events/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { query } from '@/lib/db'
import { getSession } from '@/lib/auth'
import { getUserPermissions, canAccessResource } from '@/lib/perms'
import { logger } from '@/lib/logger'

export const runtime = 'nodejs'

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const requestId = crypto.randomUUID()
  try {
    const { id: idParam } = await context.params
    const quoteId = Number(idParam)

    // Authn
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

    // Find quote owner for permission check
    const quoteRes = await query('SELECT owner_id FROM quotes WHERE id = $1', [quoteId])
    if (quoteRes.rows.length === 0) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Quote not found' } },
        { status: 404 }
      )
    }
    const ownerId = quoteRes.rows[0].owner_id as number | null

    // Authz
    const userPerms = await getUserPermissions(session.user_id)
    if (!userPerms || !canAccessResource(userPerms, 'QUOTES', 'READ', ownerId ?? undefined)) {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } },
        { status: 403 }
      )
    }

    // Check if events table exists
    const existsRes = await query(
      `SELECT EXISTS (
         SELECT 1 FROM information_schema.tables 
         WHERE table_schema = 'public' AND table_name = 'quote_events'
       ) AS exists`,
    )
    const hasEventsTable = Boolean(existsRes.rows?.[0]?.exists)

    if (!hasEventsTable) {
      // Graceful fallback – return empty list to avoid 404s in UI
      return NextResponse.json({ events: [] })
    }

    // Fetch events
    const eventsRes = await query(
      `SELECT e.id, e.event_type, e.changes, e.created_at, u.username as actor_username
       FROM quote_events e
       LEFT JOIN users u ON e.actor_id = u.id
       WHERE e.quote_id = $1
       ORDER BY e.created_at DESC`,
      [quoteId]
    )

    const events = eventsRes.rows.map((row: any) => ({
      id: row.id,
      event_type: row.event_type,
      changes: row.changes,
      created_at: row.created_at,
      actor: row.actor_username ? { username: row.actor_username } : undefined,
    }))

    return NextResponse.json({ events })
  } catch (error) {
    logger.error('Quote events fetch error', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    // Do NOT fail UI because of events – return empty events on error
    return NextResponse.json({ events: [] })
  }
}
