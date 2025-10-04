'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { query } from '@/lib/db'
import { verifyPassword } from '@/lib/auth-server'
import { createSession, incrementFailedAttempts, resetFailedAttempts, isAccountLocked } from '@/lib/auth'
import { checkRateLimit, getClientIP } from '@/lib/ratelimit'
import { loginSchema } from '@/lib/zod-schemas'
import { logger } from '@/lib/logger'

export async function loginAction(formData: FormData) {
  const requestId = crypto.randomUUID()
  
  try {
    // Parse form data
    const username = formData.get('username') as string
    const password = formData.get('password') as string
    
    // Validate input
    const validation = loginSchema.safeParse({ username, password })
    if (!validation.success) {
      return {
        error: 'Invalid input data'
      }
    }

    // Check if account is locked
    if (await isAccountLocked(username)) {
      logger.warn('Login attempt on locked account', { requestId, username })
      return {
        error: 'Account is temporarily locked due to too many failed attempts.'
      }
    }

    // Get user from database
    const userResult = await query(
      'SELECT id, username, password_hash, email, role, must_change_password FROM users WHERE username = $1',
      [username]
    )

    if (userResult.rows.length === 0) {
      await incrementFailedAttempts(username)
      logger.warn('Login attempt with invalid username', { requestId, username })
      return {
        error: 'Invalid username or password'
      }
    }

    const user = userResult.rows[0]

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password_hash)
    if (!isPasswordValid) {
      await incrementFailedAttempts(username)
      logger.warn('Login attempt with invalid password', { requestId, username })
      return {
        error: 'Invalid username or password'
      }
    }

    // Reset failed attempts on successful login
    await resetFailedAttempts(username)

    // Create session
    const { sessionId, csrfToken } = await createSession(user.id)

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set('session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 8 * 60 * 60, // 8 hours
      path: '/'
    })

    logger.info('User logged in successfully', { 
      requestId, 
      userId: user.id, 
      username: user.username 
    })

    // Redirect to dashboard
    redirect('/dashboard')

  } catch (error) {
    logger.error('Login error', { 
      requestId, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
    
    return {
      error: 'An internal error occurred'
    }
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('session')?.value
  
  if (sessionId) {
    // Delete session from database
    await query('DELETE FROM sessions WHERE id = $1', [sessionId])
  }
  
  // Clear session cookie
  cookieStore.delete('session')
  
  // Redirect to login
  redirect('/login')
}
