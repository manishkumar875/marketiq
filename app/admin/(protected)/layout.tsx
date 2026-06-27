import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin Console — Prime Eye Research",
  description: "Internal admin dashboard for lead management, project management, and research request tracking.",
  robots: { index: false, follow: false },
};

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userId: string | null = null;
  let userEmail: string | null = null;

  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Defense in depth: middleware already redirects unauthenticated
    // requests before they reach here, but this layout re-checks
    // directly so the protection does not depend solely on middleware
    // configuration being correct.
    if (!user) {
      redirect("/admin/login");
    }

    const { data: roleRow } = await supabase
      .from("admin_roles")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!roleRow) {
      redirect("/admin/login");
    }

    userId = user.id;
    userEmail = user.email ?? "Admin";
  } catch (error) {
    // redirect() works by throwing a special Next.js error that must
    // be allowed to propagate — only treat *other* errors (e.g. a
    // genuine Supabase connectivity failure) as an auth failure here.
    if (error && typeof error === "object" && "digest" in error) {
      throw error;
    }
    console.error("Protected admin layout auth check failed:", error);
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 lg:flex overflow-x-hidden">
      <AdminSidebar userEmail={userEmail ?? "Admin"} />
      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-6 lg:py-10">{children}</main>
    </div>
  );
}
