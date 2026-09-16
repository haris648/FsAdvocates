"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ConsultationCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const path = pathRef.current;
      if (!path) return;

      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden border-t hairline bg-burgundy px-6 py-32 text-center md:px-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/40" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <p className="eyebrow mb-6 !text-ivory-dim">Begin Your Case</p>
        <h2 className="text-balance font-serif text-4xl leading-tight text-ivory md:text-6xl">
          Your matter deserves counsel that argues it like their own.
        </h2>

        <svg
          viewBox="0 0 400 20"
          className="mx-auto mt-8 h-4 w-64 md:w-80"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d="M2 14 Q 100 2, 200 12 T 398 8"
            fill="none"
            stroke="var(--color-gold-soft)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <p className="text-balance mx-auto mt-8 max-w-xl text-base font-light text-ivory-dim">
          Schedule a confidential consultation with our team and let us
          chart the most direct path to resolution.
        </p>

        <div className="mt-12">
          <MagneticButton
            href="mailto:consultation@fareedalhassan.ae"
            variant="outline"
            className="!border-ivory/40 !text-ivory hover:!border-gold hover:!text-gold-soft"
          >
            Book a Consultation
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
