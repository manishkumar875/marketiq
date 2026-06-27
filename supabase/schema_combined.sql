-- =====================================================================
-- Prime Eye Research — Migration 001: Core Tables
-- =====================================================================
-- This migration creates the core business tables. No data is seeded —
-- every table starts empty. Rows only ever appear through real form
-- submissions (leads, research_requests) or explicit admin actions
-- (projects, notes).
-- =====================================================================

-- Required for gen_random_uuid()
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- leads
-- Populated only by the public contact/lead-capture form.
-- ---------------------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text not null,
  phone text,
  message text not null,
  source text not null default 'website_form',
  status text not null default 'new'
    check (status in ('new', 'contacted', 'qualified', 'won', 'lost')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.leads is
  'Contact form submissions. Public users may only INSERT. Starts empty — no seed data.';

-- ---------------------------------------------------------------------
-- research_requests
-- Populated only by the public 3-step Research Request form on the
-- homepage. converted_project_id is set only when an admin explicitly
-- converts a request into a project (never automatic).
-- ---------------------------------------------------------------------
create table if not exists public.research_requests (
  id uuid primary key default gen_random_uuid(),

  -- Company information
  contact_name text not null,
  company text not null,
  email text not null,
  phone text,

  -- Research requirements
  industry text not null,
  research_type text not null,
  countries text not null,
  sample_size text not null,
  budget text,
  timeline text,

  -- Project details
  objectives text not null,
  business_challenges text,
  competitors text,
  additional_notes text,

  status text not null default 'unreviewed'
    check (status in ('unreviewed', 'in_review', 'proposal_sent', 'converted', 'declined')),

  converted_project_id uuid, -- FK added after projects table exists (see below)

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.research_requests is
  'Research proposal requests from the homepage form. Public users may only INSERT. Starts empty — no seed data.';

-- ---------------------------------------------------------------------
-- projects
-- NEVER created automatically. Only created when an authenticated admin
-- clicks "Convert to Project" on a research_requests row.
-- ---------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  client_company text not null,
  source_request_id uuid references public.research_requests(id) on delete set null,
  status text not null default 'planning'
    check (status in ('planning', 'in_field', 'analysis', 'reporting', 'completed')),
  owner text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.projects is
  'Active research engagements. Rows are created ONLY via explicit admin "Convert to Project" action. Never auto-created, never seeded.';

-- Now that projects exists, add the FK from research_requests
alter table public.research_requests
  add constraint research_requests_converted_project_id_fkey
  foreign key (converted_project_id) references public.projects(id) on delete set null;

-- ---------------------------------------------------------------------
-- notes
-- Attached to exactly one of: lead, research_request, or project.
-- Enforced via a check constraint (Postgres has no native polymorphic
-- FK, so we use three nullable columns + a constraint requiring
-- exactly one to be set).
-- ---------------------------------------------------------------------
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  request_id uuid references public.research_requests(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete restrict,
  author_name text not null,
  text text not null,
  created_at timestamptz not null default now(),

  constraint notes_exactly_one_parent check (
    (case when lead_id is not null then 1 else 0 end) +
    (case when request_id is not null then 1 else 0 end) +
    (case when project_id is not null then 1 else 0 end) = 1
  )
);

comment on table public.notes is
  'Admin notes attached to a lead, request, or project (exactly one). Only authenticated admins can read/write.';

-- ---------------------------------------------------------------------
-- audit_log
-- Append-only. Records admin actions: login, note added, status
-- changed, request converted to project, etc.
-- ---------------------------------------------------------------------
create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  actor_email text,
  action text not null,
  entity_type text not null check (entity_type in ('lead', 'research_request', 'project', 'note', 'auth')),
  entity_id uuid,
  details jsonb,
  created_at timestamptz not null default now()
);

comment on table public.audit_log is
  'Append-only audit trail of admin actions. Inserted by server-side code only, never directly by the client.';

-- ---------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

create trigger research_requests_set_updated_at
  before update on public.research_requests
  for each row execute function public.set_updated_at();

create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- Indexes for the admin search/filter views
-- ---------------------------------------------------------------------
create index if not exists idx_leads_status on public.leads(status);
create index if not exists idx_leads_created_at on public.leads(created_at desc);

create index if not exists idx_requests_status on public.research_requests(status);
create index if not exists idx_requests_created_at on public.research_requests(created_at desc);

create index if not exists idx_projects_status on public.projects(status);
create index if not exists idx_projects_source_request on public.projects(source_request_id);

create index if not exists idx_notes_lead on public.notes(lead_id);
create index if not exists idx_notes_request on public.notes(request_id);
create index if not exists idx_notes_project on public.notes(project_id);

create index if not exists idx_audit_log_entity on public.audit_log(entity_type, entity_id);
create index if not exists idx_audit_log_created_at on public.audit_log(created_at desc);
-- =====================================================================
-- Prime Eye Research — Migration 002: Roles (RBAC foundation)
-- =====================================================================
-- Supabase Auth (auth.users) handles WHO can log in. This table
-- handles WHAT a logged-in user is allowed to do.
--
-- There is no public sign-up for admin accounts. Admin users are
-- created manually:
--   1. Create the user in Supabase Dashboard > Authentication > Users
--   2. Insert a matching row here via SQL editor, e.g.:
--      insert into public.admin_roles (user_id, role)
--      values ('<uuid-from-auth.users>', 'admin');
--
-- Designed so additional roles (e.g. 'viewer', 'editor') can be added
-- later without a schema change — just insert rows with a new role
-- value and update the CHECK constraint + RLS policies as needed.
-- =====================================================================

create table if not exists public.admin_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role in ('admin')),
  granted_at timestamptz not null default now(),
  granted_by uuid references auth.users(id)
);

