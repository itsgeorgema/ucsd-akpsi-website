// lib/supabase.ts
import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Server-side client for use in Server Components, Server Actions, and API routes
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

// Browser client for use in Client Components
export function createClientBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
// Example usage of Supabase clients

//import { createClient, createClientBrowser } from './supabase'

// ============================================
// SERVER COMPONENTS EXAMPLE
// ============================================
// Use this in Server Components (app directory)
/*export async function getServerSideData() {
  const supabase = await createClient()
  
  // Example: Get user on server side
  const { data: { user } } = await supabase.auth.getUser()
  
  // Example: Fetch data on server side
  const { data, error } = await supabase
    .from('your_table')
    .select('*')
  
  return { user, data, error }
}

// ============================================
// CLIENT COMPONENTS EXAMPLE
// ============================================
// Use this in Client Components (marked with 'use client')
export function useClientSideSupabase() {
  const supabase = createClientBrowser()
  
  // Example: Sign in
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }
  
  // Example: Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }
  
  // Example: Real-time subscription
  const subscribeToChanges = (callback: (payload: any) => void) => {
    const channel = supabase
      .channel('your_table_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'your_table' },
        callback
      )
      .subscribe()
    
    return () => supabase.removeChannel(channel)
  }
  
  return { supabase, signIn, signOut, subscribeToChanges }
}

// ============================================
// API ROUTES EXAMPLE
// ============================================*/
// Use this in API routes (app/api/*/route.ts)
/*export async function handleApiRequest() {
  const supabase = await createClient()
  
  // Example: API endpoint logic
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  const { data, error } = await supabase
    .from('your_table')
    .select('*')
    .eq('user_id', user.id)
  
  return Response.json({ data, error })
}

// ============================================
// SERVER ACTIONS EXAMPLE
// ============================================
// Use this in Server Actions
export async function serverAction(formData: FormData) {
  'use server'
  
  const supabase = await createClient()
  
  // Example: Handle form submission
  const { data, error } = await supabase
    .from('your_table')
    .insert({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    })
  
  return { data, error }
} */