import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import { Target, Eye, Globe2, Shield, BarChart2, Users, Award, CheckCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — Prime Eye Research",
  description: "Learn about Prime Eye Research — our mission, methodology, global network, and commitment to ESOMAR standards and ISO certification.",
};

const values = [
  { icon: Target, title: "Precision", desc: "Every study is designed with statistical rigor, validated sampling, and quality-controlled fieldwork." },
  { icon: Eye, title: "Transparency", desc: "We share our methodology openly — you always know how your data was collected and what it means." },
  { icon: Globe2, title: "Global Perspective", desc: "Local expertise in every market we operate, backed by a globally consistent quality standard." },
  { icon: Shield, title: "Integrity", desc: "ESOMAR-aligned practices and ISO-certified processes ensure every project meets the highest ethical standards." },
];

const milestones = [
  { year: "Founded", label: "Prime Eye Research established with a mission to democratize enterprise-quality research" },
  { year: "200+", label: "Clients served globally across industries including retail, healthcare, technology, and financial services" },
  { year: "40+", label: "Countries where we operate active, quality-screened respondent panels" },
  { year: "10,000+", label: "Projects delivered annually with an average completion rate of 98.3%" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <NetworkBackground opacity={0.5} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4">About Prime Eye Research</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Research discipline,<br />sharpened by AI
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We are a global market research and consumer intelligence firm that pairs experienced researchers with modern AI infrastructure — delivering insight at a speed traditional firms cannot match, without compromising on rigor.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">Our Story</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">Where Data Meet Direction</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>Prime Eye Research was founded on a simple conviction: that every organization, regardless of size, deserves access to the kind of high-quality consumer intelligence that has historically been available only to the largest global corporations.</p>
                <p>We built our platform from the ground up to serve that mission — combining a validated global respondent network with AI-assisted analysis workflows that compress weeks of traditional research timelines into days, without sacrificing methodological integrity.</p>
                <p>Today we serve 200+ clients across 40+ countries, delivering 10,000+ research projects annually. From a single concept test to an always-on brand tracking program, every engagement is grounded in sound sampling, validated questionnaire design, and analyst-reviewed reporting.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {milestones.map((m) => (
                <div key={m.year} className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                  <p className="text-2xl font-bold text-blue-600 mb-2">{m.year}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 section-tint">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">To make rigorous, actionable consumer intelligence accessible to every organization that wants to compete on insight — not instinct. We believe research should inform strategy, not just confirm it.</p>
            </div>
            <div className="bg-blue-600 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-blue-100 leading-relaxed">A world where business decisions are guided by deep understanding of the people they affect — where consumer insight drives every product launch, brand strategy, and policy decision at global scale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">Our Values</p>
            <h2 className="text-3xl font-bold text-slate-900">What guides every project we take on</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="text-center p-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology & AI */}
      <section className="py-16 section-tint">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">Research Methodology</p>
              <h2 className="text-2xl font-bold text-slate-900 mb-5">Rigorous by design, fast by architecture</h2>
              <div className="space-y-4">
                {[
                  { title: "Study Design", desc: "Every project begins with a structured briefing process — defining objectives, hypotheses, and measurement frameworks before a single question is written." },
                  { title: "Questionnaire Development", desc: "Our researchers design and cognitively test questionnaires to eliminate bias, clarify ambiguity, and optimize completion rates." },
                  { title: "Panel Quality", desc: "All respondents are recruited from vetted, double-opted-in panels. We apply consistency traps, response-time filtering, and open-end quality scoring." },
                  { title: "Analysis & Reporting", desc: "AI assists with open-end coding, cross-tabulation, and pattern detection. Every automated output is reviewed by a senior analyst before it leaves our platform." },
                ].map((step, i) => (
                  <div key={step.title} className="flex gap-4">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm mb-1">{step.title}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">Standards & Certification</p>
              <h2 className="text-2xl font-bold text-slate-900 mb-5">Meeting the highest global standards</h2>
              <div className="space-y-4">
                {[
                  { icon: Award, title: "ESOMAR-Aligned", desc: "We operate in full accordance with the ESOMAR International Code on Market, Opinion and Social Research, ensuring ethical data collection and respondent protection." },
                  { icon: Shield, title: "ISO 20252 Commitment", desc: "Our quality management systems are designed to meet ISO 20252 standards for market, opinion and social research, covering all phases from study design through delivery." },
                  { icon: BarChart2, title: "AI-Assisted Analysis", desc: "Our proprietary AI workflows assist with verbatim coding, pattern recognition, and preliminary insight generation — all reviewed by certified research professionals." },
                  { icon: Users, title: "Global Panel Network", desc: "Over 5 million pre-verified respondents across 40+ countries, segmented by 400+ demographic, behavioral, and attitudinal attributes." },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4 bg-white border border-gray-200 rounded-xl p-4">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm mb-1">{item.title}</p>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why trust section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Why clients trust Prime Eye Research</h2>
          <p className="text-blue-100 mb-10 leading-relaxed">We're not just a data vendor — we're a research partner that takes responsibility for the quality and actionability of every insight we deliver.</p>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {[
              "No outsourcing — every project is executed by our in-house team",
              "Analyst sign-off on every automated output before delivery",
              "98% client satisfaction rate across 10,000+ annual projects",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3 text-left">
                <CheckCircle className="w-5 h-5 text-blue-200 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-100 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
          <Link
            href="/request-proposal"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-colors"
          >
            Start a research project →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
