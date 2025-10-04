// lib/auth.ts
import { query } from '@/lib/db'
import { logger } from '@/lib/logger'

export function generateSecureToken(): string {
  return crypto.randomUUID()
}

export function generateCSRFToken(): string {
  return crypto.randomUUID()
}

// Session management
export async function createSession(userId: number): Promise<{ sessionId: string; csrfToken: string }> {
  const sessionId = generateSecureToken()
  const csrfToken = generateCSRFToken()
  const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000) // 8 hours

  await query(
    'INSERT INTO sessions (id, user_id, csrf_token, expires_at) VALUES ($1, $2, $3, $4)',
    [sessionId, userId, csrfToken, expiresAt]
  )

  return { sessionId, csrfToken }
}

export async function getSession(sessionId: string) {
  const result = await query(
    `SELECT s.*, u.id as user_id, u.username, u.email, u.role, u.must_change_password
     FROM sessions s
     JOIN users u ON s.user_id = u.id
     WHERE s.id = $1 AND s.expires_at > NOW()`,
    [sessionId]
  )

  if (result.rows.length === 0) {
    return null
  }

  // Update last accessed
  const newExpiry = new Date(Date.now() + 8 * 60 * 60 * 1000)
  await query(
    'UPDATE sessions SET last_accessed = NOW(), expires_at = $2 WHERE id = $1',
    [sessionId, newExpiry]
  )

  return result.rows[0]
}

export async function deleteSession(sessionId: string): Promise<void> {
  await query('DELETE FROM sessions WHERE id = $1', [sessionId])
}

export async function cleanupExpiredSessions(): Promise<void> {
  await query('DELETE FROM sessions WHERE expires_at < NOW()')
}

// Account lockout management
export async function incrementFailedAttempts(username: string): Promise<void> {
  const result = await query(
    'UPDATE users SET failed_login_attempts = failed_login_attempts + 1 WHERE username = $1 RETURNING failed_login_attempts',
    [username]
  )

  if (result.rows.length > 0 && result.rows[0].failed_login_attempts >= 5) {
    const lockUntil = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
    await query(
      'UPDATE users SET locked_until = $1 WHERE username = $2',
      [lockUntil, username]
    )
  }
}

export async function resetFailedAttempts(username: string): Promise<void> {
  await query(
    'UPDATE users SET failed_login_attempts = 0, locked_until = NULL WHERE username = $1',
    [username]
  )
}

export async function isAccountLocked(username: string): Promise<boolean> {
  const result = await query(
    'SELECT locked_until FROM users WHERE username = $1',
    [username]
  )

  if (result.rows.length === 0) {
    return false
  }

  const lockedUntil = result.rows[0].locked_until
  return lockedUntil && new Date(lockedUntil) > new Date()
}

// Hash IP addresses for privacy
export async function hashIP(ip: string): Promise<string> {
  try {
    const encoder = new TextEncoder()
    const data = encoder.encode(ip + process.env.SESSION_SECRET)
    const hash = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  } catch {
    return 'unknown'
  }
}
