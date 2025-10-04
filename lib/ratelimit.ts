// lib/ratelimit.ts
import { logger } from './logger'

interface RateLimitEntry {
  count: number
  resetTime: number
}

// In-memory rate limit store (use Redis in production)
const rateLimitStore = new Map<string, RateLimitEntry>()

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

export async function checkRateLimit(
  request: Request,
  identifier: string,
  maxRequests: number = 60,
  windowMs: number = 5 * 60 * 1000 // 5 minutes
): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
  const now = Date.now()
  const key = `${identifier}:${request.url}`
  
  let entry = rateLimitStore.get(key)
  
  if (!entry || now > entry.resetTime) {
    // Create new entry or reset expired one
    entry = {
      count: 1,
      resetTime: now + windowMs
    }
    rateLimitStore.set(key, entry)
    
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: entry.resetTime
    }
  }
  
  if (entry.count >= maxRequests) {
    logger.warn('Rate limit exceeded', {
      identifier,
      url: request.url,
      count: entry.count,
      maxRequests
    })
    
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime
    }
  }
  
  entry.count++
  
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetTime: entry.resetTime
  }
}

export function getClientIP(request: Request): string {
  // Check various headers for the real IP
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  return 'unknown'
}
