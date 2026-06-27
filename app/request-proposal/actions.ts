"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getClientIp } from "@/lib/get-client-ip";
import { sendNotificationEmail } from "@/lib/send-notification-email";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  action: z.string().trim().min(1, "Please select an action"),
  message: z.string().trim().min(1, "Message is required").max(3000),
  website: z.string().max(0).optional().or(z.literal("")),
});

export interface ProposalState {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
}

export async function submitProposal(
  _prev: ProposalState,
  formData: FormData
): Promise<ProposalState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    phone: formData.get("phone"),
    action: formData.get("action"),
    message: formData.get("message"),
    website: formData.get("website"),
  });

  if (!parsed.success) {
    if (parsed.error.flatten().fieldErrors.website) {
      return { status: "success", message: "Thank you. Our team will be in touch shortly." };
    }
    const fieldErrors: Record<string, string> = {};
    for (const [k, v] of Object.entries(parsed.error.flatten().fieldErrors)) {
      if (v?.[0]) fieldErrors[k] = v[0];
    }
    return { status: "error", message: "Please fix the errors below.", fieldErrors };
  }

  const d = parsed.data;
  const supabase = await createClient();
  const ip = await getClientIp();

  await supabase.rpc("set_client_ip", { ip });

  const { error } = await supabase.from("leads").insert({
    name: d.name,
    email: d.email,
    company: d.company || null,
    phone: d.phone || null,
    message: `[${d.action}]\n\n${d.message}`,
    source: "request_proposal_form",
  });

  if (error) {
    if (error.message.toLowerCase().includes("rate limit"))
      return { status: "error", message: "Too many submissions. Please try again in a few minutes." };
    return { status: "error", message: "Something went wrong. Please email us directly at support@primeeyeresearch.com." };
  }

  await sendNotificationEmail({
    subject: `New proposal request from ${d.name}`,
    heading: "New Proposal Request",
    rows: [
      { label: "Name", value: d.name },
      { label: "Email", value: d.email },
      { label: "Company", value: d.company || "Not provided" },
      { label: "Phone", value: d.phone || "Not provided" },
      { label: "Action", value: d.action },
      { label: "Message", value: d.message },
    ],
  });

  return { status: "success", message: "Thank you. A research consultant will reach out within one business day." };
}
