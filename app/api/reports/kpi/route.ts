// app/api/reports/kpi/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { query } from '@/lib/db'
import { getSession } from '@/lib/auth'
import { getUserPermissions, canAccessResource } from '@/lib/perms'
import { logger } from '@/lib/logger'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const requestId = crypto.randomUUID()
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    if (!sessionCookie) return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Authentication required' } }, { status: 401 })

    const session = await getSession(sessionCookie.value)
    if (!session) return NextResponse.json({ error: { code: 'INVALID_SESSION', message: 'Invalid or expired session' } }, { status: 401 })

    const perms = await getUserPermissions(session.user_id)
    if (!perms || !canAccessResource(perms, 'QUOTES', 'READ')) {
      return NextResponse.json({ error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const from = searchParams.get('from')
    const to = searchParams.get('to')

    let where = 'WHERE 1=1'
    const params: any[] = []
    let i = 0

    const hasAll = canAccessResource(perms, 'QUOTES', 'READ', undefined)
    if (!hasAll) {
      where += ` AND owner_id = $${++i}`
      params.push(session.user_id)
    }
    if (from) {
      where += ` AND created_at >= $${++i}`
      params.push(from)
    }
    if (to) {
      where += ` AND created_at <= $${++i}`
      params.push(to)
    }

    // KPI values
    const totalValueRes = await query(`SELECT COALESCE(SUM(estimated_value),0) as total FROM quotes ${where}`, params)
    const totalValue = Number(totalValueRes.rows[0].total) || 0

    const winRateRes = await query(
      `SELECT 
         (SELECT COUNT(*)::float FROM quotes ${where} AND status = 'won') /
         NULLIF((SELECT COUNT(*)::float FROM quotes ${where}),0) as win_rate`,
      [...params, ...params]
    )
    const winRate = Number(winRateRes.rows[0].win_rate || 0) * 100

    const avgCycleRes = await query(
      `SELECT AVG(EXTRACT(EPOCH FROM (updated_at - created_at)) / 86400.0) as days FROM quotes ${where} AND status IN ('won','lost')`,
      params
    )
    const avgCycleTime = Number(avgCycleRes.rows[0].days || 0)

    const valueByCountryRes = await query(
      `SELECT country_code, COALESCE(SUM(estimated_value),0) as value
       FROM quotes ${where}
       GROUP BY country_code
       ORDER BY value DESC
       LIMIT 20`,
      params
    )
    const valueByCountry = valueByCountryRes.rows.map((r: any) => ({ country: r.country_code || 'N/A', value: Number(r.value) }))

    const statusDistributionRes = await query(
      `SELECT status, COUNT(*) as count
       FROM quotes ${where}
       GROUP BY status`,
      params
    )
    const statusDistribution = statusDistributionRes.rows.map((r: any) => ({ status: r.status, count: Number(r.count), color: '' }))

    const monthlyTrendRes = await query(
      `SELECT to_char(date_trunc('month', created_at), 'YYYY-MM') as month,
              COUNT(*) as quotes,
              SUM(CASE WHEN status='won' THEN 1 ELSE 0 END) as won,
              COALESCE(SUM(estimated_value),0) as value
       FROM quotes ${where}
       GROUP BY 1
       ORDER BY 1 ASC
       LIMIT 12`,
      params
    )
    const monthlyTrend = monthlyTrendRes.rows.map((r: any) => ({ month: r.month, quotes: Number(r.quotes), won: Number(r.won), value: Number(r.value) }))

    // Quotes this month / last month
    const qmRes = await query(
      `SELECT 
         SUM(CASE WHEN date_trunc('month', created_at) = date_trunc('month', NOW()) THEN 1 ELSE 0 END) as this_month,
         SUM(CASE WHEN date_trunc('month', created_at) = date_trunc('month', NOW() - interval '1 month') THEN 1 ELSE 0 END) as last_month
       FROM quotes ${where}`,
      params
    )
    const quotesThisMonth = Number(qmRes.rows[0].this_month || 0)
    const quotesLastMonth = Number(qmRes.rows[0].last_month || 0)

    return NextResponse.json({
      quotesThisMonth,
      quotesLastMonth,
      winRate,
      avgCycleTime,
      totalValue,
      valueByCountry,
      statusDistribution,
      monthlyTrend,
    })
  } catch (error) {
    logger.error('Reports KPI error', { requestId, error: error instanceof Error ? error.message : 'Unknown error' })
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'An internal error occurred' } }, { status: 500 })
  }
}
