// app/api/reports/export/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { query } from '@/lib/db'
import { getSession } from '@/lib/auth'
import { getUserPermissions, canAccessResource } from '@/lib/perms'
import { validateCSRF } from '@/lib/csrf'
import { checkRateLimit, getClientIP } from '@/lib/ratelimit'
import { logger } from '@/lib/logger'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const requestId = crypto.randomUUID()
  const clientIP = getClientIP(request)
  try {
    const limit = await checkRateLimit(request, clientIP, 60, 5 * 60 * 1000)
    if (!limit.allowed) return NextResponse.json({ error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests' } }, { status: 429 })

    if (!(await validateCSRF(request))) return NextResponse.json({ error: { code: 'CSRF_ERROR', message: 'Invalid CSRF token' } }, { status: 403 })

    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    if (!sessionCookie) return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Authentication required' } }, { status: 401 })
    const session = await getSession(sessionCookie.value)
    if (!session) return NextResponse.json({ error: { code: 'INVALID_SESSION', message: 'Invalid or expired session' } }, { status: 401 })

    const perms = await getUserPermissions(session.user_id)
    if (!perms || !canAccessResource(perms, 'QUOTES', 'READ')) {
      return NextResponse.json({ error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } }, { status: 403 })
    }

    const body = await request.json().catch(() => ({})) as any
    const { dateRange } = body || {}
    const from = dateRange?.from
    const to = dateRange?.to

    let where = 'WHERE 1=1'
    const params: any[] = []
    let i = 0

    const hasAll = canAccessResource(perms, 'QUOTES', 'READ', undefined)
    if (!hasAll) {
      where += ` AND owner_id = $${++i}`
      params.push(session.user_id)
    }
    if (from) { where += ` AND created_at >= $${++i}`; params.push(from) }
    if (to) { where += ` AND created_at <= $${++i}`; params.push(to) }

    const res = await query(
      `SELECT id, name, email, status, owner_id, estimated_value, created_at
       FROM quotes ${where}
       ORDER BY created_at DESC
       LIMIT 5000`,
      params
    )

    const rows = res.rows as any[]
    const header = ['id','name','email','status','owner_id','estimated_value','created_at']
    const csvLines = [header.join(',')]
    for (const r of rows) {
      csvLines.push([
        r.id,
        JSON.stringify(r.name ?? ''),
        JSON.stringify(r.email ?? ''),
        r.status,
        r.owner_id ?? '',
        r.estimated_value ?? 0,
        r.created_at?.toISOString?.() ?? r.created_at
      ].join(','))
    }
    const csv = csvLines.join('\n')

    const headers = new Headers({
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="reports-${new Date().toISOString().slice(0,10)}.csv"`,
      'Cache-Control': 'no-store',
    })

    return new NextResponse(csv, { status: 200, headers })
  } catch (error) {
    logger.error('Reports export error', { requestId, error: error instanceof Error ? error.message : 'Unknown error' })
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'An internal error occurred' } }, { status: 500 })
  }
}
