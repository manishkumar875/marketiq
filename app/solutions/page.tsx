import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import Link from "next/link";
import { ShoppingBag, Heart, Cpu, Landmark, GraduationCap, Users, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industry Solutions — Prime Eye Research",
  description: "Sector-specific market research for Retail, Healthcare, Technology, Financial Services, and Education.",
};

const solutions = [
  { icon: ShoppingBag, title: "Retail", desc: "Omnichannel experience research, loyalty measurement, and assortment optimization studies that drive basket size and repeat visit.", href: "/solutions/retail" },
  { icon: Heart, title: "Healthcare", desc: "Patient experience, HCP perception tracking, and treatment journey research conducted under strict compliance and ethical standards.", href: "/solutions/healthcare" },
  { icon: Cpu, title: "Technology", desc: "Product-market fit testing, feature prioritization, developer experience research, and UX studies that reduce churn and accelerate adoption.", href: "/solutions/technology" },
  { icon: Landmark, title: "Financial Services", desc: "Trust and satisfaction tracking, digital banking UX research, and competitive benchmarking to protect and grow customer relationships.", href: "/solutions/financial-services" },
  { icon: GraduationCap, title: "Education", desc: "Student and alumni experience research, program perception studies, and enrollment journey insights to strengthen institutional strategy.", href: "/solutions/education" },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <NetworkBackground opacity={0.5} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4">Industry Solutions</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight">
            Solutions Tailored to Your Industry
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Sector-specific methodologies, panel sources, and benchmarks built around the realities of your category — not generic research templates.
          </p>
        </div>
      </section>

      {/* Solution grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((s) => {
              const Icon = s.icon;
              return (
                <Link key={s.title} href={s.href} className="group bg-white border border-gray-200 rounded-2xl p-7 hover:border-blue-300 hover:shadow-xl transition-all card-lift block">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-blue-600 transition-colors">
                    <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{s.title}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">{s.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                    Explore solution <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}

            {/* Custom CTA tile */}
            <div className="bg-blue-600 rounded-2xl p-7 flex flex-col justify-between">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white mb-3">Don't see your industry?</h2>
                <p className="text-sm text-blue-100 leading-relaxed mb-5">We build custom panels and methodologies for emerging and niche categories worldwide.</p>
                <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-blue-100 transition-colors">
                  Talk to our team <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom banner */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-6">
            <div>
              <p className="font-bold text-slate-900 mb-1">Need a custom research solution?</p>
              <p className="text-sm text-slate-600">Tell us your objectives and we'll design a study that delivers the insights you need.</p>
            </div>
            <Link href="/request-proposal" className="shrink-0 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              Request a Proposal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
