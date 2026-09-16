"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// [DEMO PLACEHOLDER] all figures below are illustrative for the pitch demo
// and must be replaced with the firm's verified figures before the real build.
const STATS = [
  { value: 25, suffix: "+", label: "Years of Combined Experience" },
  { value: 10, suffix: "", label: "Practice Areas Covered" },
  { value: 4, suffix: "", label: "Languages Spoken" },
  { value: 500, suffix: "+", label: "Matters Successfully Resolved" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const duration = 1800;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function Differentiators() {
  return (
    <section
      id="why-us"
      className="relative border-t hairline px-6 py-28 md:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-4 text-center md:text-left">
          Why This Firm
        </p>
        <h2 className="text-balance mx-auto max-w-2xl text-center font-serif text-3xl text-ivory md:mx-0 md:text-left md:text-4xl">
          A practice built on precision, discretion, and results.
        </h2>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4 md:gap-x-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border-t hairline pt-6 text-center md:text-left"
            >
              <div className="font-serif text-5xl text-gold-soft md:text-6xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-3 text-sm font-light leading-snug text-ivory-dim">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
