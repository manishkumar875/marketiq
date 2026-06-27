import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Globe2, ShieldCheck, Gift, Users } from "lucide-react";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "Join Our Research Panel — MarketIQ",
  description: "Sign up to join MarketIQ's global respondent panel. Share your opinions, shape the products of tomorrow, and earn rewards.",
};

const highlights = [
  { icon: Globe2, text: "Join 10M+ respondents across 50+ countries" },
  { icon: ShieldCheck, text: "Your data is secured and never sold" },
  { icon: Gift, text: "Earn rewards for every completed study" },
  { icon: Users, text: "Influence the brands and products you use" },
];

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Banner side */}
        <div className="relative hidden lg:flex flex-col justify-between surface-navy p-12 overflow-hidden">
          {/* Decorative grid */}
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute top-1/3 -left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl" />

          <Link href="/" className="relative flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
              <BarChart3 className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-semibold text-white text-base">MarketIQ</span>
          </Link>

          <div className="relative max-w-md">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-300 mb-4">
              Respondent Panel
            </p>
            <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-5">
              Your opinion shapes the next generation of products
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed mb-10">
              Join a global community of verified respondents helping the world&apos;s leading
              brands make better decisions — and get rewarded for it.
            </p>

            <div className="space-y-4">
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <div key={h.text} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-blue-300" />
                    </div>
                    <span className="text-sm text-slate-200">{h.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="relative text-xs text-slate-500">
            © 2026 MarketIQ Research, Inc. All rights reserved.
          </p>
        </div>

        {/* Form side */}
        <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-12 lg:py-16">
          {/* Mobile-only logo/banner */}
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-slate-900 text-sm">MarketIQ</span>
            </Link>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-700 mb-2">
              Respondent Panel
            </p>
            <h1 className="text-2xl font-bold text-gradient leading-tight">
              Your opinion shapes the next generation of products
            </h1>
          </div>

          <div className="max-w-md w-full mx-auto lg:mx-0">
            <div className="hidden lg:block mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Create your account</h2>
              <p className="text-sm text-slate-600">
                Tell us a bit about yourself so we can match you with relevant studies.
              </p>
            </div>

            <SignupForm />
          </div>
        </div>
      </div>
    </main>
  );
}
