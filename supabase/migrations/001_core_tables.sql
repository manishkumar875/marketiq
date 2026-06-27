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
