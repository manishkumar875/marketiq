"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";

export async function logout() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    try {
      const adminClient = createAdminClient();
      await adminClient.from("audit_log").insert({
        actor_id: user.id,
        actor_email: user.email,
        action: "admin_logout",
        entity_type: "auth",
        entity_id: null,
        details: null,
      });
    } catch {
      // Audit logging failure should never block logout.
    }
  }

  await supabase.auth.signOut();
  redirect("/admin/login");
}
