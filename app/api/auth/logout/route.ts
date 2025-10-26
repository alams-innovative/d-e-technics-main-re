// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { deleteSession } from '@/lib/auth'
import { logger } from '@/lib/logger'

export const runtime = 'nodejs'

export async function POST(_request: Request) {
  const requestId = crypto.randomUUID()
  
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    
    if (sessionCookie) {
      // Delete session from database
      await deleteSession(sessionCookie.value)
      
      // Clear session cookie
      cookieStore.delete('session')
      
      logger.info('User logged out successfully', { requestId })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Logout error', { 
      requestId, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
    
    return NextResponse.json({ success: true }) // Always return success for logout
  }
}
