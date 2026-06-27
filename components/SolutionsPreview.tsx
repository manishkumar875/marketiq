"use client";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShoppingBag, Heart, Cpu, Landmark, GraduationCap, Users, ArrowRight } from "lucide-react";

const solutions = [
  {
    icon: ShoppingBag,
    title: "Retail",
    desc: "Omnichannel experience research, loyalty measurement, and assortment optimization studies.",
    href: "/solutions/retail",
  },
  {
    icon: Heart,
    title: "Healthcare",
    desc: "Patient experience, HCP perception tracking, and treatment journey research under strict compliance standards.",
    href: "/solutions/healthcare",
  },
  {
    icon: Cpu,
    title: "Technology",
    desc: "Product-market fit testing, feature prioritization, and developer & user experience research.",
    href: "/solutions/technology",
  },
  {
    icon: Landmark,
    title: "Financial Services",
    desc: "Trust and satisfaction tracking, digital banking UX research, and competitive product benchmarking.",
    href: "/solutions/financial-services",
  },
  {
    icon: GraduationCap,
    title: "Education",
    desc: "Student & alumni experience research, program perception studies, and enrollment journey insights.",
    href: "/solutions/education",
  },
];

export default function SolutionsPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="solutions" className="py-20 lg:py-28 section-tint relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">Industry Solutions</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Solutions tailored to your industry
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm leading-relaxed">
            Sector-specific methodologies, panel sources, and benchmarks built around the realities of your category.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutions.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all card-lift"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{s.desc}</p>
                <Link
                  href={s.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            );
          })}

          {/* CTA tile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="bg-blue-600 rounded-xl p-6 flex flex-col justify-between"
          >
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Don't see your industry?</h3>
              <p className="text-sm text-blue-100 leading-relaxed mb-4">
                We build custom panels and methodologies for emerging and niche categories too.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-blue-100 transition-colors"
              >
                Talk to our team <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-sm">Need a custom research solution?</p>
              <p className="text-xs text-slate-600">Tell us your objectives and we'll design a study that delivers the insights you need.</p>
            </div>
          </div>
          <Link
            href="/request-proposal"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Request a Proposal <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
