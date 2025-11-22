import { createClient } from '@supabase/supabase-js';

export function getSupabase() {
    return createClient(
        import.meta.env.SUPABASE_URL,
        import.meta.env.SUPABASE_ANON_KEY
    );
}
