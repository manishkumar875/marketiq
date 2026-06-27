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