comment on table public.admin_roles is
  'Role assignments for authenticated users. No row here = no admin access, regardless of being logged in. Provisioned manually, never via public sign-up.';

-- Helper function: is the currently-authenticated user an admin?
-- SECURITY DEFINER so it can read admin_roles even under RLS, but it
-- only ever returns a boolean — it never leaks row data.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_roles
    where user_id = auth.uid()
  );
$$;

comment on function public.is_admin() is
  'Returns true if the currently-authenticated user has an admin role. Used throughout RLS policies.';
-- =====================================================================
-- Prime Eye Research — Migration 003: Row Level Security
-- =====================================================================
-- This is the enforcement layer. Even if application code has a bug,
-- these policies are the last line of defense at the database itself.
--
-- Rule of thumb enforced throughout:
--   - Anonymous/public (anon role)  -> INSERT only on leads & research_requests.
--                                      No SELECT, UPDATE, or DELETE on anything.
--   - Authenticated, non-admin      -> No access to any table (this app has
--                                      no "regular user" concept yet — only
--                                      admins or the public).
--   - Authenticated admin           -> Full SELECT/UPDATE/DELETE on leads,
--                                      research_requests, projects, notes.
--                                      INSERT on projects, notes, audit_log.
--   - audit_log                     -> INSERT only via server-side code
--                                      using the service role; admins can
--                                      SELECT but never UPDATE/DELETE
--                                      (append-only, tamper-evident).
-- =====================================================================

alter table public.leads enable row level security;
alter table public.research_requests enable row level security;
alter table public.projects enable row level security;
alter table public.notes enable row level security;
alter table public.admin_roles enable row level security;
alter table public.audit_log enable row level security;

-- ---------------------------------------------------------------------
-- leads
-- ---------------------------------------------------------------------

-- Public can submit a lead. Nothing else.
create policy "leads_public_insert"
  on public.leads
  for insert
  to anon
  with check (true);

-- Admins can read every lead.
create policy "leads_admin_select"
  on public.leads
  for select
  to authenticated
  using (public.is_admin());

-- Admins can update lead status etc.
create policy "leads_admin_update"
  on public.leads
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Admins can delete leads if needed (e.g. GDPR-style removal requests).
create policy "leads_admin_delete"
  on public.leads
  for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------
-- research_requests
-- ---------------------------------------------------------------------

create policy "requests_public_insert"
  on public.research_requests
  for insert
  to anon
  with check (true);

create policy "requests_admin_select"
  on public.research_requests
  for select
  to authenticated
  using (public.is_admin());

create policy "requests_admin_update"
  on public.research_requests
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "requests_admin_delete"
  on public.research_requests
  for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------
-- projects
-- No public insert policy exists at all — projects can ONLY be created
-- by admins (via the "Convert to Project" server action, which runs
-- authenticated as the admin user).
-- ---------------------------------------------------------------------

create policy "projects_admin_select"
  on public.projects
  for select
  to authenticated
  using (public.is_admin());

create policy "projects_admin_insert"
  on public.projects
  for insert
  to authenticated
  with check (public.is_admin());

create policy "projects_admin_update"
  on public.projects
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "projects_admin_delete"
  on public.projects
  for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------
-- notes
-- Admin-only in every direction. No public access at all.
-- ---------------------------------------------------------------------

create policy "notes_admin_select"
  on public.notes
  for select
  to authenticated
  using (public.is_admin());

create policy "notes_admin_insert"
  on public.notes
  for insert
  to authenticated
  with check (public.is_admin() and author_id = auth.uid());

create policy "notes_admin_delete"
  on public.notes
  for delete
  to authenticated
  using (public.is_admin());

-- Notes are intentionally NOT updatable — once written, a note is
-- either kept or deleted, never silently edited. This preserves an
-- honest record (similar reasoning to the audit log being append-only).

