"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ShoppingBasket,
  Store,
  HeartPulse,
  Cpu,
  Car,
  Landmark,
  GraduationCap,
} from "lucide-react";

const industries = [
  {
    icon: ShoppingBasket,
    name: "FMCG",
    text: "Shopper behavior, pack testing, and category innovation pipelines for consumer packaged goods brands.",
  },
  {
    icon: Store,
    name: "Retail",
    text: "Omnichannel experience research, loyalty measurement, and assortment optimization studies.",
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    text: "Patient experience, HCP perception tracking, and treatment journey research under strict compliance standards.",
  },
  {
    icon: Cpu,
    name: "Technology",
    text: "Product-market fit testing, feature prioritization, and developer & user experience research.",
  },
  {
    icon: Car,
    name: "Automotive",
    text: "Brand perception, EV adoption studies, and dealership experience measurement across global markets.",
  },
  {
    icon: Landmark,
    name: "Financial Services",
    text: "Trust and satisfaction tracking, digital banking UX research, and competitive product benchmarking.",
  },
  {
    icon: GraduationCap,
    name: "Education",
    text: "Student & alumni experience research, program perception studies, and enrollment journey insights.",
  },
];

export default function Solutions() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="solutions" ref={ref} className="py-24 sm:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-sky-700 mb-4">Industries we serve</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-5">
            Solutions tailored to your industry
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Sector-specific methodologies, panel sources, and benchmarks built around the
            realities of your category.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.06 }}
                className="card-lift bg-white border border-slate-200 rounded-2xl p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-sky-700" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">{ind.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{ind.text}</p>
              </motion.div>
            );
          })}

          {/* Filler CTA card to balance the 7-item grid on 4-col layouts */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 + 7 * 0.06 }}
            className="bg-sky-700 rounded-2xl p-6 flex flex-col justify-between text-white"
          >
            <div>
              <h3 className="text-base font-semibold mb-2">Don&apos;t see your industry?</h3>
              <p className="text-xs text-sky-100 leading-relaxed">
                We build custom panels and methodologies for emerging and niche categories too.
              </p>
            </div>
            <a href="#contact" className="text-xs font-semibold mt-4 inline-flex items-center gap-1 hover:gap-2 transition-all">
              Talk to our team →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
