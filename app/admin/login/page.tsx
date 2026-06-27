import type { Metadata } from "next";
import { Eye } from "lucide-react";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Sign In — Prime Eye Research",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-sky-50 px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center">
            <Eye className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-semibold text-slate-900 text-base">Prime Eye Research</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-7 sm:p-8">
          <h1 className="text-lg font-semibold text-slate-900 mb-1">Admin sign in</h1>
          <p className="text-sm text-slate-500 mb-6">
            Sign in to manage leads, research requests, and projects.
          </p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
