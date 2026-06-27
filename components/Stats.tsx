"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 35000, suffix: "+", label: "Clients", sublabel: "Served globally across every region" },
  { value: 10000, suffix: "+", label: "Projects", sublabel: "Delivered annually, on schedule" },
  { value: 25, suffix: "+", label: "Countries", sublabel: "With active research coverage" },
  { value: 98, suffix: "%", label: "Satisfaction", sublabel: "Client retention rate" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-20 relative bg-sky-50/60 border-y border-sky-100">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-semibold tracking-widest uppercase text-sky-700 mb-12"
        >
          By the numbers
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-sky-100 rounded-2xl overflow-hidden border border-sky-100">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-8 lg:p-10 text-center group hover:bg-sky-50/80 transition-colors"
            >
              <div className="text-4xl lg:text-5xl font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-base font-semibold text-slate-700 mb-1">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
