import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { query } from '@/lib/db'
import { getSession } from '@/lib/auth'
import { getUserPermissions, canAccessResource } from '@/lib/perms'
import { validateCSRF } from '@/lib/csrf'
import { checkRateLimit, getClientIP } from '@/lib/ratelimit'
import { quoteUpdateSchema } from '@/lib/zod-schemas'
import { logger } from '@/lib/logger'

export const runtime = 'nodejs'

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const requestId = crypto.randomUUID()
  try {
    const { id: idParam } = await context.params
    const id = Number(idParam)
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    if (!sessionCookie) return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Authentication required' } }, { status: 401 })

    const session = await getSession(sessionCookie.value)
    if (!session) return NextResponse.json({ error: { code: 'INVALID_SESSION', message: 'Invalid or expired session' } }, { status: 401 })

    const userPerms = await getUserPermissions(session.user_id)
    if (!userPerms) return NextResponse.json({ error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } }, { status: 403 })

    const res = await query('SELECT * FROM quotes WHERE id = $1', [id])
    if (res.rows.length === 0) return NextResponse.json({ error: { code: 'NOT_FOUND', message: 'Quote not found' } }, { status: 404 })
    const quote = res.rows[0]

    const allowed = canAccessResource(userPerms, 'QUOTES', 'READ', quote.owner_id)
    if (!allowed) return NextResponse.json({ error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } }, { status: 403 })

    return NextResponse.json({ quote })
  } catch (error) {
    logger.error('Get quote by id error', { requestId, error: error instanceof Error ? error.message : 'Unknown error' })
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'An internal error occurred' } }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const requestId = crypto.randomUUID()
  const clientIP = getClientIP(request)
  try {
    const { id: idParam } = await context.params
    const id = Number(idParam)
    const limit = await checkRateLimit(request, clientIP, 60, 5 * 60 * 1000)
    if (!limit.allowed) return NextResponse.json({ error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests' } }, { status: 429 })

    if (!(await validateCSRF(request))) return NextResponse.json({ error: { code: 'CSRF_ERROR', message: 'Invalid CSRF token' } }, { status: 403 })

    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    if (!sessionCookie) return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Authentication required' } }, { status: 401 })

    const session = await getSession(sessionCookie.value)
    if (!session) return NextResponse.json({ error: { code: 'INVALID_SESSION', message: 'Invalid or expired session' } }, { status: 401 })

    const userPerms = await getUserPermissions(session.user_id)
    if (!userPerms) return NextResponse.json({ error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } }, { status: 403 })

    const current = await query('SELECT * FROM quotes WHERE id = $1', [id])
    if (current.rows.length === 0) return NextResponse.json({ error: { code: 'NOT_FOUND', message: 'Quote not found' } }, { status: 404 })
    const quote = current.rows[0]

    const allowed = canAccessResource(userPerms, 'QUOTES', 'UPDATE', quote.owner_id)
    if (!allowed) return NextResponse.json({ error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } }, { status: 403 })

    const body = await request.json()
    // Sanitize incoming body: trim strings, convert empty strings/nulls to undefined, normalize country codes
    const sanitizeString = (v: unknown) => {
      if (v === null || v === undefined) return undefined
      if (typeof v !== 'string') return v as any
      const t = v.trim()
      return t.length === 0 ? undefined : t
    }

    const sanitized = {
      name: sanitizeString(body.name),
      email: sanitizeString(body.email),
      phone: sanitizeString(body.phone),
      country_code: (() => {
        const cc = sanitizeString(body.country_code)
        return typeof cc === 'string' ? cc.toUpperCase() : undefined
      })(),
      product: sanitizeString(body.product),
      message: sanitizeString(body.message),
      status: sanitizeString(body.status) as any,
      estimated_value: (() => {
        const v = body.estimated_value
        if (typeof v === 'number') return Number.isFinite(v) ? v : undefined
        if (typeof v === 'string') {
          const n = Number(v)
          return Number.isFinite(n) ? n : undefined
        }
        return undefined
      })(),
      owner_id: typeof body.owner_id === 'number' ? body.owner_id : undefined,
    }

    // Remove undefined fields so Zod partial treats them as omitted
    const sanitizedDefined = Object.fromEntries(
      Object.entries(sanitized).filter(([, v]) => v !== undefined && v !== null)
    ) as Record<string, unknown>

    // Normalize/resolve invalid country_code values before validation
    if (typeof (sanitizedDefined as any).country_code === 'string') {
      const cc = ((sanitizedDefined as any).country_code as string).toUpperCase()
      const ccRegex = /^([A-Za-z]{2}|[A-Za-z]{3}|\d{3})$/
      if (!ccRegex.test(cc)) {
        try {
          const lookup = await query(
            `SELECT country_code FROM countries 
             WHERE LOWER(country_name) = LOWER($1) OR LOWER(country_code) = LOWER($1)
             LIMIT 1`,
            [cc]
          )
          if (lookup.rows.length > 0) {
            ;(sanitizedDefined as any).country_code = String(lookup.rows[0].country_code).toUpperCase()
          } else {
            // Drop invalid country_code to avoid blocking unrelated updates (e.g., status only)
            delete (sanitizedDefined as any).country_code
          }
        } catch (e) {
          // On lookup failure, drop the field
          delete (sanitizedDefined as any).country_code
        }
      } else {
        ;(sanitizedDefined as any).country_code = cc
      }
    }

    let validation = quoteUpdateSchema.safeParse({ ...(sanitizedDefined as any), id })
    if (!validation.success) {
      // If the only validation errors are for country_code, drop it and revalidate
      const issues = validation.error.issues
      const nonCountryIssues = issues.filter((iss) => !(Array.isArray(iss.path) && iss.path.includes('country_code')))
      const onlyCountryIssues = nonCountryIssues.length === 0 && issues.length > 0
      if (onlyCountryIssues && (sanitizedDefined as any).country_code !== undefined) {
        delete (sanitizedDefined as any).country_code
        validation = quoteUpdateSchema.safeParse({ ...(sanitizedDefined as any), id })
      }

      if (!validation.success) {
        logger.warn('Quote update validation failed', {
          requestId,
          issues: validation.error.issues,
          payload: sanitizedDefined,
        })
        return NextResponse.json({ error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: validation.error.issues } }, { status: 400 })
      }
    }

    const data = validation.data
    const fields: string[] = []
    const values: any[] = []
    let idx = 1
    ;(['name','email','phone','country_code','product','message','status','estimated_value','owner_id'] as const).forEach((k) => {
      if (data[k as keyof typeof data] !== undefined) {
        fields.push(`${k} = $${idx++}`)
        values.push((data as any)[k])
      }
    })
    if (fields.length === 0) return NextResponse.json({ quote })
    values.push(id)

    const updated = await query(`UPDATE quotes SET ${fields.join(', ')} , updated_at = NOW() WHERE id = $${idx} RETURNING *`, values)

    return NextResponse.json({ quote: updated.rows[0] })
  } catch (error) {
    logger.error('Update quote error', { requestId, error: error instanceof Error ? error.message : 'Unknown error' })
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'An internal error occurred' } }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const requestId = crypto.randomUUID()
  const clientIP = getClientIP(request)
  try {
    const { id: idParam } = await context.params
    const id = Number(idParam)
    const limit = await checkRateLimit(request, clientIP, 60, 5 * 60 * 1000)
    if (!limit.allowed) return NextResponse.json({ error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests' } }, { status: 429 })

    if (!(await validateCSRF(request))) return NextResponse.json({ error: { code: 'CSRF_ERROR', message: 'Invalid CSRF token' } }, { status: 403 })

    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    if (!sessionCookie) return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Authentication required' } }, { status: 401 })

    const session = await getSession(sessionCookie.value)
    if (!session) return NextResponse.json({ error: { code: 'INVALID_SESSION', message: 'Invalid or expired session' } }, { status: 401 })

    const userPerms = await getUserPermissions(session.user_id)
    if (!userPerms) return NextResponse.json({ error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } }, { status: 403 })

    const current = await query('SELECT * FROM quotes WHERE id = $1', [id])
    if (current.rows.length === 0) return NextResponse.json({ error: { code: 'NOT_FOUND', message: 'Quote not found' } }, { status: 404 })
    const quote = current.rows[0]

    const allowed = canAccessResource(userPerms, 'QUOTES', 'DELETE', quote.owner_id)
    if (!allowed) return NextResponse.json({ error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } }, { status: 403 })

    await query('DELETE FROM quotes WHERE id = $1', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Delete quote error', { requestId, error: error instanceof Error ? error.message : 'Unknown error' })
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'An internal error occurred' } }, { status: 500 })
  }
}
