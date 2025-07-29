import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiting (in production, use Redis or similar)
const loginAttempts = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for') || 
         request.headers.get('x-real-ip') || 
         'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const attempts = loginAttempts.get(ip);
  
  if (!attempts) return false;
  
  if (now > attempts.resetTime) {
    loginAttempts.delete(ip);
    return false;
  }
  
  return attempts.count >= MAX_ATTEMPTS;
}

function recordLoginAttempt(ip: string, success: boolean): void {
  const now = Date.now();
  const attempts = loginAttempts.get(ip);
  
  if (!attempts || now > attempts.resetTime) {
    loginAttempts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  } else {
    attempts.count = success ? 0 : attempts.count + 1;
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    
    // Check rate limiting
    if (isRateLimited(clientIP)) {
      return NextResponse.json({ 
        error: 'Too many login attempts. Please try again later.' 
      }, { status: 429 });
    }

    const { password } = await request.json();

    // Validate input
    if (!password || typeof password !== 'string') {
      recordLoginAttempt(clientIP, false);
      return NextResponse.json({ error: 'Invalid password format' }, { status: 400 });
    }

    // Check password against server-side environment variable
    const correctPassword = process.env.ACTIVE_PASSWORD;

    if (!correctPassword) {
      console.error('ACTIVE_PASSWORD environment variable not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    if (password === correctPassword) {
      recordLoginAttempt(clientIP, true);
      
      // Set secure HTTP-only cookie with expiration
      const response = NextResponse.json({ success: true });
      response.cookies.set('akpsi-auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3 * 60 * 60, // 3 hours
        path: '/'
      });
      
      return response;
    } else {
      recordLoginAttempt(clientIP, false);
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }
  } catch (err) {
    console.error('Auth API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 