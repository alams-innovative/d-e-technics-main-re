// app/api/debug/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSession } from '@/lib/auth'
import { getUserPermissions } from '@/lib/perms'
import { logger } from '@/lib/logger'

export const runtime = 'nodejs'

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 })
}

export async function GET() {
  const requestId = crypto.randomUUID()
  
  try {
    // Check session and permissions
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    
    let sessionInfo: {
      hasSession: boolean
      session: any
      permissions: any
    } = { hasSession: false, session: null, permissions: null }
    
    if (sessionCookie) {
      const session = await getSession(sessionCookie.value)
      if (session) {
        const userPermissions = await getUserPermissions(session.user_id)
        sessionInfo = {
          hasSession: true,
          session: {
            user_id: session.user_id,
            username: session.username,
            email: session.email,
            role: session.role,
            csrf_token: session.csrf_token ? 'present' : 'missing'
          },
          permissions: userPermissions ? {
            role: userPermissions.role,
            permissionCount: userPermissions.permissions.length,
            permissions: userPermissions.permissions.map(p => `${p.module}:${p.action}:${p.scope}`)
          } : null
        }
      }
    }

    return NextResponse.json({
      requestId,
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasDbUrl: !!process.env.DATABASE_URL,
        dbUrlPrefix: process.env.DATABASE_URL?.substring(0, 20) + '...',
        hasSiteUrl: !!process.env.NEXT_PUBLIC_SITE_URL,
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL
      },
      session: sessionInfo,
      headers: {
        origin: 'header not available in debug',
        userAgent: 'header not available in debug'
      },
      message: 'Debug endpoint working - use this to verify authentication and database connectivity'
    })
    
  } catch (error) {
    logger.error('Debug endpoint error', { 
      requestId, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
    
    return NextResponse.json({
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
