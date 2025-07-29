import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Check for the authentication cookie
    const authCookie = request.cookies.get('akpsi-auth');
    
    if (!authCookie || authCookie.value !== 'true') {
      return NextResponse.json({ valid: false, error: 'No valid session' }, { status: 401 });
    }
    
    // Cookie is automatically expired by the browser after maxAge
    // No need to check expiration manually since the browser handles it
    
    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error('Session validation error:', error);
    return NextResponse.json({ valid: false, error: 'Internal server error' }, { status: 500 });
  }
} 