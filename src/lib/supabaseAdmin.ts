import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (typeof window !== 'undefined') {
  throw new Error('ABORTTTT!!! SECURITY BREACH!!!! (supabaseAdmin must never be imported in the browser)');
}

if (!url || !serviceKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables');
}

export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { persistSession: false },
});
