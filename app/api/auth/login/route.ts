// app/api/auth/login/route.ts
import { NextResponse } from 'next/server'
// cookies import removed - not used
import { query } from '@/lib/db'
import { createSession, incrementFailedAttempts, resetFailedAttempts, isAccountLocked } from '@/lib/auth'
import { verifyPassword } from '@/lib/auth-server'
import { checkRateLimit, getClientIP } from '@/lib/ratelimit'
import { loginSchema } from '@/lib/zod-schemas'
import { logger } from '@/lib/logger'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const requestId = crypto.randomUUID()
  const clientIP = getClientIP(request)
  
  try {
    // Rate limiting
    const rateLimit = await checkRateLimit(request, clientIP, 60, 5 * 60 * 1000) // 60 attempts per 5 minutes
    if (!rateLimit.allowed) {
      logger.warn('Login rate limit exceeded', { requestId, ip: clientIP })
      return NextResponse.json(
        { error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many login attempts. Please try again later.' } },
        { status: 429 }
      )
    }

    // Parse and validate request body (supports {username,password} OR {identifier,password})
    const body = await request.json()
    const validation = loginSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: validation.error.issues } },
        { status: 400 }
      )
    }

    const password = validation.data.password as string
    // Accept either explicit username or a generic identifier (username or email)
    const identifier = (validation.data as Record<string, string>).username ?? (validation.data as Record<string, string>).identifier

    // Get user from database by username OR email
    const userResult = await query(
      'SELECT id, username, password_hash, email, role, must_change_password FROM users WHERE username = $1 OR email = $1 LIMIT 1',
      [identifier]
    )

    if (userResult.rows.length === 0) {
      // unknown user: try to increment by provided identifier if it was meant as username
      if (identifier && typeof identifier === 'string' && !identifier.includes('@')) {
        await incrementFailedAttempts(identifier)
      }
      logger.warn('Login attempt with invalid username/email', { requestId, identifier })
      return NextResponse.json(
        { error: { code: 'INVALID_CREDENTIALS', message: 'Invalid username or password' } },
        { status: 401 }
      )
    }

    const user = userResult.rows[0]

    // Check if account is locked (using resolved username)
    if (await isAccountLocked(user.username)) {
      logger.warn('Login attempt on locked account', { requestId, username: user.username })
      return NextResponse.json(
        { error: { code: 'ACCOUNT_LOCKED', message: 'Account is temporarily locked due to too many failed attempts.' } },
        { status: 423 }
      )
    }

    // Verify password
    const hashedPassword = user.password_hash
    if (!hashedPassword) {
      logger.warn('Missing password hash for user', { requestId, username: user.username })
      return NextResponse.json(
        { error: { code: 'INVALID_CREDENTIALS', message: 'Invalid username or password' } },
        { status: 401 }
      )
    }
    const isPasswordValid = await verifyPassword(password, hashedPassword)
    if (!isPasswordValid) {
      await incrementFailedAttempts(user.username)
      logger.warn('Login attempt with invalid password', { requestId, username: user.username })
      return NextResponse.json(
        { error: { code: 'INVALID_CREDENTIALS', message: 'Invalid username or password' } },
        { status: 401 }
      )
    }

    // Reset failed attempts on successful login
    await resetFailedAttempts(user.username)

    // Create session
    const { sessionId, csrfToken } = await createSession(user.id)

    logger.info('User logged in successfully', { 
      requestId, 
      userId: user.id, 
      username: user.username 
    })

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        mustChangePassword: user.must_change_password
      },
      csrfToken
    });

    // Set session cookie
    response.cookies.set('session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 8 * 60 * 60, // 8 hours
      path: '/'
    });

    return response;

  } catch (error: unknown) {
    console.error('Login error:', error)
    return NextResponse.json({ error: { message: 'Internal server error', code: 'INTERNAL_ERROR' } }, { status: 500 })
  }
}
