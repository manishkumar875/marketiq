"use client";

import { useActionState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertCircle, Loader2, Mail } from "lucide-react";
import { submitLead, type LeadFormState } from "@/app/actions/lead";

const initialState: LeadFormState = { status: "idle", message: "" };

export default function ContactForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [state, formAction, isPending] = useActionState(submitLead, initialState);

  return (
    <section className="py-20 bg-sky-50/60 border-y border-sky-100">
      <div ref={ref} className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="w-11 h-11 rounded-xl bg-white border border-sky-200 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-5 h-5 text-sky-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Have a quick question instead?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Send us a short message and we'll get back to you — no need to fill out the full proposal form.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8"
        >
          {state.status === "success" ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="text-sm font-medium text-slate-900">{state.message}</p>
            </div>
          ) : (
            <form action={formAction} className="space-y-4">
              <div className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="contact-website">Leave this field blank</label>
                <input type="text" id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input id="contact-name" name="name" placeholder="Jane Cooper" required maxLength={200} />
                  {state.fieldErrors?.name && <p className="text-xs text-red-600">{state.fieldErrors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-company">Company (optional)</Label>
                  <Input id="contact-company" name="company" placeholder="Acme Inc." maxLength={200} />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input id="contact-email" name="email" type="email" placeholder="jane@acme.com" required maxLength={255} />
                  {state.fieldErrors?.email && <p className="text-xs text-red-600">{state.fieldErrors.email}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-phone">Phone (optional)</Label>
                  <Input id="contact-phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" maxLength={50} />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea id="contact-message" name="message" placeholder="How can we help?" rows={3} required maxLength={2000} />
                {state.fieldErrors?.message && <p className="text-xs text-red-600">{state.fieldErrors.message}</p>}
              </div>

              {state.status === "error" && !state.fieldErrors && (
                <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{state.message}</span>
                </div>
              )}

              <Button type="submit" className="w-full sm:w-auto" disabled={isPending}>
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {isPending ? "Sending…" : "Send message"}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
