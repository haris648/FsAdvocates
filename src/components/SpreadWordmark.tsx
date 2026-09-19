"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsapConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { RevealGroup, RevealItem } from "./Reveal";

const LETTERS = "FS ADVOCATES".split("");

/**
 * The firm name spread letter by letter across (slightly more than) the
 * full width, cropped by the frame. The hero variant is bound to scroll
 * POSITION within its own section, so the letters spread apart and sink as
 * you leave the hero and pull back together if you scroll back up. The
 * footer variant is a simple one-time reveal, since it's the last thing on
 * the page rather than something you scroll past.
 */
export function SpreadWordmark({ variant }: { variant: "hero" | "footer" }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (variant !== "hero" || reduced || !wrapRef.current) return;
    const wrap = wrapRef.current;
    const letters = Array.from(wrap.children) as HTMLElement[];
    const mid = (letters.length - 1) / 2;

    const st = ScrollTrigger.create({
      trigger: wrap.closest("section") ?? wrap,
      start: "top top",
      end: "bottom top",
      scrub: 0.4,
      onUpdate: (self) => {
        const p = self.progress;
        letters.forEach((el, i) => {
          el.style.transform = `translate(${((i - mid) * p * 2.6).toFixed(2)}vw, ${(p * 28).toFixed(2)}vh)`;
          el.style.opacity = String(Math.max(1 - p * 1.15, 0));
        });
      },
    });

    return () => st.kill();
  }, [variant, reduced]);

  const base =
    "flex justify-between select-none pointer-events-none font-serif font-semibold leading-[0.8] tracking-[-0.045em] text-[clamp(58px,13.5vw,210px)]";

  if (variant === "footer") {
    return (
      <RevealGroup className={`${base} text-navy-deep translate-y-[0.14em]`} stagger={0.02}>
        {LETTERS.map((ch, i) => (
          <RevealItem key={i} y={26} className="inline-block">
            <span>{ch === " " ? " " : ch}</span>
          </RevealItem>
        ))}
      </RevealGroup>
    );
  }

  return (
    <div ref={wrapRef} className={`${base} text-navy translate-y-[0.14em]`}>
      {LETTERS.map((ch, i) => (
        <span key={i} className="inline-block">
          {ch === " " ? " " : ch}
        </span>
      ))}
    </div>
  );
}
