import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.SUPABASE_URL as string;
const supabaseAnonKey: string = process.env.SUPABASE_PUBLIC as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be defined");
}

// Initialize the Supabase client
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export { supabase };
