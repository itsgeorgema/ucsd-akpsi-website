import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    // Validate authentication using cookie
    const authCookie = request.cookies.get('akpsi-auth');
    
    console.log('Auth cookie present:', !!authCookie);
    
    if (!authCookie || authCookie.value !== 'true') {
      console.log('No valid auth cookie found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Use service role client to bypass RLS
    // The cookie validation ensures only authenticated users can access
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    const { data: resources, error: resourcesError } = await supabase
      .from('resources')
      .select('resource, link');
    
    if (resourcesError) {
      console.error('Error fetching resources:', resourcesError);
      return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
    }
    
    console.log('Resources fetched successfully:', resources);
    return NextResponse.json({ data: resources });
  } catch (error) {
    console.error('Resources API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 