"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getClientIp } from "@/lib/get-client-ip";
import { sendNotificationEmail } from "@/lib/send-notification-email";

const requestSchema = z.object({
  // Company information
  name: z.string().trim().min(1, "Full name is required").max(200),
  company: z.string().trim().min(1, "Company is required").max(200),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(50).optional().or(z.literal("")),

  // Research requirements
  industry: z.string().trim().min(1, "Select an industry").max(100),
  researchType: z.string().trim().min(1, "Select a research type").max(100),
  countries: z.string().trim().min(1, "Select target countries").max(100),
  sampleSize: z.string().trim().min(1, "Select a sample size").max(50),
  budget: z.string().trim().max(50).optional().or(z.literal("")),
  timeline: z.string().trim().max(50).optional().or(z.literal("")),

  // Project details
  objectives: z.string().trim().min(1, "Research objectives are required").max(2000),
  challenges: z.string().trim().max(2000).optional().or(z.literal("")),
  competitors: z.string().trim().max(500).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),

  // Honeypot: real users never see or fill this field (hidden via CSS).
  // Bots that blindly fill every field will trip this, and we silently
  // pretend success without writing anything — no point telling an
  // automated script that it was caught.
  website: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

export interface RequestFormState {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
}

export async function submitResearchRequest(
  _prevState: RequestFormState,
  formData: FormData
): Promise<RequestFormState> {
  const raw = {
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    industry: formData.get("industry"),
    researchType: formData.get("researchType"),
    countries: formData.get("countries"),
    sampleSize: formData.get("sampleSize"),
    budget: formData.get("budget"),
    timeline: formData.get("timeline"),
    objectives: formData.get("objectives"),
    challenges: formData.get("challenges"),
    competitors: formData.get("competitors"),
    notes: formData.get("notes"),
    website: formData.get("website"), // honeypot
  };

  const parsed = requestSchema.safeParse(raw);

  if (!parsed.success) {
    // Honeypot tripped: pretend success, write nothing.
    if (parsed.error.flatten().fieldErrors.website) {
      return { status: "success", message: "Thank you. Our team will be in touch." };
    }

    const fieldErrors: Record<string, string> = {};
    for (const [field, errors] of Object.entries(parsed.error.flatten().fieldErrors)) {
      if (errors?.[0]) fieldErrors[field] = errors[0];
    }
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const data = parsed.data;
  const supabase = await createClient();
  const clientIp = await getClientIp();

  // Set the IP for the database-level rate limit trigger (migration 004)
  // to read via current_setting('app.client_ip', true). This calls the
  // narrowly-scoped RPC wrapper from migration 006 — set_config() itself
  // is not exposed via PostgREST, so a wrapper function is required.
  const { error: ipError } = await supabase.rpc("set_client_ip", { ip: clientIp });
  if (ipError) {
    console.error("set_client_ip RPC failed:", ipError);
    // Fail closed: if we can't establish the rate-limit IP context, the
    // insert trigger will reject anyway (see migration 004's "fail
    // closed" behavior), so we just let the insert attempt proceed and
    // surface whatever error comes back.
  }

  const { error } = await supabase.from("research_requests").insert({
    contact_name: data.name,
    company: data.company,
    email: data.email,
    phone: data.phone || null,
    industry: data.industry,
    research_type: data.researchType,
    countries: data.countries,
    sample_size: data.sampleSize,
    budget: data.budget || null,
    timeline: data.timeline || null,
    objectives: data.objectives,
    business_challenges: data.challenges || null,
    competitors: data.competitors || null,
    additional_notes: data.notes || null,
  });

  if (error) {
    if (error.message.toLowerCase().includes("rate limit")) {
      return {
        status: "error",
        message: "Too many submissions from your network recently. Please try again in a few minutes.",
      };
    }
    console.error("research_requests insert failed:", error);
    return {
      status: "error",
      message: "Something went wrong submitting your request. Please try again or email us directly.",
    };
  }

  await sendNotificationEmail({
    subject: `New research request from ${data.company}`,
    heading: "New Research Request",
    rows: [
      { label: "Contact", value: `${data.name} (${data.email})` },
      { label: "Company", value: data.company },
      { label: "Industry", value: data.industry },
      { label: "Research type", value: data.researchType },
      { label: "Sample size", value: data.sampleSize },
      { label: "Budget", value: data.budget || "Not specified" },
      { label: "Timeline", value: data.timeline || "Not specified" },
    ],
  });

  return {
    status: "success",
    message: "Thank you. A research consultant will reach out within one business day.",
  };
}
