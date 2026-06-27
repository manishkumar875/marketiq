"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe2, Database, BrainCircuit, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Globe2,
    title: "Global Respondent Reach",
    text: "Vetted, quality-screened panels across 40+ countries deliver representative samples for every study, anywhere your customers are.",
  },
  {
    icon: BrainCircuit,
    title: "AI-Accelerated Insight",
    text: "AI handles survey drafting, open-end coding, and cross-tabulation — compressing weeks of analysis into hours without sacrificing rigor.",
  },
  {
    icon: Database,
    title: "Rigorous Data Analytics",
    text: "Statistically validated methods, from MaxDiff to conjoint analysis, applied by a research team with decades of combined experience.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Methodology",
    text: "ESOMAR-aligned standards and certified data handling mean your stakeholders can trust every number we report.",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: narrative copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-sky-700 mb-4">About Prime Eye Research</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-6 leading-tight">
              Research discipline, sharpened by AI
            </h2>

            <div className="space-y-5 text-slate-600 text-base leading-relaxed">
              <p>
                Prime Eye Research is a global market research and consumer intelligence firm
                built for organizations that need to move fast without cutting corners on rigor.
                We pair experienced researchers with modern AI infrastructure, so insight arrives
                at a speed traditional firms simply can't match.
              </p>
              <p>
                Our work spans quantitative and qualitative studies, customer experience
                measurement, brand health tracking, product testing, market segmentation, and
                competitive intelligence. Every engagement is grounded in sound sampling,
                validated questionnaire design, and analyst-reviewed reporting — never a
                shortcut on the fundamentals.
              </p>
              <p>
                AI runs through the entire research lifecycle: survey construction that used to
                take weeks now takes minutes, open-ended responses across thousands of verbatims
                get coded in hours, and predictive models surface what consumers are likely to
                do next, not just what they say today.
              </p>
              <p>
                We've delivered 10,000+ projects a year for 35,000+ clients across 40+ countries
                — work that ranges from a single concept test to an always-on brand tracking
                program. A 98% client satisfaction rate reflects what happens when speed and
                rigor aren't a trade-off.
              </p>
            </div>
          </motion.div>

          {/* Right: pillar cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-4"
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="card-lift bg-sky-50/60 border border-sky-100 rounded-2xl p-6"
                >
                  <div className="w-10 h-10 rounded-lg bg-white border border-sky-200 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-sky-700" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">{pillar.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{pillar.text}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
