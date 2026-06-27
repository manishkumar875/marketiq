"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BarChart2, Globe2, Zap, Target, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const features = [
  { icon: BarChart2, title: "Data-Driven Precision", desc: "Accurate insights backed by verified respondents and rigorous quality controls across every methodology." },
  { icon: Globe2, title: "Global Reach", desc: "Access respondents across 40+ countries and diverse target audiences through our validated panel network." },
  { icon: Zap, title: "Fast Turnaround", desc: "Rapid project execution without compromising research quality — from design to deliverable in record time." },
  { icon: Target, title: "Custom Research Solutions", desc: "Every study is tailored to your specific objectives, industry, and audience — no one-size-fits-all templates." },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 section-tint relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative p-2 sm:p-4 lg:-ml-10"
          >
            {/* Outer glow disc */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-100 to-blue-50 -rotate-2 scale-100" />

            <Image 
              src="/images/newdashboard.jpeg" 
              alt="Prime Eye Research Dashboard" 
              width={1200}
              height={800}
              className="relative z-10 w-full h-auto rounded-2xl shadow-2xl border border-gray-100 object-cover scale-[1.12] origin-right"
            />
          </motion.div>

          {/* Right — copy + features */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3"
            >
              Why Global Brands Choose Primeye
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight"
            >
              Research That Drives Decisions, Not Just Reports
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-slate-600 mb-8 leading-relaxed"
            >
              We combine expert research methodologies, global respondent access, and AI-powered analytics to deliver insights that help businesses launch products, understand customers, and accelerate growth.
            </motion.p>

            <div className="space-y-4">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    className="flex gap-4 bg-white border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-sm transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 mb-1">{f.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-7"
            >
              <Link
                href="/request-proposal"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Your Research Project <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
