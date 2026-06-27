"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address").max(255),
  password: z.string().min(1, "Password is required").max(200),
});

export interface LoginState {
  error: string | null;
}

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? "Invalid input." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error || !data.user) {
    // Deliberately generic message — do not reveal whether the email
    // exists, to avoid user-enumeration via error messages.
    return { error: "Invalid email or password." };
  }

  // Verify the authenticated user actually has an admin role row.
  // Logging in successfully via Supabase Auth is NOT sufficient on its
  // own — admin_roles is the real authorization gate, and RLS enforces
  // this at the database level too. This check just gives a clean,
  // immediate error message instead of a confusing empty admin panel.
  const { data: roleRow } = await supabase
    .from("admin_roles")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (!roleRow) {
    await supabase.auth.signOut();
    return {
      error: "This account does not have admin access. Contact your administrator.",
    };
  }

  // Audit log: successful admin login. Uses the service-role client
  // because audit_log has no INSERT policy for authenticated users —
  // see migration 003.
  try {
    const adminClient = createAdminClient();
    await adminClient.from("audit_log").insert({
      actor_id: data.user.id,
      actor_email: data.user.email,
      action: "admin_login",
      entity_type: "auth",
      entity_id: null,
      details: null,
    });
  } catch {
    // Audit logging failure should never block a legitimate login.
  }

  redirect("/admin/leads");
}
