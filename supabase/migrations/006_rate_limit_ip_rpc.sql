-- =====================================================================
-- Prime Eye Research — Migration 006: Rate Limit IP Helper RPC
-- =====================================================================
-- Postgres's built-in set_config() is not exposed via PostgREST by
-- default, so the application layer cannot call it directly as an RPC.
-- This migration adds a small, narrowly-scoped wrapper function that
-- IS safe to expose: it only ever sets the single 'app.client_ip'
-- session variable consumed by enforce_rate_limit() (migration 004),
-- and accepts a single text argument with basic shape validation.
-- =====================================================================

create or replace function public.set_client_ip(ip text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Basic sanity check: reject anything wildly malformed rather than
  -- silently accepting arbitrary strings into a session GUC. This is
  -- not a strict IPv4/IPv6 validator — it just guards against empty
  -- or absurdly long values being passed through.
  if ip is null or length(ip) = 0 or length(ip) > 64 then
    ip := 'unknown';
  end if;

  perform set_config('app.client_ip', ip, true);
end;
$$;

comment on function public.set_client_ip(text) is
  'Sets the app.client_ip session variable consumed by enforce_rate_limit(). Safe to call from anon/authenticated roles — it can only set this one specific session variable, nothing else.';

revoke all on function public.set_client_ip(text) from public;
grant execute on function public.set_client_ip(text) to anon, authenticated;
