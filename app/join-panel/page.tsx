"use client";

import { useActionState } from "react";
import { panelSignup, type AuthState } from "./actions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { AlertCircle, Loader2, CheckCircle2, UserPlus } from "lucide-react";

const initial: AuthState = { status: "idle", message: "" };

const countries = [
  "India", "United States", "United Kingdom", "Germany", "France",
  "Australia", "Canada", "Singapore", "UAE", "South Africa", "Other",
];

export default function JoinPanelPage() {
  const [state, formAction, isPending] = useActionState(panelSignup, initial);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image src="/images/prime-eye-logo.jpeg" alt="Prime Eye Research" width={140} height={52} className="h-14 w-auto object-contain" />
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                <UserPlus className="w-4.5 h-4.5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">Join Our Panel</h1>
                <p className="text-xs text-slate-500">Earn rewards for sharing your opinions</p>
              </div>
            </div>

            {state.status === "error" && !state.fieldErrors && (
              <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />{state.message}
              </div>
            )}

            <form action={formAction} className="space-y-4">
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                <input id="full_name" name="full_name" type="text" required maxLength={200} placeholder="Your full name"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {state.fieldErrors?.full_name && <p className="text-xs text-red-600 mt-1">{state.fieldErrors.full_name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                <input id="email" name="email" type="email" required maxLength={255} placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {state.fieldErrors?.email && <p className="text-xs text-red-600 mt-1">{state.fieldErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">Password <span className="text-red-500">*</span></label>
                <input id="password" name="password" type="password" required maxLength={100} placeholder="At least 8 characters"
                  autoComplete="new-password"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {state.fieldErrors?.password && <p className="text-xs text-red-600 mt-1">{state.fieldErrors.password}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                  <input id="phone" name="phone" type="tel" maxLength={50} placeholder="+91 …"
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-slate-700 mb-1.5">Country</label>
                  <select id="country" name="country"
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value="">Select…</option>
                    {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <button type="submit" disabled={isPending}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors mt-2">
                {isPending ? <><Loader2 className="w-4 h-4 animate-spin" />Creating account…</> : "Create Panel Account"}
              </button>
            </form>

            <p className="text-center text-xs text-slate-500 mt-5">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {["Earn rewards", "Share opinions", "Help shape products"].map((b) => (
              <div key={b} className="bg-white border border-gray-200 rounded-xl py-3 px-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                <p className="text-xs text-slate-600">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
