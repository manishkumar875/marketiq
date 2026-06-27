"use client";

import { useActionState } from "react";
import { panelLogin, type AuthState } from "@/app/join-panel/actions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { AlertCircle, Loader2, LogIn } from "lucide-react";

const initial: AuthState = { status: "idle", message: "" };

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(panelLogin, initial);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/prime-eye-logo.jpeg"
              alt="Prime Eye Research"
              width={140}
              height={52}
              className="h-14 w-auto object-contain"
            />
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                <LogIn className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">Panel Sign In</h1>
                <p className="text-xs text-slate-500">Welcome back to Prime Eye Panel</p>
              </div>
            </div>

            {state.status === "error" && (
              <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                {state.message}
              </div>
            )}

            <form action={formAction} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={255}
                  placeholder="you@example.com"
                  autoComplete="username"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {state.fieldErrors?.email && (
                  <p className="text-xs text-red-600 mt-1">{state.fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  maxLength={100}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {state.fieldErrors?.password && (
                  <p className="text-xs text-red-600 mt-1">{state.fieldErrors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors"
              >
                {isPending ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Signing in…</>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <p className="text-center text-xs text-slate-500 mt-5">
              Not a panel member?{" "}
              <Link href="/join-panel" className="text-blue-600 font-semibold hover:underline">
                Join for free
              </Link>
            </p>

            <p className="text-center text-xs text-slate-400 mt-2">
              Admin?{" "}
              <Link href="/admin/login" className="text-slate-500 hover:text-blue-600 hover:underline">
                Admin sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
