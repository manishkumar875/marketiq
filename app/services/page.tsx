import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import Link from "next/link";
import { MessageSquare, BarChart2, Globe2, Phone, Briefcase, ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Services — Prime Eye Research",
  description: "Qualitative, quantitative, online, telephone, and business research services. Enterprise-level market research for every business question.",
};

const services = [
  {
    icon: MessageSquare,
    title: "Qualitative Research",
    desc: "In-depth exploration of attitudes, motivations, and behaviors through interviews, focus groups, and online communities.",
    features: ["Focus Groups", "In-depth Interviews", "Online Communities", "Ethnography"],
    href: "/services/qualitative-research",
  },
  {
    icon: BarChart2,
    title: "Quantitative Research",
    desc: "Large-scale surveys and data analysis that quantify opinions, behaviors, and market trends with precision.",
    features: ["Surveys & Questionnaires", "Statistical Analysis", "Data Modeling", "Brand Tracking"],
    href: "/services/quantitative-research",
  },
  {
    icon: Globe2,
    title: "Online Research",
    desc: "Digital-first data collection using online panels, mobile surveys, and real-time respondent access across 40+ countries.",
    features: ["Online Panels", "Real-time Data Collection", "Geo-Targeted Samples", "Mobile Surveys"],
    href: "/services/online-research",
  },
  {
    icon: Phone,
    title: "Telephone Surveys",
    desc: "Reliable phone-based data collection to reach respondents effectively across target audiences.",
    features: ["CATI Interviews", "B2B & B2C Surveys", "High Response Quality", "RDD Sampling"],
    href: "/services/telephone-surveys",
  },
  {
    icon: Briefcase,
    title: "Business Research",
    desc: "Strategic research to support business decisions, growth strategies, and performance optimization.",
    features: ["Market Assessment", "Competitor Analysis", "Business Intelligence", "M&A Due Diligence"],
    href: "/services/business-research",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <NetworkBackground opacity={0.5} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4">Our Services</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight">
            Research Services Built for{" "}
            <span className="text-gradient-blue">Every Business Question</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            From exploratory qualitative studies to large-scale quantitative tracking programs, our research services cover the full spectrum of consumer and market intelligence.
          </p>
        </div>
      </section>

      {/* Service cards */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className={`grid lg:grid-cols-2 gap-8 items-center border border-gray-200 rounded-2xl p-8 hover:border-blue-200 hover:shadow-lg transition-all ${i % 2 === 1 ? "bg-slate-50/60" : "bg-white"}`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">{s.title}</h2>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-5">{s.desc}</p>
                  <ul className="grid grid-cols-2 gap-2 mb-6">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <Link href={s.href} className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                    Explore {s.title} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className={`${i % 2 === 1 ? "lg:order-1" : ""} bg-gradient-to-br from-blue-50 to-blue-100/40 rounded-xl p-8 flex items-center justify-center min-h-[180px]`}>
                  <Icon className="w-24 h-24 text-blue-200" strokeWidth={0.8} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Not sure which service fits your needs?</h2>
          <p className="text-blue-100 mb-8">Our research consultants will recommend the right methodology for your objectives, timeline, and budget.</p>
          <Link href="/request-proposal" className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-colors">
            Talk to a Research Consultant <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
