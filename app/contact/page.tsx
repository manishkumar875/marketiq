import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import ContactForm from "./ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Prime Eye Research",
  description: "Get in touch with Prime Eye Research. Email: support@primeeyeresearch.com | Phone: +91 84334 68560 | Mathura, Uttar Pradesh.",
};

const quickCards = [
  { icon: Mail, title: "Email Us", value: "support@primeeyeresearch.com", href: "mailto:support@primeeyeresearch.com", sub: "We respond within one business day" },
  { icon: Phone, title: "Call Us", value: "+91 84334 68560", href: "tel:+918433468560", sub: "Mon–Sat, 10:30 AM – 6:00 PM IST" },
  { icon: MapPin, title: "Visit Us", value: "41B Navada NH-2, Mathura", href: "https://maps.app.goo.gl/or1f3SXqTzaDdchV8?g_st=ic", sub: "Uttar Pradesh 281006, India" },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-12 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <NetworkBackground opacity={0.4} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4">Contact Us</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 leading-tight">Let's Start the Conversation</h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">Whether you have a research brief ready or just want to explore what's possible — we're here to help.</p>
        </div>
      </section>

      {/* Quick contact cards */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-5">
            {quickCards.map((c) => {
              const Icon = c.icon;
              return (
                <a key={c.title} href={c.href} target={c.icon === MapPin ? "_blank" : undefined} rel="noreferrer"
                  className="flex flex-col gap-3 bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all group">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <Icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">{c.title}</p>
                    <p className="font-semibold text-slate-900 text-sm break-all">{c.value}</p>
                    <p className="text-xs text-slate-500 mt-1">{c.sub}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main content: form + map + info */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">

            {/* Contact form */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-7 sm:p-9">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Send us a message</h2>
              <div className="w-10 h-0.5 bg-blue-600 rounded mb-6" />
              <ContactForm />
            </div>

            {/* Right column: address + hours + map */}
            <div className="space-y-6">
              {/* Address card */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-7">
                <h3 className="font-bold text-slate-900 mb-4 text-lg">Prime Eye Research</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4.5 h-4.5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-slate-700 leading-relaxed">
                      41B Navada NH-2<br />Mathura, Uttar Pradesh 281006<br />India
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                    <a href="tel:+918433468560" className="text-sm text-slate-700 hover:text-blue-600 transition-colors">+91 84334 68560</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                    <a href="mailto:support@primeeyeresearch.com" className="text-sm text-slate-700 hover:text-blue-600 transition-colors">support@primeeyeresearch.com</a>
                  </div>
                </div>
              </div>

              {/* Business hours */}
              <div className="bg-white border border-gray-200 rounded-2xl p-7">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4.5 h-4.5 text-blue-600" />
                  <h3 className="font-bold text-slate-900">Business Hours</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { days: "Monday – Friday", hours: "10:30 AM – 6:00 PM IST" },
                    { days: "Saturday", hours: "10:30 AM – 4:00 PM IST" },
                    { days: "Sunday", hours: "Closed" },
                  ].map((r) => (
                    <div key={r.days} className="flex justify-between text-sm">
                      <span className="text-slate-600">{r.days}</span>
                      <span className={`font-medium ${r.hours === "Closed" ? "text-red-500" : "text-slate-900"}`}>{r.hours}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-4">All times are in Indian Standard Time (IST, UTC+5:30). For urgent project enquiries outside business hours, email us and we'll respond first thing next business day.</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
