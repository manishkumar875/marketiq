import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client. This BYPASSES Row Level Security
 * entirely. It exists for exactly one purpose in this codebase:
 * writing to audit_log, which intentionally has no INSERT policy for
 * 'anon' or 'authenticated' roles (see migration 003) so that the
 * audit trail cannot be forged or padded from the client or even by
 * an authenticated admin directly.
 *
 * The `import "server-only"` directive above makes Next.js throw a
 * build-time error if this file is ever imported into client-side
 * code, as an additional guardrail on top of the env var itself never
 * being prefixed with NEXT_PUBLIC_.
 *
 * Do NOT use this client for anything else. Every other database
 * operation in this app must go through lib/supabase/server.ts so
 * that RLS policies are correctly enforced.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase service role configuration. Set SUPABASE_SERVICE_ROLE_KEY in your environment."
    );
  }

  return createSupabaseClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
