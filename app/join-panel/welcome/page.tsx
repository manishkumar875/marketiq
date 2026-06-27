import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { panelLogout } from "@/app/join-panel/actions";
import { CheckCircle2, Globe2, BarChart2, Gift, LogOut } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to Prime Eye Panel",
  robots: { index: false, follow: false },
};

export default async function WelcomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch panel member profile
  const { data: member } = await supabase
    .from("panel_members")
    .select("full_name, country, joined_at")
    .eq("user_id", user.id)
    .maybeSingle();

  const firstName = member?.full_name?.split(" ")[0] ?? user.email?.split("@")[0] ?? "Panelist";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-24 pb-16 min-h-[80vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* Logo + greeting */}
          <div className="text-center mb-10">
            <Image
              src="/images/prime-eye-logo.jpeg"
              alt="Prime Eye Research"
              width={120}
              height={45}
              className="h-14 w-auto object-contain mx-auto mb-6"
            />
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-5">
              <CheckCircle2 className="w-4 h-4" /> You&apos;re signed in
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Welcome back, {firstName}!
            </h1>
            <p className="text-slate-600 max-w-md mx-auto">
              Thank you for being part of the Prime Eye Research panel. Your opinions help shape products and services around the world.
            </p>
          </div>

          {/* Info cards */}
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {[
              { icon: BarChart2, title: "Participate in Surveys", desc: "Complete surveys matched to your profile and interests." },
              { icon: Globe2, title: "Global Impact", desc: "Your responses reach decision-makers in 40+ countries." },
              { icon: Gift, title: "Earn Rewards", desc: "Accumulate points for every completed survey." },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2 text-sm">{c.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Account details */}
          <div className="bg-white border border-gray-200 rounded-2xl p-7 mb-6">
            <h2 className="font-semibold text-slate-900 mb-4">Your Account</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-slate-500">Email</span>
                <span className="font-medium text-slate-900">{user.email}</span>
              </div>
              {member?.full_name && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-slate-500">Name</span>
                  <span className="font-medium text-slate-900">{member.full_name}</span>
                </div>
              )}
              {member?.country && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-slate-500">Country</span>
                  <span className="font-medium text-slate-900">{member.country}</span>
                </div>
              )}
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Member since</span>
                <span className="font-medium text-slate-900">
                  {member?.joined_at
                    ? new Date(member.joined_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
                    : "Today"}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-700 border border-gray-300 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors"
            >
              Back to Home
            </Link>
            <form action={panelLogout}>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
