-- =====================================================================
-- Prime Eye Research — Migration 004: Rate Limiting
-- =====================================================================
-- Defends the two public-writable tables (leads, research_requests)
-- against spam/abuse. Enforced at the database level via a trigger,
-- so it cannot be bypassed even if someone calls the Supabase REST
-- API directly instead of going through the website's forms.
--
-- Policy: max 5 submissions per IP address per rolling 10-minute
-- window, per table. Adjust thresholds below as real traffic patterns
-- become clear.
-- =====================================================================

create table if not exists public.rate_limit_log (
  id bigint generated always as identity primary key,
  ip_address text not null,
  table_name text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_rate_limit_lookup
  on public.rate_limit_log(ip_address, table_name, created_at desc);

-- Housekeeping: old rows are harmless but should not accumulate forever.
-- This function can be invoked periodically (e.g. via a Supabase cron
-- job / pg_cron) to prune anything older than 24 hours.
create or replace function public.prune_rate_limit_log()
returns void
language sql
as $$
  delete from public.rate_limit_log
  where created_at < now() - interval '24 hours';
$$;

-- Core enforcement function. Raises an exception (blocking the insert)
-- if the caller's IP has exceeded the threshold for this table in the
-- last 10 minutes. The IP is supplied by the application layer via
-- `current_setting('request.headers', true)` when called through
-- PostgREST, falling back to a passed-in value for Server Action use.
create or replace function public.enforce_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_ip text;
  v_count int;
  v_limit int := 5;
  v_window interval := interval '10 minutes';
begin
  -- The application (Server Action) is required to set this via
  -- set_config('app.client_ip', '<ip>', true) before the insert.
  -- If it's not set, fail closed (reject) rather than fail open.
  v_ip := current_setting('app.client_ip', true);

  if v_ip is null or v_ip = '' then
    raise exception 'Rate limit check failed: client IP not provided';
  end if;

  select count(*) into v_count
  from public.rate_limit_log
  where ip_address = v_ip
    and table_name = TG_TABLE_NAME
    and created_at > now() - v_window;

  if v_count >= v_limit then
    raise exception 'Rate limit exceeded. Please try again later.';
  end if;

  insert into public.rate_limit_log (ip_address, table_name)
  values (v_ip, TG_TABLE_NAME);

  return new;
end;
$$;

create trigger leads_rate_limit
  before insert on public.leads
  for each row execute function public.enforce_rate_limit();

create trigger research_requests_rate_limit
  before insert on public.research_requests
  for each row execute function public.enforce_rate_limit();

comment on function public.enforce_rate_limit() is
  'Blocks more than 5 inserts per IP per 10 minutes on the table it is attached to. The calling Server Action MUST set app.client_ip via set_config before inserting, or the insert is rejected.';
