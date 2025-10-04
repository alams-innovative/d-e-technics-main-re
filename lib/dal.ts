import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { query } from '@/lib/db'

export const verifySession = cache(async () => {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('session')?.value
  
  if (!sessionToken) {
    return null
  }
  
  try {
    // Get session from database with user data
    const result = await query(
      `SELECT s.*, u.id as user_id, u.username, u.email, u.role, u.must_change_password
       FROM sessions s
       JOIN users u ON s.user_id = u.id
       WHERE s.id = $1 AND s.expires_at > NOW()`,
      [sessionToken]
    )

    if (result.rows.length === 0) {
      return null
    }

    // Update last accessed
    await query(
      'UPDATE sessions SET last_accessed = NOW() WHERE id = $1',
      [sessionToken]
    )

    return {
      sessionId: sessionToken,
      user: {
        id: result.rows[0].user_id,
        username: result.rows[0].username,
        email: result.rows[0].email,
        role: result.rows[0].role,
        mustChangePassword: result.rows[0].must_change_password
      }
    }
  } catch (error) {
    console.error('Invalid session:', error)
    return null
  }
})

export const getUser = cache(async () => {
  const session = await verifySession()
  
  if (!session) {
    return null
  }
  
  return session.user
})

export const requireAuth = cache(async () => {
  const session = await verifySession()
  
  if (!session) {
    redirect('/login')
  }
  
  return session
})

export const requireRole = cache(async (requiredRole: string) => {
  const session = await requireAuth()
  
  if (session.user.role !== requiredRole) {
    redirect('/dashboard')
  }
  
  return session
})
