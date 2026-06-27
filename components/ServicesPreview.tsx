"use client";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, BarChart2, Globe2, Phone, Briefcase, ArrowRight, Check } from "lucide-react";

const services = [
  {
    icon: MessageSquare,
    title: "Qualitative Research",
    desc: "In-depth exploration of attitudes, motivations, and behaviors through interviews, focus groups, and online communities.",
    features: ["Focus Groups", "In-depth Interviews", "Online Communities"],
    href: "/services/qualitative-research",
  },
  {
    icon: BarChart2,
    title: "Quantitative Research",
    desc: "Large-scale surveys and data analysis that quantify opinions, behaviors, and market trends with precision.",
    features: ["Surveys & Questionnaires", "Statistical Analysis", "Data Modeling"],
    href: "/services/quantitative-research",
  },
  {
    icon: Globe2,
    title: "Online Research",
    desc: "Digital-first data collection using online panels, mobile surveys, and real-time respondent access.",
    features: ["Online Panels", "Real-time Data Collection", "Geo-Targeted Samples"],
    href: "/services/online-research",
  },
  {
    icon: Phone,
    title: "Telephone Surveys",
    desc: "Reliable phone-based data collection to reach respondents effectively across target audiences.",
    features: ["CATI Interviews", "B2B & B2C Surveys", "High Response Quality"],
    href: "/services/telephone-surveys",
  },
  {
    icon: Briefcase,
    title: "Business Research",
    desc: "Strategic research to support business decisions, growth strategies, and performance optimization.",
    features: ["Market Assessment", "Competitor Analysis", "Business Intelligence"],
    href: "/services/business-research",
  },
];

export default function ServicesPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="services" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-4 items-stretch">
          {/* Left label column */}
          <div className="lg:col-span-4 flex flex-col">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3"
            >
              Our Services
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight"
            >
              Research services built for{" "}
              <span className="text-gradient-blue">every business question</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.15 }}
              className="text-slate-600 text-sm leading-relaxed mb-2"
            >
              Our research solutions help you make confident decisions with reliable data, advanced methodologies, and global reach.
            </motion.p>
            <div className="w-12 h-1 bg-blue-600 rounded mt-4" />

            {/* Business Research block moved to empty space on the left */}
            {(() => {
              const s = services[4]; // Business Research
              const Icon = s.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 }}
                  className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all card-lift mt-8 lg:mt-auto"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm">{s.title}</h3>
                      <div className="w-6 h-0.5 bg-blue-600 mt-1 rounded" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{s.desc}</p>
                  <ul className="space-y-1.5 mb-4">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={s.href}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                    aria-label={`Learn more about ${s.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })()}
          </div>

          {/* Right cards grid */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {services.slice(0, 4).map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all card-lift"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm">{s.title}</h3>
                      <div className="w-6 h-0.5 bg-blue-600 mt-1 rounded" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{s.desc}</p>
                  <ul className="space-y-1.5 mb-4">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={s.href}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                    aria-label={`Learn more about ${s.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-slate-600 mt-10"
        >
          Need a customized research solution?{" "}
          <Link href="/contact" className="text-blue-600 font-semibold hover:underline">
            Talk to our experts →
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
