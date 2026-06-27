import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import ProposalForm from "./ProposalForm";
import { Mail, BarChart2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Research Proposal — Prime Eye Research",
  description: "Tell us about your research needs. Our team will prepare a customised proposal within one business day.",
};

export default function RequestProposalPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative pt-24 pb-16 overflow-hidden">
        <NetworkBackground opacity={0.4} />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left column */}
            <div>
              {/* Mail icon */}
              <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                Request a{" "}
                <span className="text-gradient-blue">Research Proposal</span>
              </h1>
              <p className="text-slate-600 leading-relaxed mb-8 max-w-sm">
                Tell us about your research needs and our team will prepare a customised proposal designed for your objectives, target audience, and timeline.
              </p>

              {/* World map + growth arrow illustration */}
              <div className="relative mb-8 h-52 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-100">
                <Image
                  src="/images/newimg.jpeg"
                  alt="Growth illustration"
                  width={440}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Blue CTA card */}
              <div className="bg-blue-600 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <BarChart2 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white">Need a custom research solution?</h3>
                </div>
                <p className="text-sm text-blue-100 mb-4">Our experts will design a study tailored to your business goals.</p>
                <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white border border-white/40 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                  Talk to Our Team <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right column — form */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-7 sm:p-9">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Tell us about your project</h2>
              <div className="w-10 h-0.5 bg-blue-600 rounded mb-6" />
              <ProposalForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
