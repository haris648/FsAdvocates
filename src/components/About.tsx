"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PARAGRAPH = [
  "Fareed Alhassan Advocates and Legal Consultants provides comprehensive",
  "legal services to individuals, businesses, and institutions across the",
  "United Arab Emirates. Our practice spans civil and commercial litigation,",
  "corporate advisory, arbitration, and matters of significant public and",
  "private consequence.",
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
          isReduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, isReduced } = context.conditions as {
            isDesktop: boolean;
            isReduced: boolean;
          };

          if (isReduced) {
            gsap.set(".about-line", { opacity: 1, y: 0 });
            return;
          }

          gsap.to(".about-mark", {
            yPercent: -18,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });

          gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: isDesktop ? "+=120%" : "+=60%",
              pin: isDesktop,
              scrub: 1,
            },
          }).to(".about-line", {
            opacity: 1,
            y: 0,
            stagger: 0.4,
            ease: "none",
          });
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden border-t hairline px-6 py-32 md:px-12"
    >
      <span className="about-mark pointer-events-none absolute -right-[10%] top-1/2 -translate-y-1/2 select-none font-serif text-[38vw] leading-none text-ivory/[0.03] md:text-[26vw]">
        F
      </span>

      <div className="relative z-10 mx-auto max-w-4xl">
        <p className="eyebrow mb-8">The Firm</p>
        <div className="font-serif text-[6.5vw] leading-[1.25] text-ivory md:text-[2.7vw]">
          {PARAGRAPH.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <p className="about-line translate-y-[60%] opacity-0">{line}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
