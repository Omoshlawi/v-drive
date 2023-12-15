import { SupabaseClient, createClient } from "@supabase/supabase-js";
let _supabaseInstance: SupabaseClient | undefined;

const getSupabaseInstance = () => {
  if (!_supabaseInstance) {
    console.log(process.env.NEXT_PUBLIC_SUPABASE_URL as string);
    console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);

    _supabaseInstance = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );
  }
  return _supabaseInstance;
};

export default getSupabaseInstance;
