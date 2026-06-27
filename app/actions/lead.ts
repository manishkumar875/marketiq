"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getClientIp } from "@/lib/get-client-ip";
import { sendNotificationEmail } from "@/lib/send-notification-email";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Please add a short message").max(2000),

  // Honeypot field — see app/actions/research-request.ts for rationale.
  website: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

export interface LeadFormState {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
}

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const raw = {
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    website: formData.get("website"),
  };

  const parsed = leadSchema.safeParse(raw);

  if (!parsed.success) {
    if (parsed.error.flatten().fieldErrors.website) {
      return { status: "success", message: "Thanks for reaching out — we'll be in touch soon." };
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

  const { error: ipError } = await supabase.rpc("set_client_ip", { ip: clientIp });
  if (ipError) {
    console.error("set_client_ip RPC failed:", ipError);
  }

  const { error } = await supabase.from("leads").insert({
    name: data.name,
    company: data.company || null,
    email: data.email,
    phone: data.phone || null,
    message: data.message,
    source: "website_form",
  });

  if (error) {
    if (error.message.toLowerCase().includes("rate limit")) {
      return {
        status: "error",
        message: "Too many submissions from your network recently. Please try again in a few minutes.",
      };
    }
    console.error("leads insert failed:", error);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again or email us directly.",
    };
  }

  await sendNotificationEmail({
    subject: `New contact message from ${data.name}`,
    heading: "New Contact Message",
    rows: [
      { label: "Name", value: data.name },
      { label: "Email", value: data.email },
      { label: "Company", value: data.company || "Not provided" },
      { label: "Phone", value: data.phone || "Not provided" },
      { label: "Message", value: data.message },
    ],
  });

  return {
    status: "success",
    message: "Thanks for reaching out — we'll be in touch soon.",
  };
}
