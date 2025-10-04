import { serialize, parse } from 'cookie';

const SESSION_COOKIE_NAME = 'session_id';
const SESSION_SECRET = process.env.SESSION_SECRET || 'your-session-secret';

// Simple session storage (in production, use Redis or database)
const sessions = new Map();

// Generate session ID
function generateSessionId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Create session (like PHP session_start() + setting variables)
export function createSession(userId, username) {
  const sessionId = generateSessionId();
  
  sessions.set(sessionId, {
    user_id: userId,
    username: username,
    created_at: Date.now()
  });

  return serialize(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  });
}

// Get session data (like accessing $_SESSION)
export function getSession(req) {
  const cookies = parse(req.headers.cookie || '');
  const sessionId = cookies[SESSION_COOKIE_NAME];
  
  if (!sessionId || !sessions.has(sessionId)) {
    return null;
  }

  return sessions.get(sessionId);
}

// Destroy session (like session_destroy())
export function destroySession(req) {
  const cookies = parse(req.headers.cookie || '');
  const sessionId = cookies[SESSION_COOKIE_NAME];
  
  if (sessionId && sessions.has(sessionId)) {
    sessions.delete(sessionId);
  }

  return serialize(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/'
  });
}

// Check if user is logged in (like the auth_check.php)
export function requireAuth(handler) {
  return async (req, res) => {
    const session = getSession(req);
    
    if (!session) {
      // Redirect to login for dashboard pages
      if (req.url.startsWith('/dashboard') && !req.url.includes('/login')) {
        return res.redirect(302, '/dashboard/login');
      }
      
      // Return 401 for API routes
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Add session data to request (like $_SESSION)
    req.session = session;
    
    return handler(req, res);
  };
}
