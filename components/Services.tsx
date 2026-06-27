"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  BarChart2,
  MessageSquare,
  Smile,
  TrendingUp,
  FlaskConical,
  PieChart,
  Radar,
  Lightbulb,
  ChevronDown,
} from "lucide-react";

const services = [
  {
    icon: BarChart2,
    title: "Quantitative Research",
    description:
      "Large-scale, statistically robust surveys that quantify attitudes, behaviors, and preferences across representative samples.",
    benefits: ["Statistically significant results", "Benchmarkable over time", "Scales from hundreds to 50,000+ respondents"],
    deliverables: ["Full data tables", "Statistical significance testing", "Executive summary deck"],
  },
  {
    icon: MessageSquare,
    title: "Qualitative Research",
    description:
      "In-depth interviews, focus groups, and online communities that surface the motivations and emotions behind consumer behavior.",
    benefits: ["Rich, contextual understanding", "Uncovers unmet needs", "Informs concept and message development"],
    deliverables: ["Thematic analysis report", "Verbatim highlight reel", "Session recordings & transcripts"],
  },
  {
    icon: Smile,
    title: "Customer Experience Research",
    description:
      "End-to-end measurement of the customer journey, identifying friction points and moments that drive loyalty or churn.",
    benefits: ["Journey-stage diagnostics", "Root-cause analysis of detractors", "Prioritized improvement roadmap"],
    deliverables: ["CX journey map", "CSAT / CES / NPS scorecards", "Action-priority matrix"],
  },
  {
    icon: TrendingUp,
    title: "Brand Health Tracking",
    description:
      "Continuous monitoring of awareness, perception, and equity, so you always know where your brand stands versus competitors.",
    benefits: ["Always-on visibility", "Early warning on reputation shifts", "Competitive benchmarking"],
    deliverables: ["Live tracking dashboard", "Quarterly brand health report", "Competitor share-of-voice analysis"],
  },
  {
    icon: FlaskConical,
    title: "Product Testing",
    description:
      "Concept, packaging, and prototype evaluation that validates product-market fit before significant investment.",
    benefits: ["De-risks product launches", "Optimizes features before build", "Identifies winning concepts early"],
    deliverables: ["Concept ranking report", "Purchase-intent modeling", "Feature prioritization matrix"],
  },
  {
    icon: PieChart,
    title: "Market Segmentation",
    description:
      "Data-driven segmentation that groups your market into actionable, targetable customer personas.",
    benefits: ["Sharper targeting & positioning", "Reveals high-value segments", "Aligns marketing and product teams"],
    deliverables: ["Segment profiles & personas", "Sizing & opportunity analysis", "Go-to-market recommendations"],
  },
  {
    icon: Radar,
    title: "Competitive Intelligence",
    description:
      "Systematic tracking of competitor positioning, pricing, and perception to inform strategic decision-making.",
    benefits: ["Identifies competitive white space", "Tracks rival messaging shifts", "Supports pricing strategy"],
    deliverables: ["Competitive landscape map", "SWOT-style positioning report", "Quarterly intelligence briefing"],
  },
  {
    icon: Lightbulb,
    title: "Consumer Insights",
    description:
      "Synthesis of behavioral, attitudinal, and transactional data into clear insights that drive business strategy.",
    benefits: ["Connects data to decisions", "Cross-functional insight delivery", "AI-accelerated synthesis"],
    deliverables: ["Insight briefs", "Strategic recommendation deck", "Stakeholder presentation"],
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="services" ref={ref} className="py-24 sm:py-32 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-sky-700 mb-4">What we offer</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-5">
            Research services built for every business question
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            From rapid concept validation to longitudinal brand tracking, our methodologies are
            engineered for statistical rigor and decision-ready speed.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            const open = openIndex === i;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.06 }}
                className="card-lift bg-white border border-slate-200 rounded-2xl p-6 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-sky-50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-sky-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1.5">{service.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-sky-700 hover:text-sky-800 transition-colors"
                >
                  {open ? "Hide details" : "View benefits & deliverables"}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>

                {open && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Benefits</p>
                        <ul className="space-y-1.5">
                          {service.benefits.map((b) => (
                            <li key={b} className="text-xs text-slate-600 flex gap-1.5">
                              <span className="text-sky-600 mt-0.5">•</span>{b}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Deliverables</p>
                        <ul className="space-y-1.5">
                          {service.deliverables.map((d) => (
                            <li key={d} className="text-xs text-slate-600 flex gap-1.5">
                              <span className="text-sky-600 mt-0.5">•</span>{d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
