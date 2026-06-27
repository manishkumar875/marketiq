"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { LOCATIONS, LANGUAGES } from "@/lib/locations";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";

interface FormState {
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  language: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const initialState: FormState = {
  firstName: "",
  lastName: "",
  gender: "",
  dob: "",
  email: "",
  phone: "",
  country: "",
  state: "",
  city: "",
  language: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};

export default function SignupForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === "country") {
        next.state = "";
        next.city = "";
      }
      if (key === "state") {
        next.city = "";
      }
      return next;
    });

  const stateOptions = useMemo(
    () => LOCATIONS.find((l) => l.country === form.country)?.states ?? [],
    [form.country]
  );
  const cityOptions = useMemo(
    () => stateOptions.find((s) => s.state === form.state)?.cities ?? [],
    [stateOptions, form.state]
  );

  const passwordsMatch = form.password.length > 0 && form.password === form.confirmPassword;
  const passwordLongEnough = form.password.length >= 8;

  const isValid =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.gender &&
    form.dob &&
    form.email.trim() &&
    form.country &&
    form.state &&
    form.city &&
    form.language &&
    passwordLongEnough &&
    passwordsMatch &&
    form.acceptTerms;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (isValid) setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center py-12"
      >
        <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-7 h-7 text-emerald-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">Welcome to the panel</h3>
        <p className="text-slate-600 text-sm max-w-sm mx-auto mb-6">
          Thanks, {form.firstName}. A confirmation has been sent to{" "}
          <span className="font-medium text-slate-800">{form.email}</span>. Check your inbox to
          verify your account and start earning rewards for your opinions.
        </p>
        <Button variant="outline" size="sm" onClick={() => { setForm(initialState); setSubmitted(false); setTouched(false); }}>
          Register another respondent
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Name */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" placeholder="Jane" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" placeholder="Cooper" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} />
        </div>
      </div>

      {/* Gender / DOB */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label>Gender</Label>
          <Select value={form.gender} onValueChange={(v) => update("gender", v)}>
            <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Non-binary">Non-binary</SelectItem>
              <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">Date of birth</Label>
          <Input id="dob" type="date" value={form.dob} onChange={(e) => update("dob", e.target.value)} />
        </div>
      </div>

      {/* Contact */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="jane@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
      </div>

      {/* Location */}
      <div className="grid sm:grid-cols-3 gap-5">
        <div className="space-y-2">
          <Label>Country</Label>
          <Select value={form.country} onValueChange={(v) => update("country", v)}>
            <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
            <SelectContent>
              {LOCATIONS.map((l) => <SelectItem key={l.country} value={l.country}>{l.country}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>State</Label>
          <Select value={form.state} onValueChange={(v) => update("state", v)} disabled={!form.country}>
            <SelectTrigger><SelectValue placeholder={form.country ? "Select state" : "Select country first"} /></SelectTrigger>
            <SelectContent>
              {stateOptions.map((s) => <SelectItem key={s.state} value={s.state}>{s.state}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>City</Label>
          <Select value={form.city} onValueChange={(v) => update("city", v)} disabled={!form.state}>
            <SelectTrigger><SelectValue placeholder={form.state ? "Select city" : "Select state first"} /></SelectTrigger>
            <SelectContent>
              {cityOptions.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Language */}
      <div className="space-y-2">
        <Label>Preferred language</Label>
        <Select value={form.language} onValueChange={(v) => update("language", v)}>
          <SelectTrigger><SelectValue placeholder="Select language" /></SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Password */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {touched && !passwordLongEnough && (
            <p className="text-xs text-red-600">Password must be at least 8 characters.</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter password"
              value={form.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {touched && form.confirmPassword.length > 0 && !passwordsMatch && (
            <p className="text-xs text-red-600">Passwords do not match.</p>
          )}
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="acceptTerms"
          checked={form.acceptTerms}
          onCheckedChange={(checked) => update("acceptTerms", checked === true)}
          className="mt-0.5"
        />
        <Label htmlFor="acceptTerms" className="text-xs leading-relaxed font-normal text-slate-600 cursor-pointer">
          I agree to the{" "}
          <a href="#" className="text-blue-700 font-medium hover:underline">Terms of Service</a>{" "}
          and{" "}
          <a href="#" className="text-blue-700 font-medium hover:underline">Privacy Policy</a>, and consent
          to receive research survey invitations.
        </Label>
      </div>
      {touched && !form.acceptTerms && (
        <p className="text-xs text-red-600 -mt-3">Please accept the terms to continue.</p>
      )}

      <Button type="submit" size="lg" className="w-full font-semibold">
        Sign Up
      </Button>

      <p className="text-xs text-center text-slate-500">
        Already part of our panel?{" "}
        <a href="#" className="text-blue-700 font-medium hover:underline">Sign in</a>
      </p>
    </form>
  );
}
