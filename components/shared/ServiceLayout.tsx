import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import type { ReactNode } from "react";

interface FAQ { q: string; a: string; }
interface ServiceLayoutProps {
  badge: string;
  title: string;
  titleBlue?: string;
  subtitle: string;
  overview: string;
  methodology: { step: string; desc: string }[];
  benefits: string[];
  useCases: { title: string; desc: string }[];
  industries: string[];
  deliverables: string[];
  faqs: FAQ[];
  ctaTitle?: string;
  children?: ReactNode;
}

export default function ServiceLayout({
  badge, title, titleBlue, subtitle, overview,
  methodology, benefits, useCases, industries,
  deliverables, faqs, ctaTitle,
}: ServiceLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <NetworkBackground opacity={0.5} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4">{badge}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight">
            {title}{titleBlue && <span className="text-gradient-blue"> {titleBlue}</span>}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">{subtitle}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/request-proposal" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              Get a Proposal <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-700 border border-slate-300 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors">
              Speak to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">Service Overview</p>
          <p className="text-slate-600 leading-relaxed text-lg">{overview}</p>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-16 section-tint">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Our Methodology</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {methodology.map((m, i) => (
              <div key={m.step} className="flex gap-4 bg-white border border-gray-200 rounded-xl p-5">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1 text-sm">{m.step}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + Use Cases */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Benefits</h2>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Use Cases</h2>
              <div className="space-y-4">
                {useCases.map((u) => (
                  <div key={u.title} className="border-l-2 border-blue-200 pl-4">
                    <p className="font-semibold text-slate-900 text-sm mb-1">{u.title}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{u.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries + Deliverables */}
      <section className="py-16 section-tint">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-5">Industries Served</h2>
              <div className="flex flex-wrap gap-2">
                {industries.map((ind) => (
                  <span key={ind} className="px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-700 font-medium">{ind}</span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-5">What You'll Receive</h2>
              <ul className="space-y-2">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-blue-600 font-bold shrink-0">→</span> {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="border border-gray-200 rounded-xl p-5">
                <p className="font-semibold text-slate-900 mb-2 text-sm">{faq.q}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{ctaTitle ?? "Ready to get started?"}</h2>
          <p className="text-blue-100 mb-8">Tell us about your project and a research consultant will respond within one business day.</p>
          <Link href="/request-proposal" className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-colors">
            Request a Research Proposal <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
