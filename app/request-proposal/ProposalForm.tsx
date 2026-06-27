"use client";

import { useActionState } from "react";
import { submitProposal, type ProposalState } from "./actions";
import { Lock, Loader2, AlertCircle, CheckCircle2, BarChart2, ArrowRight } from "lucide-react";
import Link from "next/link";

const initial: ProposalState = { status: "idle", message: "" };

const actions = [
  "I would like to get a quotation",
  "I need information about a product or service",
  "I want to speak to someone about business/partnership opportunities",
  "Other",
];

export default function ProposalForm() {
  const [state, formAction, isPending] = useActionState(submitProposal, initial);

  if (state.status === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Request Received</h3>
        <p className="text-slate-600 mb-6">{state.message}</p>
        <Link href="/" className="text-blue-600 text-sm font-semibold hover:underline">← Back to home</Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {/* Honeypot */}
      <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Name + Email */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="prop-name" className="block text-sm font-medium text-slate-700 mb-1.5">Name <span className="text-red-500">*</span></label>
          <input id="prop-name" name="name" type="text" required maxLength={200} placeholder="Jane Cooper"
            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          {state.fieldErrors?.name && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{state.fieldErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="prop-email" className="block text-sm font-medium text-slate-700 mb-1.5">Email <span className="text-red-500">*</span></label>
          <input id="prop-email" name="email" type="email" required maxLength={255} placeholder="jane@company.com"
            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          {state.fieldErrors?.email && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{state.fieldErrors.email}</p>}
        </div>
      </div>

      {/* Company + Phone */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="prop-company" className="block text-sm font-medium text-slate-700 mb-1.5">Company <span className="text-slate-400 text-xs">(Optional)</span></label>
          <input id="prop-company" name="company" type="text" maxLength={200} placeholder="Acme Inc."
            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label htmlFor="prop-phone" className="block text-sm font-medium text-slate-700 mb-1.5">Phone <span className="text-slate-400 text-xs">(Optional)</span></label>
          <input id="prop-phone" name="phone" type="tel" maxLength={50} placeholder="+91 98765 43210"
            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
      </div>

      {/* Action dropdown */}
      <div>
        <label htmlFor="prop-action" className="block text-sm font-medium text-slate-700 mb-1.5">Select Reason <span className="text-red-500">*</span></label>
        <select id="prop-action" name="action" required
          className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-700 appearance-none">
          <option value="">Choose an action</option>
          {actions.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        {state.fieldErrors?.action && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{state.fieldErrors.action}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="prop-message" className="block text-sm font-medium text-slate-700 mb-1.5">Message <span className="text-red-500">*</span></label>
        <textarea id="prop-message" name="message" required maxLength={3000} rows={5}
          placeholder="Tell us about your research objectives, target audience, timeline, and any other relevant details..."
          className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
        {state.fieldErrors?.message && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{state.fieldErrors.message}</p>}
      </div>

      {state.status === "error" && !state.fieldErrors && (
        <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />{state.message}
        </div>
      )}

      <button type="submit" disabled={isPending}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors">
        {isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <>Send Message <ArrowRight className="w-4 h-4" /></>}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
        <Lock className="w-3 h-3" /> Your information is secure and will not be shared.
      </div>
    </form>
  );
}
