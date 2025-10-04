// lib/csrf.ts
import { cookies } from 'next/headers'
import { getSession } from './auth'
import { logger } from './logger'

export async function validateCSRF(request: Request): Promise<boolean> {
  // Skip CSRF for GET requests
  if (request.method === 'GET') {
    return true
  }

  try {
    // Get session from cookie
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    if (!sessionCookie) {
      return false
    }

    const session = await getSession(sessionCookie.value)
    if (!session) {
      return false
    }

    // Get CSRF token from header
    const csrfToken = request.headers.get('x-csrf-token')
    if (!csrfToken) {
      return false
    }

    // Validate CSRF token matches session
    return csrfToken === session.csrf_token
  } catch (error) {
    logger.error('CSRF validation failed', { error: error instanceof Error ? error.message : 'Unknown error' })
    return false
  }
}

export function getCSRFToken(session: any): string {
  return session?.csrf_token || ''
}
