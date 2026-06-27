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
