import { headers } from "next/headers";

/**
 * Best-effort client IP extraction for use with the database-level
 * rate limiter (see migration 004). Vercel and most reverse proxies
 * set x-forwarded-for; we take the first (left-most) entry, which is
 * the original client. This is not perfectly spoof-proof on every
 * possible hosting setup, but combined with the DB-level trigger it
 * provides real protection against casual/automated abuse, which is
 * the realistic threat model for a public lead-gen form.
 *
 * If no proxy header is present at all (e.g. local development, or a
 * non-standard hosting setup), we deliberately do NOT fall back to a
 * fixed string like "unknown" — that would put every such visitor
 * into the same rate-limit bucket and let one person's submissions
 * incorrectly block everyone else's. Instead we generate a random,
 * request-scoped identifier so each request is rate-limited
 * independently rather than sharing a bucket with strangers. This is
 * less useful as an anti-abuse measure in that specific environment,
 * but it never produces incorrect cross-user blocking.
 */
export async function getClientIp(): Promise<string> {
  const headerList = await headers();

  const forwardedFor = headerList.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = headerList.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return `unidentified-${crypto.randomUUID()}`;
}
