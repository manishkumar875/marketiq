"use client";
import { useActionState } from "react";
import { submitContact, type ContactState } from "./actions";
import { AlertCircle, CheckCircle2, Loader2, ArrowRight } from "lucide-react";

const initial: ContactState = { status: "idle", message: "" };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, initial);

  if (state.status === "success") {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-green-600" />
        </div>
        <p className="font-semibold text-slate-900 mb-1">Message sent!</p>
        <p className="text-sm text-slate-600">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="c-name" className="block text-sm font-medium text-slate-700 mb-1.5">Name <span className="text-red-500">*</span></label>
          <input id="c-name" name="name" type="text" required maxLength={200} placeholder="Your name"
            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {state.fieldErrors?.name && <p className="text-xs text-red-600 mt-1">{state.fieldErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="c-email" className="block text-sm font-medium text-slate-700 mb-1.5">Email <span className="text-red-500">*</span></label>
          <input id="c-email" name="email" type="email" required maxLength={255} placeholder="you@company.com"
            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {state.fieldErrors?.email && <p className="text-xs text-red-600 mt-1">{state.fieldErrors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="c-phone" className="block text-sm font-medium text-slate-700 mb-1.5">Phone <span className="text-slate-400 text-xs">(Optional)</span></label>
        <input id="c-phone" name="phone" type="tel" maxLength={50} placeholder="+91 84334 68560"
          className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <label htmlFor="c-message" className="block text-sm font-medium text-slate-700 mb-1.5">Message <span className="text-red-500">*</span></label>
        <textarea id="c-message" name="message" required maxLength={2000} rows={5} placeholder="How can we help you?"
          className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        {state.fieldErrors?.message && <p className="text-xs text-red-600 mt-1">{state.fieldErrors.message}</p>}
      </div>

      {state.status === "error" && !state.fieldErrors && (
        <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <AlertCircle className="w-4 h-4 shrink-0" />{state.message}
        </div>
      )}

      <button type="submit" disabled={isPending}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors">
        {isPending ? <><Loader2 className="w-4 h-4 animate-spin" />Sending…</> : <>Send Message <ArrowRight className="w-4 h-4" /></>}
      </button>
    </form>
  );
}
