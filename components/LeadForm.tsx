"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Check, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitResearchRequest, type RequestFormState } from "@/app/actions/research-request";

const steps = ["Company Information", "Research Requirements", "Project Details"];

const industries = ["FMCG", "Retail", "Healthcare", "Technology", "Automotive", "Financial Services", "Education", "Other"];
const researchTypes = [
  "Quantitative Research",
  "Qualitative Research",
  "Customer Experience Research",
  "Brand Health Tracking",
  "Product Testing",
  "Market Segmentation",
  "Competitive Intelligence",
  "Consumer Insights",
];
const countryOptions = ["United States", "United Kingdom", "Germany", "India", "Brazil", "Japan", "Australia", "Multi-country / Global"];
const sampleSizes = ["Under 500", "500 – 1,000", "1,000 – 5,000", "5,000 – 10,000", "10,000+"];
const budgets = ["Under $10,000", "$10,000 – $25,000", "$25,000 – $75,000", "$75,000 – $150,000", "$150,000+"];
const timelines = ["Less than 2 weeks", "2 – 4 weeks", "1 – 2 months", "2 – 3 months", "Flexible / Ongoing"];

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  researchType: string;
  countries: string;
  sampleSize: string;
  budget: string;
  timeline: string;
  objectives: string;
  challenges: string;
  competitors: string;
  notes: string;
}

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  industry: "",
  researchType: "",
  countries: "",
  sampleSize: "",
  budget: "",
  timeline: "",
  objectives: "",
  challenges: "",
  competitors: "",
  notes: "",
};

const initialActionState: RequestFormState = { status: "idle", message: "" };

