"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// ── Sign Up ─────────────────────────────────────────────────────────

const signupSchema = z.object({
  full_name: z.string().trim().min(2, "Full name is required").max(200),
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(100),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  country: z.string().trim().max(100).optional().or(z.literal("")),
});

export interface AuthState {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
}

export async function panelSignup(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = signupSchema.safeParse({
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    password: formData.get("password"),
    phone: formData.get("phone"),
    country: formData.get("country"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const [k, v] of Object.entries(parsed.error.flatten().fieldErrors)) {
      if (v?.[0]) fieldErrors[k] = v[0];
    }
    return { status: "error", message: "Please fix the errors below.", fieldErrors };
  }

  const d = parsed.data;
  const supabase = await createClient();

  // Create Supabase Auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: d.email,
    password: d.password,
    options: { data: { full_name: d.full_name } },
  });

  if (authError) {
    if (authError.message.toLowerCase().includes("already registered")) {
      return { status: "error", message: "An account with this email already exists. Please log in instead." };
    }
    return { status: "error", message: authError.message || "Could not create account. Please try again." };
  }

  if (!authData.user) {
    return { status: "error", message: "Account creation failed. Please try again." };
  }

  // Insert into panel_members
  const { error: memberError } = await supabase.from("panel_members").insert({
    user_id: authData.user.id,
    full_name: d.full_name,
    email: d.email,
    phone: d.phone || null,
    country: d.country || null,
  });

  if (memberError) {
    console.error("panel_members insert failed:", memberError);
    // Non-fatal: user is created in Auth, they can still log in
  }

  redirect("/join-panel/welcome");
}

// ── Login ────────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(1, "Password is required").max(100),
});

export async function panelLogin(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const [k, v] of Object.entries(parsed.error.flatten().fieldErrors)) {
      if (v?.[0]) fieldErrors[k] = v[0];
    }
    return { status: "error", message: "Please check your credentials.", fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { status: "error", message: "Invalid email or password. Please try again." };
  }

  redirect("/join-panel/welcome");
}

// ── Logout ───────────────────────────────────────────────────────────

export async function panelLogout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
