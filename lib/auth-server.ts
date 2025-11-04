'use server'

import { logger } from '@/lib/logger'
import bcrypt from 'bcryptjs'

// Environment-aware password hashing with bcrypt
export async function hashPassword(password: string): Promise<string> {
  const deploymentEnv = process.env.DEPLOYMENT_ENV || 'production'
  
  // Use Web Crypto API for v0 environment (serverless-compatible)
  if (deploymentEnv === 'v0') {
    return hashPasswordWebCrypto(password)
  }
  
  // Use bcrypt for production (browser-compatible, secure)
  try {
    const saltRounds = 12 // Good balance of security and performance
    return await bcrypt.hash(password, saltRounds)
  } catch (error) {
    logger.error('Bcrypt hashing failed, falling back to Web Crypto', { error: error instanceof Error ? error.message : 'Unknown error' })
    return hashPasswordWebCrypto(password)
  }
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const deploymentEnv = process.env.DEPLOYMENT_ENV || 'production'
  
  // Detect hash type by format
  const isWebCryptoHash = isWebCryptoFormat(hashedPassword)
  const isBcryptHash = isBcryptFormat(hashedPassword)
  
  // For v0 environment, always use Web Crypto
  if (deploymentEnv === 'v0') {
    return verifyPasswordWebCrypto(password, hashedPassword)
  }
  
  // Use format-based detection
  if (isWebCryptoHash && !isBcryptHash) {
    return verifyPasswordWebCrypto(password, hashedPassword)
  }
  
  if (isBcryptHash) {
    try {
      return await bcrypt.compare(password, hashedPassword)
    } catch (error) {
      logger.error('Bcrypt verification failed', { error: error instanceof Error ? error.message : 'Unknown error' })
      return false
    }
  }
  
  // Fallback: try both methods if format is ambiguous
  try {
    return await bcrypt.compare(password, hashedPassword)
  } catch (error) {
    logger.error('Bcrypt verification failed, trying Web Crypto fallback', { error: error instanceof Error ? error.message : 'Unknown error' })
    return verifyPasswordWebCrypto(password, hashedPassword)
  }
}

// Web Crypto API fallback (works in all environments)
async function hashPasswordWebCrypto(password: string): Promise<string> {
  try {
    const encoder = new TextEncoder()
    const salt = process.env.SESSION_SECRET || 'fallback-salt-change-in-production'
    const data = encoder.encode(password + salt)
    const hash = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  } catch (error) {
    logger.error('Web Crypto password hashing failed', { error: error instanceof Error ? error.message : 'Unknown error' })
    throw new Error('Password hashing failed')
  }
}

async function verifyPasswordWebCrypto(password: string, hashedPassword: string): Promise<boolean> {
  try {
    const hashedInput = await hashPasswordWebCrypto(password)
    return hashedInput === hashedPassword
  } catch (error) {
    logger.error('Web Crypto password verification failed', { error: error instanceof Error ? error.message : 'Unknown error' })
    return false
  }
}

// Hash format detection functions
function isBcryptFormat(hash: string): boolean {
  // Bcrypt hashes start with $2a$, $2b$, or $2y$ followed by cost and salt
  return /^\$2[aby]\$\d{2}\$/.test(hash)
}

function isWebCryptoFormat(hash: string): boolean {
  // Web Crypto SHA-256 hash: exactly 64 hexadecimal characters
  return /^[a-fA-F0-9]{64}$/.test(hash)
}
