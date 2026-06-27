"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FileText, ArrowRight, Users, ClipboardCheck, Globe, Star } from "lucide-react";
import dynamic from "next/dynamic";

const NetworkBackground = dynamic(() => import("@/components/NetworkBackground"), { ssr: false });

const stats = [
  { icon: Users, value: "200+", label: "Clients Globally", sub: "Across 40+ countries" },
  { icon: ClipboardCheck, value: "10,000+", label: "Projects Delivered Annually", sub: "With speed & accuracy" },
  { icon: Globe, value: "40+", label: "Countries Worldwide", sub: "Global reach, local expertise" },
  { icon: Star, value: "98%", label: "Client Satisfaction", sub: "Long-term partnerships built on trust" },
];

export default function Hero() {
  return (
    <section className="relative pt-20 min-h-[92vh] flex flex-col justify-center bg-[#F8FAFC] overflow-hidden">
      <NetworkBackground opacity={0.6} />

      {/* World map + chart SVG illustration (right side) */}
      <div className="absolute right-0 top-20 bottom-0 w-[55%] hidden lg:flex items-end justify-end pointer-events-none select-none">
        {/* World map */}
        <div className="absolute inset-0 right-0 z-0 mix-blend-multiply opacity-80">
          <Image src="/images/map.jpeg" alt="World Map" width={1000} height={1000} priority className="w-full h-full object-contain object-right-top pr-6 scale-[1.15] origin-top-right" />
        </div>
        
        {/* Growth bars */}
        <div className="absolute bottom-32 lg:bottom-[22%] right-0 z-10 w-[95%] max-w-[800px] mix-blend-multiply">
          <Image src="/images/graph.peg.jpeg" alt="Growth Bar Chart" width={800} height={600} priority className="w-full h-auto object-contain object-bottom-right scale-[1.1]" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="w-full lg:max-w-[48%]">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#1E40AF] mb-4 sm:mb-6"
          >
            GLOBAL MARKET RESEARCH &amp; CONSUMER INSIGHTS
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[2.75rem] sm:text-5xl lg:text-[4rem] font-bold leading-[1.05] tracking-tight text-[#0F172A] mb-6"
          >
            Turning <br className="hidden sm:block" />
            Consumer Data <br className="hidden sm:block" />
            Into <span className="text-dark-rgb-gradient font-black">Business</span> <br className="hidden sm:block" />
            <span className="text-dark-rgb-gradient font-black">Growth</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-[15px] text-slate-600 leading-[1.6] mb-8 sm:mb-10 max-w-[440px] pr-4"
          >
            We help organizations replace guesswork with evidence — combining global respondent reach, rigorous methodology, and AI-accelerated analysis to turn raw consumer data into decisions you can act on with confidence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/request-proposal"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-semibold text-white bg-[#0D6EFD] rounded-xl hover:bg-blue-700 transition-colors shadow-[0_8px_16px_-6px_rgba(13,110,253,0.4)]"
            >
              Request Research Proposal <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-semibold text-[#1E293B] bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <FileText className="w-4 h-4 text-slate-400" /> Explore Solutions
            </Link>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 lg:mt-24 w-full"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 grid grid-cols-2 md:grid-cols-4 px-6 sm:px-10 py-8 sm:py-10">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex flex-col items-start gap-4 p-2 sm:p-4">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#0D6EFD]" strokeWidth={1.5} />
                  <div className="space-y-1">
                    <div className="text-[1.75rem] sm:text-3xl lg:text-[2.5rem] font-bold text-[#0F172A] leading-none tracking-tight">{s.value}</div>
                    <p className="text-[13px] sm:text-sm font-semibold text-[#334155] pt-1">{s.label}</p>
                    <p className="text-[11px] sm:text-[12px] text-slate-500 leading-snug">{s.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
