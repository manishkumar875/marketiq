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