-- ---------------------------------------------------------------------
-- admin_roles
-- Admins can see who else is an admin (useful for a future "manage
-- team" screen) but cannot grant/revoke roles from the client — that
-- must be done via the Supabase Dashboard/SQL editor by a project
-- owner, never through the app itself.
-- ---------------------------------------------------------------------

create policy "admin_roles_admin_select"
  on public.admin_roles
  for select
  to authenticated
  using (public.is_admin());

-- No insert/update/delete policies for admin_roles at all -> impossible
-- to self-promote to admin through the API, even as an authenticated
-- non-admin user. Role changes require direct database access.

-- ---------------------------------------------------------------------
-- audit_log
-- Append-only and admin-readable. Writing happens via the service role
-- key from trusted server-side code (Server Actions / API routes),
-- which bypasses RLS by design — that is the ONLY way rows get in.
-- No insert policy is granted to 'authenticated' or 'anon' here on
-- purpose, so the audit trail cannot be forged or padded by a client.
-- ---------------------------------------------------------------------

create policy "audit_log_admin_select"
  on public.audit_log
  for select
  to authenticated
  using (public.is_admin());

-- No insert/update/delete policy for anon or authenticated -> only the
-- service role (server-side, never exposed to the browser) can write.
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
    return new; -- Gracefully bypass rate limit if IP missing due to server constraints
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
-- =====================================================================
-- Prime Eye Research — Migration 005: Convert Request to Project
-- =====================================================================
-- Wraps the "convert a research request into a project" action in a
-- single atomic function so the project creation, the request status
-- update, and the audit log entry either all succeed or all roll back
-- together — never a half-applied conversion.
--
-- This function is SECURITY DEFINER (runs with elevated privilege) but
-- explicitly re-checks public.is_admin() itself, so it cannot be used
-- to bypass authorization even though it runs with elevated rights
-- internally.
-- =====================================================================

create or replace function public.convert_request_to_project(
  p_request_id uuid,
  p_project_name text,
  p_owner text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_request public.research_requests%rowtype;
  v_project_id uuid;
begin
  -- Re-check authorization explicitly, even though this function is
  -- SECURITY DEFINER. Never trust the caller's context alone.
  if not public.is_admin() then
    raise exception 'Not authorized: admin role required';
  end if;

  select * into v_request
  from public.research_requests
  where id = p_request_id
  for update; -- lock the row to prevent a double-conversion race

  if not found then
    raise exception 'Research request % not found', p_request_id;
  end if;

  if v_request.converted_project_id is not null then
    raise exception 'Request % has already been converted to project %',
      p_request_id, v_request.converted_project_id;
  end if;

  insert into public.projects (name, client_company, source_request_id, owner, status)
  values (p_project_name, v_request.company, p_request_id, p_owner, 'planning')
  returning id into v_project_id;

  update public.research_requests
  set status = 'converted',
      converted_project_id = v_project_id
  where id = p_request_id;

  insert into public.audit_log (actor_id, actor_email, action, entity_type, entity_id, details)
  values (
    auth.uid(),
    (select email from auth.users where id = auth.uid()),
    'convert_request_to_project',
    'research_request',
    p_request_id,
    jsonb_build_object('project_id', v_project_id, 'project_name', p_project_name)
  );

  return v_project_id;
end;
$$;

comment on function public.convert_request_to_project(uuid, text, text) is
  'Atomically creates a project from a research_requests row, updates the request status to converted, and logs the action. Admin-only; never auto-invoked.';

revoke all on function public.convert_request_to_project(uuid, text, text) from public;
grant execute on function public.convert_request_to_project(uuid, text, text) to authenticated;
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
-- =====================================================================
-- Prime Eye Research — Migration 007: Panel Members
-- =====================================================================
-- Separate from admin_roles and the /admin panel system entirely.
-- This table stores respondent panel member signups from the public
-- "Join Our Panel" flow on the marketing site.
-- =====================================================================

create table if not exists public.panel_members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  phone text,
  country text,
  date_of_birth date,
  status text not null default 'active'
    check (status in ('active', 'suspended', 'unsubscribed')),
  joined_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.panel_members is
  'Respondent panel members who signed up via the Join Our Panel flow. Completely separate from admin_roles.';

alter table public.panel_members enable row level security;

-- Panel members can only read/update their own row
create policy "panel_members_own_select"
  on public.panel_members for select
  to authenticated
  using (user_id = auth.uid());

create policy "panel_members_own_update"
  on public.panel_members for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Public insert for signup flow (Server Action validates before writing)
create policy "panel_members_insert"
  on public.panel_members for insert
  to authenticated
  with check (user_id = auth.uid());

-- Admins can see all panel members (uses existing is_admin() function)
create policy "panel_members_admin_select"
  on public.panel_members for select
  to authenticated
  using (public.is_admin());

create trigger panel_members_set_updated_at
  before update on public.panel_members
  for each row execute function public.set_updated_at();

create index if not exists idx_panel_members_user_id on public.panel_members(user_id);
create index if not exists idx_panel_members_email on public.panel_members(email);
create index if not exists idx_panel_members_status on public.panel_members(status);
