"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const addNoteSchema = z.object({
  text: z.string().trim().min(1, "Note cannot be empty").max(2000),
  leadId: z.string().uuid().optional(),
  requestId: z.string().uuid().optional(),
  projectId: z.string().uuid().optional(),
});

export interface AddNoteResult {
  success: boolean;
  error?: string;
}

/**
 * Adds a note to exactly one of a lead, request, or project. Requires
 * an authenticated admin — enforced both here (explicit check) and at
 * the database via RLS (migration 003), so this is defense in depth,
 * not the only line of defense.
 */
export async function addNote(input: {
  text: string;
  leadId?: string;
  requestId?: string;
  projectId?: string;
  path: string;
}): Promise<AddNoteResult> {
  const parsed = addNoteSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? "Invalid input." };
  }

  const parentCount = [parsed.data.leadId, parsed.data.requestId, parsed.data.projectId].filter(Boolean).length;
  if (parentCount !== 1) {
    return { success: false, error: "A note must be attached to exactly one record." };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated." };
  }

  const { error } = await supabase.from("notes").insert({
    lead_id: parsed.data.leadId ?? null,
    request_id: parsed.data.requestId ?? null,
    project_id: parsed.data.projectId ?? null,
    author_id: user.id,
    author_name: user.email ?? "Admin",
    text: parsed.data.text,
  });

  if (error) {
    console.error("addNote failed:", error);
    return { success: false, error: "Could not save note. Please try again." };
  }

  // Audit log via service-role client (notes/leads/requests tables
  // themselves don't grant audit_log INSERT to authenticated users —
  // see migration 003).
  try {
    const adminClient = createAdminClient();
    const entityType = parsed.data.leadId ? "lead" : parsed.data.requestId ? "research_request" : "project";
    const entityId = parsed.data.leadId ?? parsed.data.requestId ?? parsed.data.projectId;
    await adminClient.from("audit_log").insert({
      actor_id: user.id,
      actor_email: user.email,
      action: "note_added",
      entity_type: entityType,
      entity_id: entityId,
      details: { note_preview: parsed.data.text.slice(0, 100) },
    });
  } catch {
    // Non-blocking.
  }

  revalidatePath(input.path);
  return { success: true };
}

const updateLeadStatusSchema = z.object({
  leadId: z.string().uuid(),
  status: z.enum(["new", "contacted", "qualified", "won", "lost"]),
});

export async function updateLeadStatus(input: { leadId: string; status: string; path: string }) {
  const parsed = updateLeadStatusSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "Invalid input." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated." };

  const { error } = await supabase
    .from("leads")
    .update({ status: parsed.data.status })
    .eq("id", parsed.data.leadId);

  if (error) {
    console.error("updateLeadStatus failed:", error);
    return { success: false, error: "Could not update status." };
  }

  try {
    const adminClient = createAdminClient();
    await adminClient.from("audit_log").insert({
      actor_id: user.id,
      actor_email: user.email,
      action: "lead_status_changed",
      entity_type: "lead",
      entity_id: parsed.data.leadId,
      details: { new_status: parsed.data.status },
    });
  } catch {
    // Non-blocking.
  }

  revalidatePath(input.path);
  return { success: true };
}

const updateRequestStatusSchema = z.object({
  requestId: z.string().uuid(),
  status: z.enum(["unreviewed", "in_review", "proposal_sent", "converted", "declined"]),
});

export async function updateRequestStatus(input: { requestId: string; status: string; path: string }) {
  const parsed = updateRequestStatusSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "Invalid input." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated." };

  const { error } = await supabase
    .from("research_requests")
    .update({ status: parsed.data.status })
    .eq("id", parsed.data.requestId);

  if (error) {
    console.error("updateRequestStatus failed:", error);
    return { success: false, error: "Could not update status." };
  }

  try {
    const adminClient = createAdminClient();
    await adminClient.from("audit_log").insert({
      actor_id: user.id,
      actor_email: user.email,
      action: "request_status_changed",
      entity_type: "research_request",
      entity_id: parsed.data.requestId,
      details: { new_status: parsed.data.status },
    });
  } catch {
    // Non-blocking.
  }

  revalidatePath(input.path);
  return { success: true };
}

const updateProjectStatusSchema = z.object({
  projectId: z.string().uuid(),
  status: z.enum(["planning", "in_field", "analysis", "reporting", "completed"]),
});

export async function updateProjectStatus(input: { projectId: string; status: string; path: string }) {
  const parsed = updateProjectStatusSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "Invalid input." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated." };

  const { error } = await supabase
    .from("projects")
    .update({ status: parsed.data.status })
    .eq("id", parsed.data.projectId);

  if (error) {
    console.error("updateProjectStatus failed:", error);
    return { success: false, error: "Could not update status." };
  }

  try {
    const adminClient = createAdminClient();
    await adminClient.from("audit_log").insert({
      actor_id: user.id,
      actor_email: user.email,
      action: "project_status_changed",
      entity_type: "project",
      entity_id: parsed.data.projectId,
      details: { new_status: parsed.data.status },
    });
  } catch {
    // Non-blocking.
  }

  revalidatePath(input.path);
  return { success: true };
}

const convertSchema = z.object({
  requestId: z.string().uuid(),
  projectName: z.string().trim().min(1, "Project name is required").max(200),
  owner: z.string().trim().max(200).optional(),
});

export interface ConvertResult {
  success: boolean;
  error?: string;
  projectId?: string;
}

/**
 * Converts a research request into a project. Delegates to the
 * convert_request_to_project() Postgres function (migration 005),
 * which performs the project creation + status update + audit log
 * entry atomically and re-checks admin authorization itself.
 */
export async function convertRequestToProject(input: {
  requestId: string;
  projectName: string;
  owner?: string;
  path: string;
}): Promise<ConvertResult> {
  const parsed = convertSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? "Invalid input." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated." };

  const { data, error } = await supabase.rpc("convert_request_to_project", {
    p_request_id: parsed.data.requestId,
    p_project_name: parsed.data.projectName,
    p_owner: parsed.data.owner || null,
  });

  if (error) {
    console.error("convertRequestToProject failed:", error);
    return { success: false, error: error.message || "Could not convert request to a project." };
  }

  revalidatePath(input.path);
  revalidatePath("/admin/projects");
  return { success: true, projectId: data as string };
}
