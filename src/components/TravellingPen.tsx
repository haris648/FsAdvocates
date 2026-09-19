"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsapConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PenGraphic } from "./PenGraphic";

/**
 * One fixed pen, carried the full length of the page as a single keyframed
 * path in x / y / rotation / scale (percentages of the viewport), scrubbed
 * directly to scroll position so it plays forward and back correctly.
 *
 * Unlike the reference it does not fade after the first few sections — it
 * stays in play from the hero to the final CTA, then eases out as the
 * footer's own wordmark takes over.
 */
// The photo itself already carries ~42° of nib-to-cap diagonal. CSS
// `rotate()` composes with that baked-in angle rather than replacing it, so
// positive values here flatten the pen toward horizontal and negative
// values steepen it toward vertical. −40° (≈82° effective) read as too
// vertical; centring on −20° (≈62° effective) is the confirmed sweet spot.
// Keeping rotation in a tight, always-negative band (−13° to −28°) holds a
// steady diagonal-but-not-vertical angle for the whole journey.
const JOURNEY = {
  "0%": { x: "20vw", y: "-32vh", rotation: -20, scale: 1, opacity: 1 },
  "9%": { x: "5vw", y: "-18vh", rotation: -26, scale: 0.96, opacity: 1 },
  "18%": { x: "-15vw", y: "-6vh", rotation: -14, scale: 0.92, opacity: 1 },
  "27%": { x: "13vw", y: "4vh", rotation: -28, scale: 0.89, opacity: 1 },
  "36%": { x: "-13vw", y: "-10vh", rotation: -16, scale: 0.93, opacity: 1 },
  "45%": { x: "17vw", y: "0vh", rotation: -25, scale: 0.88, opacity: 1 },
  "54%": { x: "-19vw", y: "8vh", rotation: -13, scale: 0.85, opacity: 1 },
  "63%": { x: "9vw", y: "-8vh", rotation: -24, scale: 0.9, opacity: 1 },
  "72%": { x: "-9vw", y: "10vh", rotation: -17, scale: 0.84, opacity: 1 },
  "81%": { x: "15vw", y: "2vh", rotation: -27, scale: 0.81, opacity: 1 },
  "90%": { x: "-7vw", y: "12vh", rotation: -15, scale: 0.78, opacity: 1 },
  "100%": { x: "0vw", y: "16vh", rotation: -21, scale: 0.74, opacity: 0 },
} satisfies Record<string, { x: string; y: string; rotation: number; scale: number; opacity?: number }>;

export function TravellingPen({ targetSelector = "#site-main" }: { targetSelector?: string }) {
  const penRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !penRef.current) return;
      const target = document.querySelector(targetSelector);
      if (!target) return;

      gsap.set(penRef.current, {
        xPercent: -50,
        yPercent: -50,
        top: "50%",
        left: "50%",
        force3D: false,
      });

      gsap.to(penRef.current, {
        keyframes: JOURNEY,
        ease: "none",
        force3D: false,
        scrollTrigger: {
          trigger: target,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      ScrollTrigger.refresh();
    },
    { dependencies: [reduced, targetSelector], scope: penRef }
  );

  if (reduced) return null;

  return (
    <div
      ref={penRef}
      aria-hidden="true"
      className="pointer-events-none fixed z-[6] w-[min(21vw,240px)] transition-opacity duration-500 ease-out"
    >
      <PenGraphic />
    </div>
  );
}
