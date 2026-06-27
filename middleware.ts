import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Runs on every request. Responsible for:
 *   1. Refreshing the Supabase auth session (required for SSR auth to
 *      work correctly with Next.js).
 *   2. Gatekeeping every /admin route (except /admin/login) — if there
 *      is no authenticated session, redirect to /admin/login before
 *      any page code runs. This is a defense-in-depth layer; the real
 *      enforcement is Row Level Security at the database, but failing
 *      fast here means an unauthenticated visitor never even sees the
 *      admin UI shell or triggers a data fetch attempt.
 *   3. Applying security headers to every response.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname === "/admin/login";

  let user: { id: string } | null = null;
  let authCheckFailed = false;

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, {
                ...options,
                // Same rationale as lib/supabase/server.ts: force
                // httpOnly so the session cookie can never be read via
                // client-side JavaScript, overriding the @supabase/ssr
                // default of httpOnly: false.
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
              })
            );
          },
        },
      }
    );

    const result = await supabase.auth.getUser();
    user = result.data.user;
  } catch (error) {
    // Supabase env vars missing/invalid, or the auth service is
    // unreachable. This must NEVER crash the whole site (public,
    // non-admin routes should keep working), but it must also NEVER
    // be treated as "user is authenticated" — fail closed, not open.
    authCheckFailed = true;
    if (isAdminRoute) {
      console.error("Middleware auth check failed for an admin route:", error);
    }
  }

  // Any admin route (other than login) with no confirmed, successfully
  // verified user is treated as unauthenticated — this covers both the
  // normal "not logged in" case and the "auth check itself failed" case
  // identically, so a Supabase outage or misconfiguration can never
  // grant access by accident.
  if (isAdminRoute && !isLoginRoute && (!user || authCheckFailed)) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return applySecurityHeaders(NextResponse.redirect(loginUrl));
  }

  // If already logged in, don't show the login page again. If the auth
  // check failed, fall through and just show the login page as normal
  // rather than guessing.
  if (isLoginRoute && user && !authCheckFailed) {
    return applySecurityHeaders(
      NextResponse.redirect(new URL("/admin/leads", request.url))
    );
  }

  return applySecurityHeaders(response);
}

function applySecurityHeaders(response: NextResponse) {
  // Content-Security-Policy: restrict where scripts/styles/connections
  // can come from. 'unsafe-inline'/'unsafe-eval' for styles are needed
  // for Tailwind/Next's runtime style injection in dev; in a stricter
  // production hardening pass this can be tightened further with
  // nonces if desired.
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      `connect-src 'self' ${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""}`,
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ")
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  );
  return response;
}

export const config = {
  matcher: [
    /*
     * Run on every route except static assets and image optimization
     * files, so headers/auth checks apply broadly without wasting
     * cycles on things like /_next/static/*.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
