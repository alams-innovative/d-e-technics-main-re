// app/api/auth/session/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSession } from '@/lib/auth'
import { getUserPermissions } from '@/lib/perms'
import { logger } from '@/lib/logger'

export const runtime = 'nodejs'

export async function GET(_request: Request) {
  const requestId = crypto.randomUUID()
  
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    
    if (!sessionCookie) {
      return NextResponse.json(
        { error: { code: 'NO_SESSION', message: 'No session found' } },
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

    // Get user permissions
    const userPermissions = await getUserPermissions(session.user_id)
    
    return NextResponse.json({
      user: {
        id: session.user_id,
        username: session.username,
        email: session.email,
        role: session.role,
        mustChangePassword: session.must_change_password,
        permissions: userPermissions?.permissions || []
      },
      csrfToken: session.csrf_token
    })

  } catch (error) {
    logger.error('Session check error', { 
      requestId, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
    
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'An internal error occurred' } },
      { status: 500 }
    )
  }
}
