"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getClientIp } from "@/lib/get-client-ip";
import { sendNotificationEmail } from "@/lib/send-notification-email";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000),
  website: z.string().max(0).optional().or(z.literal("")),
});

export interface ContactState {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    website: formData.get("website"),
  });

  if (!parsed.success) {
    if (parsed.error.flatten().fieldErrors.website)
      return { status: "success", message: "Thanks for reaching out — we'll be in touch soon." };
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
    name: d.name, email: d.email, phone: d.phone || null,
    message: d.message, source: "contact_page",
  });

  if (error) {
    if (error.message.toLowerCase().includes("rate limit"))
      return { status: "error", message: "Too many submissions. Please try again shortly." };
    return { status: "error", message: "Something went wrong. Email us at support@primeeyeresearch.com." };
  }

  await sendNotificationEmail({
    subject: `Contact form: ${d.name}`,
    heading: "New Contact Message",
    rows: [
      { label: "Name", value: d.name },
      { label: "Email", value: d.email },
      { label: "Phone", value: d.phone || "Not provided" },
      { label: "Message", value: d.message },
    ],
  });

  return { status: "success", message: "Thanks for reaching out — our team will respond within one business day." };
}