export default function LeadForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [actionState, formAction, isPending] = useActionState(submitResearchRequest, initialActionState);

  const update = (key: keyof FormState, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const isStepValid = () => {
    if (step === 0) return form.name.trim() && form.company.trim() && form.email.trim();
    if (step === 1) return form.industry && form.researchType && form.countries && form.sampleSize;
    return form.objectives.trim().length > 0;
  };

  const handleNext = () => step < steps.length - 1 && setStep(step + 1);
  const handleBack = () => step > 0 && setStep(step - 1);

  // If a field error comes back for a field on an earlier step, jump
  // the user back there so they can see and fix it.
  useEffect(() => {
    if (actionState.status === "error" && actionState.fieldErrors) {
      const errorFields = Object.keys(actionState.fieldErrors);
      const step0Fields = ["name", "company", "email", "phone"];
      const step1Fields = ["industry", "researchType", "countries", "sampleSize", "budget", "timeline"];
      if (errorFields.some((f) => step0Fields.includes(f))) setStep(0);
      else if (errorFields.some((f) => step1Fields.includes(f))) setStep(1);
      else setStep(2);
    }
  }, [actionState]);

  const submitted = actionState.status === "success";

  return (
    <section id="contact" ref={ref} className="py-24 sm:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-sky-600 mb-4">Get started</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-5">
            Request a research proposal
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Tell us about your project and a research consultant will follow up within one business day.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden"
        >
          {!submitted ? (
            <form action={formAction}>
              {/* Hidden fields carry every step's data through to the final submit */}
              <input type="hidden" name="name" value={form.name} />
              <input type="hidden" name="company" value={form.company} />
              <input type="hidden" name="email" value={form.email} />
              <input type="hidden" name="phone" value={form.phone} />
              <input type="hidden" name="industry" value={form.industry} />
              <input type="hidden" name="researchType" value={form.researchType} />
              <input type="hidden" name="countries" value={form.countries} />
              <input type="hidden" name="sampleSize" value={form.sampleSize} />
              <input type="hidden" name="budget" value={form.budget} />
              <input type="hidden" name="timeline" value={form.timeline} />
              <input type="hidden" name="objectives" value={form.objectives} />
              <input type="hidden" name="challenges" value={form.challenges} />
              <input type="hidden" name="competitors" value={form.competitors} />
              <input type="hidden" name="notes" value={form.notes} />

              {/* Honeypot — hidden from real users via CSS, bots that fill every field trip this */}
              <div className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Leave this field blank</label>
                <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              {/* Stepper header */}
              <div className="px-6 sm:px-8 pt-7 pb-6 border-b border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  {steps.map((label, i) => (
                    <div key={label} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center gap-2 flex-1">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors ${
                            i < step
                              ? "bg-sky-600 text-white"
                              : i === step
                              ? "bg-sky-600 text-white ring-4 ring-sky-100"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {i < step ? <Check className="w-4 h-4" /> : i + 1}
                        </div>
                        <span className={`text-[11px] font-medium text-center hidden sm:block ${i <= step ? "text-slate-800" : "text-slate-400"}`}>
                          {label}
                        </span>
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`h-0.5 flex-1 mx-1 sm:mx-2 -mt-6 sm:-mt-5 ${i < step ? "bg-sky-600" : "bg-slate-100"}`} />
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 sm:hidden text-center mt-2">
                  Step {step + 1} of {steps.length}: {steps[step]}
                </p>
              </div>

              {/* Step body */}
              <div className="p-6 sm:p-8 min-h-[320px]">
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div
                      key="step0"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.25 }}
                      className="grid sm:grid-cols-2 gap-5"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="name-input">Full name</Label>
                        <Input id="name-input" placeholder="Jane Cooper" value={form.name} onChange={(e) => update("name", e.target.value)} />
                        {actionState.fieldErrors?.name && <FieldError text={actionState.fieldErrors.name} />}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company-input">Company</Label>
                        <Input id="company-input" placeholder="Acme Inc." value={form.company} onChange={(e) => update("company", e.target.value)} />
                        {actionState.fieldErrors?.company && <FieldError text={actionState.fieldErrors.company} />}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email-input">Work email</Label>
                        <Input id="email-input" type="email" placeholder="jane@acme.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
                        {actionState.fieldErrors?.email && <FieldError text={actionState.fieldErrors.email} />}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone-input">Phone (optional)</Label>
                        <Input id="phone-input" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.25 }}
                      className="grid sm:grid-cols-2 gap-5"
                    >
                      <div className="space-y-2">
                        <Label>Industry</Label>
                        <Select value={form.industry} onValueChange={(v) => update("industry", v)}>
                          <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
                          <SelectContent>
                            {industries.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Research type</Label>
                        <Select value={form.researchType} onValueChange={(v) => update("researchType", v)}>
                          <SelectTrigger><SelectValue placeholder="Select research type" /></SelectTrigger>
                          <SelectContent>
                            {researchTypes.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Target countries</Label>
                        <Select value={form.countries} onValueChange={(v) => update("countries", v)}>
                          <SelectTrigger><SelectValue placeholder="Select countries" /></SelectTrigger>
                          <SelectContent>
                            {countryOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Sample size</Label>
                        <Select value={form.sampleSize} onValueChange={(v) => update("sampleSize", v)}>
                          <SelectTrigger><SelectValue placeholder="Select sample size" /></SelectTrigger>
                          <SelectContent>
                            {sampleSizes.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Budget range</Label>
                        <Select value={form.budget} onValueChange={(v) => update("budget", v)}>
                          <SelectTrigger><SelectValue placeholder="Select budget" /></SelectTrigger>
                          <SelectContent>
                            {budgets.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Timeline</Label>
                        <Select value={form.timeline} onValueChange={(v) => update("timeline", v)}>
                          <SelectTrigger><SelectValue placeholder="Select timeline" /></SelectTrigger>
                          <SelectContent>
                            {timelines.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="objectives-input">Research objectives</Label>
                        <Textarea id="objectives-input" placeholder="What decisions will this research inform?" rows={3} value={form.objectives} onChange={(e) => update("objectives", e.target.value)} />
                        {actionState.fieldErrors?.objectives && <FieldError text={actionState.fieldErrors.objectives} />}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="challenges-input">Business challenges</Label>
                        <Textarea id="challenges-input" placeholder="What business problem are you trying to solve?" rows={2} value={form.challenges} onChange={(e) => update("challenges", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="competitors-input">Key competitors (optional)</Label>
                        <Input id="competitors-input" placeholder="e.g. Competitor A, Competitor B" value={form.competitors} onChange={(e) => update("competitors", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes-input">Additional notes (optional)</Label>
                        <Textarea id="notes-input" placeholder="Anything else we should know?" rows={2} value={form.notes} onChange={(e) => update("notes", e.target.value)} />
                      </div>

                      {actionState.status === "error" && (
                        <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
                          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                          <span>{actionState.message}</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer nav */}
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-t border-slate-100 bg-slate-50">
                <Button type="button" variant="ghost" size="sm" onClick={handleBack} disabled={step === 0} className="gap-1">
                  <ChevronLeft className="w-4 h-4" /> Back
                </Button>
                {step === steps.length - 1 ? (
                  <Button type="submit" size="sm" disabled={!isStepValid() || isPending} className="gap-1">
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    {isPending ? "Submitting…" : "Submit request"}
                  </Button>
                ) : (
                  <Button type="button" size="sm" onClick={handleNext} disabled={!isStepValid()} className="gap-1">
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="p-12 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Request received</h3>
              <p className="text-slate-600 text-sm max-w-sm mx-auto mb-6">{actionState.message}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setForm(initialState);
                  setStep(0);
                  window.location.reload();
                }}
              >
                Submit another request
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function FieldError({ text }: { text: string }) {
  return <p className="text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{text}</p>;
}
