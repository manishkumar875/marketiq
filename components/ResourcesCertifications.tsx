"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, FileText, Award, Shield, ArrowRight } from "lucide-react";
import NetworkBackground from "@/components/NetworkBackground";

const resources = [
  {
    icon: BookOpen,
    title: "Panel Book",
    desc: "Detailed information about our global panel, capabilities, and audience reach.",
    link: "#",
  },
  {
    icon: FileText,
    title: "ESOMAR 28",
    desc: "Explore the global standard for market, opinion, and social research.",
    link: "#",
  },
];

export default function ResourcesCertifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <NetworkBackground opacity={0.4} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">Resources</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 max-w-xl leading-tight">
            Knowledge that drives{" "}
            <span className="text-gradient-blue">smarter decisions</span>
          </h2>
          <p className="text-slate-600 max-w-lg text-sm leading-relaxed">
            Access our panel book, industry standards, thought leadership, and research insights.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
          {resources.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-200 hover:shadow-md transition-all card-lift group"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{r.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">{r.desc}</p>
                <a
                  href={r.link}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors"
                >
                  View Document <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
