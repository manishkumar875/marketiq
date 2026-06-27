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
