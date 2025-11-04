import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Helper function to safely parse origins and compare exactly
function isOriginAllowed(requestOrigin: string, allowedOrigins: string[]): boolean {
  try {
    const requestUrl = new URL(requestOrigin)
    return allowedOrigins.some(allowed => {
      try {
        const allowedUrl = new URL(allowed)
        return requestUrl.origin === allowedUrl.origin
      } catch {
        return false
      }
    })
  } catch {
    return false
  }
}

// Build CORS allowlist from environment
function getCorsAllowedOrigins(isDev: boolean): string[] {
  if (isDev) {
    return ['http://localhost:3000', 'http://localhost:3001', 'https://v0.dev', 'https://v0.app', 'https://api.v0.dev', 'https://api.v0.app', 'https://*.v0.dev', 'https://vercel.live']
  }
  
  const envOrigins = process.env.CORS_ALLOWED_ORIGINS
  const productionUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://detechnics.com'
  
  // Default origins including comprehensive v0 domains
  const defaultOrigins = [
    productionUrl,
    'https://v0.dev',
    'https://v0.app',
    'https://api.v0.dev',
    'https://api.v0.app',
    'https://*.v0.dev',
    'https://vercel.live',
    'https://*.vercel.app'
  ]
  
  if (envOrigins) {
    const customOrigins = envOrigins.split(',').map(o => o.trim()).filter(Boolean)
    return [...defaultOrigins, ...customOrigins]
  }
  
  return defaultOrigins
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const referer = request.headers.get('referer') || ''
  
  // Environment-based early optimization
  const deploymentEnv = process.env.DEPLOYMENT_ENV || 'production'
  const isV0Environment = deploymentEnv === 'v0'
  
  // Skip expensive operations for v0 environment
  if (isV0Environment) {
    // Ultra-fast path for v0: minimal processing
    const response = NextResponse.next()
    
    // Only set essential CORS for API routes in v0
    if (pathname.startsWith('/api/')) {
      const origin = request.headers.get('origin')
      response.headers.set('Access-Control-Allow-Origin', origin || '*')
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', '*')
      response.headers.set('Access-Control-Allow-Credentials', 'true')
    }
    
    // Handle preflight for v0
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 200, headers: Object.fromEntries(response.headers) })
    }
    
    return response
  }

  // Enforce HTTPS (SEO-friendly) if the request reached us over HTTP
  // Many platforms set x-forwarded-proto to indicate original scheme
  const xfProto = request.headers.get('x-forwarded-proto')
  if (xfProto === 'http' && (process.env.NODE_ENV || 'production') !== 'development') {
    const url = new URL(request.url)
    url.protocol = 'https:'
    return NextResponse.redirect(url, 308)
  }

  // Rewrites for legacy absolute asset paths when coming from legacy pages
  let response: NextResponse | undefined
  if ((pathname.startsWith('/css/') || pathname.startsWith('/js/') || pathname.startsWith('/images/')) && referer) {
    try {
      const refUrl = new URL(referer)
      if (refUrl.pathname.startsWith('/legacy_html')) {
        const dest = new URL(`/legacy_html${pathname}`, request.url)
        response = NextResponse.rewrite(dest)
      }
    } catch {}
  }

  // Security headers for all requests (skip for v0 - handled above)
  if (!response) {
    response = NextResponse.next()
  }
  
  // Per-request nonce for CSP (only for non-v0 environments)
  const nonce = crypto.randomUUID()
  response.headers.set('x-csp-nonce', nonce)
  
  // Environment-based security configuration
  const currentUrl = new URL(request.url)
  
  // Debug toggles: allow disabling or loosening CSP for troubleshooting
  const debugNoCsp = false
  const debugLooseCsp = false  // v0 is handled separately above
  const debugOpenCors = false  // v0 is handled separately above
  
  // Environment-based security headers (v0 skipped above)
  if ((process.env.NODE_ENV || 'production') !== 'development') {
    // Enhanced HSTS with longer max-age and preload (production only)
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
    // Additional security headers
    response.headers.set('X-Permitted-Cross-Domain-Policies', 'none')
    response.headers.set('X-XSS-Protection', '1; mode=block')
  }
  
  // Frame options: strict for production
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  // Cross-Origin-Opener-Policy
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin')
  
  // Development CSP with tightened security
  const isDev = (process.env.NODE_ENV || 'production') === 'development'
  // Build CSP: relax for legacy pages so nonced legacy scripts can run
  const cspGeneral = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://vercel.live` + 
      (isDev ? " 'unsafe-eval'" : "") + " https://v0.dev https://v0.app https://api.v0.dev https://api.v0.app 'unsafe-inline'",
    `style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com`,
    "img-src 'self' data: blob: https://*.blob.vercel-storage.com" + (isDev ? " http://localhost:*" : ""),
    "font-src 'self' data: https://cdnjs.cloudflare.com https://fonts.gstatic.com",
    `connect-src 'self' https://v0.dev https://v0.app https://api.v0.dev https://api.v0.app https://v0chat.vercel.sh https://vercel.live/ https://vercel.com https://*.pusher.com/ https://blob.vercel-storage.com https://*.blob.vercel-storage.com https://blobs.vusercontent.net wss://*.pusher.com/ https://fides-vercel.us.fides.ethyca.com/api/v1/ https://cdn-api.ethyca.com/location https://privacy-vercel.us.fides.ethyca.com/api/v1/ https://api.getkoala.com https://*.sentry.io/api/ https://huggingface.co/onnx-community/ https://cas-bridge.xethub.hf.co/xet-bridge-us/ https://cdn.jsdelivr.net/npm/@huggingface/${isDev ? ' ws: http://localhost:*' : ''}`,
    "frame-ancestors 'none'",
    "frame-src 'self' https://www.google.com https://maps.google.com https://www.youtube.com https://v0.dev https://v0.app",
    "worker-src 'self' blob:",
    "base-uri 'none'"
  ].join('; ')

  const cspLegacy = [
    "default-src 'self'",
    // Allow legacy scripts without nonce and without strict-dynamic
    `script-src 'self' 'unsafe-inline'`,
    `style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com`,
    "img-src 'self' data: blob: https://*.blob.vercel-storage.com" + (isDev ? " http://localhost:*" : ""),
    "font-src 'self' data: https://cdnjs.cloudflare.com https://fonts.gstatic.com",
    `connect-src 'self'`,
    "frame-ancestors 'none'",
    "frame-src 'self' https://www.google.com https://maps.google.com https://www.youtube.com",
    "base-uri 'none'"
  ].join('; ')

  // Apply CSP header unless disabled; support a very loose policy for debugging
  if (!debugNoCsp) {
    if (debugLooseCsp) {
      const cspLoose = [
        "default-src * data: blob: 'unsafe-inline' 'unsafe-eval'",
        "script-src * data: blob: 'unsafe-inline' 'unsafe-eval'",
        "style-src * data: blob: 'unsafe-inline'",
        "img-src * data: blob:",
        "connect-src * data: blob: ws: wss:",
        "font-src * data: blob:",
        "frame-src * data: blob:",
        "worker-src * blob: data:",
        "base-uri 'self'"
      ].join('; ')
      response.headers.set('Content-Security-Policy', cspLoose)
    } else {
      response.headers.set('Content-Security-Policy', pathname.startsWith('/legacy_html') ? cspLegacy : cspGeneral)
    }
  }

  // Set CORS headers (only for API routes to reduce header bloat)
  const isApiRoute = pathname.startsWith('/api/')
  if (isApiRoute) {
    const origin = request.headers.get('origin')
    const reqHeaders = request.headers.get('access-control-request-headers') || '*'
    
    // Always set Vary: Origin to prevent cache issues
    response.headers.set('Vary', 'Origin')
    
    if (debugOpenCors) {
      // Fully open CORS: reflect origin when present (supports credentials), otherwise allow *
      if (origin) {
        response.headers.set('Access-Control-Allow-Origin', origin)
        response.headers.set('Access-Control-Allow-Credentials', 'true')
      } else {
        response.headers.set('Access-Control-Allow-Origin', '*')
      }
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', reqHeaders)
      response.headers.set('Access-Control-Expose-Headers', 'Content-Disposition')
      response.headers.set('Access-Control-Max-Age', '86400')
    } else {
      const allowedOrigins = getCorsAllowedOrigins(isDev)
      if (origin && isOriginAllowed(origin, allowedOrigins)) {
        response.headers.set('Access-Control-Allow-Origin', origin)
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token, x-csrf-token, X-Requested-With, Accept')
        response.headers.set('Access-Control-Allow-Credentials', 'true')
        response.headers.set('Access-Control-Expose-Headers', 'Content-Disposition')
        response.headers.set('Access-Control-Max-Age', '600')
      }
    }
  }

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { 
      status: 200, 
      headers: Object.fromEntries(response.headers) 
    })
  }

  // Skip auth check for public routes and v0 origins
  const origin = request.headers.get('origin')
  const isV0Origin = origin && (origin.includes('v0.dev') || origin.includes('v0.app') || origin.includes('api.v0.dev') || origin.includes('api.v0.app'))
  
  if (
    isV0Origin || // Allow v0 origins without auth
    pathname.startsWith('/api/healthz') ||
    pathname.startsWith('/api/auth/login') ||
    pathname.startsWith('/api/auth/session') ||
    pathname.startsWith('/api/auth/logout') ||
    pathname.startsWith('/api/test-db') ||
    pathname.startsWith('/api/quote') ||
    pathname.startsWith('/api/contact') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return response
  }

  // Auth check for dashboard routes (cookie presence only; full validation happens in route handlers)
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/api/')) {
    const sessionCookie = request.cookies.get('session')
    
    if (!sessionCookie) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
          { status: 401 }
        )
      }
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
