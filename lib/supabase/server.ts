import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase client for use in Server Components, Server Actions, and
 * Route Handlers. Reads the authenticated user's session from cookies,
 * so all queries run AS that user — meaning Row Level Security applies
 * exactly as it would for any authenticated request. This is the
 * client that should be used for everything except the two narrow
 * service-role use cases handled by lib/supabase/admin.ts.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, {
                ...options,
                // The @supabase/ssr default is httpOnly: false, which
                // leaves the session cookie readable by any JavaScript
                // running on the page. We explicitly force the secure
                // flags here so the auth cookie can never be read or
                // exfiltrated via client-side script, even if an XSS
                // vector were ever introduced elsewhere in the app.
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
              })
            );
          } catch {
            // setAll is called from a Server Component in some cases,
            // where cookie mutation isn't allowed. Safe to ignore here
            // because middleware refreshes the session on every request.
          }
        },
      },
    }
  );
}
