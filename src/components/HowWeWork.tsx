"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const STEPS = [
  { n: "01", name: "Assess", body: "We listen first. Every matter starts with a clear-eyed read of the facts, the risk and what a realistic outcome looks like." },
  { n: "02", name: "Strategy", body: "A written plan, not a verbal promise — the approach, the sequence, and what each stage will likely cost." },
  { n: "03", name: "Action", body: "Negotiation, filing, arbitration or court — whichever route the strategy calls for, pursued without drift." },
  { n: "04", name: "Resolution", body: "A result you understand, explained in plain terms, with next steps if the matter isn't fully closed." },
];

// Four anchors at 12.5 / 37.5 / 62.5 / 87.5% of the timeline height — the
// same fractions the four grid rows land on, so the curve's anchor points
// always meet each step's dot exactly, at any viewport height, without
// measuring anything in JS. preserveAspectRatio="none" is what lets a
// fixed-coordinate path stretch to fill whatever height the rows resolve to,
// but it scales width and height INDEPENDENTLY — a container much wider
// than the viewBox stretches sideways bulges far more than the vertical
// run between anchors, turning a gentle wave into a full loop. Two things
// keep that from happening at any realistic container size: the viewBox's
// own aspect ratio (360:400) is close to the container's actual range
// (~0.7–1.2), so neither axis gets wildly over-stretched relative to the
// other, and the bulge itself is a modest 12.5% of the viewBox width, so
// even where the aspect ratios don't match perfectly there's headroom
// before a bulge could grow taller — in rendered pixels — than the
// vertical run it sits inside.
const PATH_D = "M180,50 C225,83 225,116 180,150 C135,183 135,216 180,250 C225,283 225,316 180,350";
const DOT_FRACTIONS = [0.125, 0.375, 0.625, 0.875];

function JourneyDot({
  progress,
  fraction,
  reduced,
}: {
  progress: ReturnType<typeof useSpring>;
  fraction: number;
  reduced: boolean;
}) {
  const scale = useTransform(progress, [fraction - 0.09, fraction], [0.55, 1]);
  const opacity = useTransform(progress, [fraction - 0.09, fraction], [0.4, 1]);
  const ring = useTransform(progress, [fraction - 0.02, fraction], ["rgba(217,194,155,0)", "rgba(217,194,155,.35)"]);
  const boxShadow = useTransform(ring, (r) => `0 0 0 6px ${r}`);
  return (
    <motion.span
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne md:block"
      style={reduced ? { scale: 1, opacity: 1 } : { scale, opacity, boxShadow }}
    />
  );
}

export function HowWeWork() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.78", "end 0.32"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <section className="bg-navy py-[clamp(56px,10vh,120px)]">
      <div className="wrap">
        <div className="flex items-baseline gap-3 mb-8">
          <span className="mono-label font-bold text-bronze-light">03 — How we work</span>
          <span className="h-px flex-1 bg-line-on-navy" />
        </div>
        <h2 className="font-serif font-semibold text-ivory leading-[1.08] text-[clamp(26px,3.6vw,50px)] max-w-[20ch]">
          Responsive and <em>transparent</em>, from the first call.
        </h2>

        <div
          ref={timelineRef}
          className="relative mt-14 md:mt-20 grid min-h-0 gap-10 md:min-h-250 md:gap-0"
          style={{ gridTemplateRows: "repeat(4, 1fr)" }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 360 400"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          >
            <path d={PATH_D} fill="none" stroke="var(--color-line-on-navy)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <motion.path
              d={PATH_D}
              fill="none"
              stroke="var(--color-champagne)"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: reduced ? 1 : progress }}
            />
          </svg>

          {STEPS.map((s, i) => {
            const fromLeft = i % 2 === 1;
            return (
              <div
                key={s.n}
                className={`relative flex items-center ${fromLeft ? "md:justify-end" : "md:justify-start"}`}
              >
                <JourneyDot progress={progress} fraction={DOT_FRACTIONS[i]} reduced={reduced} />
                <motion.div
                  className={`w-full md:w-[45%] ${fromLeft ? "md:pl-10 md:text-left" : "md:pr-10 md:text-right"}`}
                  initial={reduced ? undefined : { opacity: 0, x: fromLeft ? 44 : -44 }}
                  whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="mono-label text-bronze-light">{s.n}</span>
                  <h3 className="mt-3 font-serif text-xl font-semibold text-ivory">{s.name}</h3>
                  <p className="body-copy mt-3 text-muted-on-navy">{s.body}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
