import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import Link from "next/link";
import { ArrowRight, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

interface SolutionLayoutProps {
  badge: string;
  title: string;
  subtitle: string;
  challenges: { title: string; desc: string }[];
  approach: { title: string; desc: string }[];
  caseStudy: { context: string; approach: string; outcome: string };
  benefits: string[];
  deliverables: string[];
  ctaTitle?: string;
}

export default function SolutionLayout({
  badge, title, subtitle,
  challenges, approach, caseStudy, benefits, deliverables, ctaTitle,
}: SolutionLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <NetworkBackground opacity={0.5} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4">{badge}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight">{title}</h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">{subtitle}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/request-proposal" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              Request a Proposal <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-700 border border-slate-300 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors">
              Speak to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Industry Challenges */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Industry Challenges We Solve</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {challenges.map((c) => (
              <div key={c.title} className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-slate-900 mb-2 text-sm">{c.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Approach */}
      <section className="py-16 section-tint">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Our Research Approach</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {approach.map((a, i) => (
              <div key={a.title} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mb-3">{i + 1}</div>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm">{a.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Case Study Example</h2>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs font-semibold uppercase text-blue-600 tracking-wider mb-2">Context</p>
                <p className="text-sm text-slate-700 leading-relaxed">{caseStudy.context}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-blue-600 tracking-wider mb-2">Approach</p>
                <p className="text-sm text-slate-700 leading-relaxed">{caseStudy.approach}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-blue-600 tracking-wider mb-2">Outcome</p>
                <p className="text-sm text-slate-700 leading-relaxed">{caseStudy.outcome}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits + Deliverables */}
      <section className="py-16 section-tint">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-5">Benefits</h2>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-5">Deliverables</h2>
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

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{ctaTitle ?? "Ready to unlock insight in your industry?"}</h2>
          <p className="text-blue-100 mb-8">Our sector specialists will design a research program built around the realities of your category.</p>
          <Link href="/request-proposal" className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-colors">
            Request a Research Proposal <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
