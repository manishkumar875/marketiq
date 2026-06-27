// Hand-written types matching supabase/migrations/*.sql.
// If the schema changes, update this file to match (or generate it via
// `supabase gen types typescript` once the Supabase CLI is set up).

export type LeadStatus = "new" | "contacted" | "qualified" | "won" | "lost";

export type RequestStatus =
  | "unreviewed"
  | "in_review"
  | "proposal_sent"
  | "converted"
  | "declined";

export type ProjectStatus =
  | "planning"
  | "in_field"
  | "analysis"
  | "reporting"
  | "completed";

export interface Lead {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  message: string;
  source: string;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
}

export interface ResearchRequest {
  id: string;
  contact_name: string;
  company: string;
  email: string;
  phone: string | null;
  industry: string;
  research_type: string;
  countries: string;
  sample_size: string;
  budget: string | null;
  timeline: string | null;
  objectives: string;
  business_challenges: string | null;
  competitors: string | null;
  additional_notes: string | null;
  status: RequestStatus;
  converted_project_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  name: string;
  client_company: string;
  source_request_id: string | null;
  status: ProjectStatus;
  owner: string | null;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  lead_id: string | null;
  request_id: string | null;
  project_id: string | null;
  author_id: string;
  author_name: string;
  text: string;
  created_at: string;
}

export interface AuditLogEntry {
  id: string;
  actor_id: string | null;
  actor_email: string | null;
  action: string;
  entity_type: "lead" | "research_request" | "project" | "note" | "auth";
  entity_id: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
}

export interface AdminRole {
  user_id: string;
  role: "admin";
  granted_at: string;
  granted_by: string | null;
}
