
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createClient = (NEXT_PUBLIC_SUPABASE_URL: string | undefined, NEXT_PUBLIC_SUPABASE_ANON_KEY: string | undefined) =>
  createBrowserClient(
    supabaseUrl!,
    supabaseKey!,
  );
