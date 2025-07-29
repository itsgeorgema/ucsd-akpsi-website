import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Clear the authentication cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('akpsi-auth', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Expire immediately
      path: '/'
    });
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 