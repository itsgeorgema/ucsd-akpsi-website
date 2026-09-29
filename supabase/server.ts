import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Read-only client for server rendering. It uses the public anon key, so it
 * must only be pointed at tables that are safe to expose publicly.
 */
export const createServerClient = () =>
  createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
