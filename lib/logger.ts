// lib/logger.ts
interface LogEntry {
  timestamp: string
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  requestId?: string
  route?: string
  userId?: string
  ip?: string
  [key: string]: any
}

class Logger {
  private maskSensitiveData(data: any): any {
    if (typeof data !== 'object' || data === null) {
      return data
    }

    const masked = { ...data }
    const sensitiveKeys = ['password', 'token', 'secret', 'key', 'auth']
    
    for (const key in masked) {
      if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
        masked[key] = '[REDACTED]'
      } else if (key === 'email' && typeof masked[key] === 'string') {
        // Mask email addresses for privacy
        const email = masked[key] as string
        const [local, domain] = email.split('@')
        if (local && domain) {
          masked[key] = `${local.substring(0, 2)}***@${domain}`
        }
      } else if (key === 'phone' && typeof masked[key] === 'string') {
        // Mask phone numbers
        const phone = masked[key] as string
        masked[key] = phone.length > 4 ? `***${phone.slice(-4)}` : '***'
      } else if (typeof masked[key] === 'object') {
        masked[key] = this.maskSensitiveData(masked[key])
      }
    }

    return masked
  }

  private log(level: LogEntry['level'], message: string, meta: Omit<LogEntry, 'timestamp' | 'level' | 'message'> = {}) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...this.maskSensitiveData(meta)
    }

    // In production, you might want to send to a logging service
    if (process.env.NODE_ENV === 'production') {
      console.log(JSON.stringify(entry))
    } else {
      console.log(`[${entry.timestamp}] ${level.toUpperCase()}: ${message}`, meta)
    }
  }

  info(message: string, meta?: any) {
    this.log('info', message, meta)
  }

  warn(message: string, meta?: any) {
    this.log('warn', message, meta)
  }

  error(message: string, meta?: any) {
    this.log('error', message, meta)
  }

  debug(message: string, meta?: any) {
    if (process.env.NODE_ENV !== 'production') {
      this.log('debug', message, meta)
    }
  }
}

export const logger = new Logger()
