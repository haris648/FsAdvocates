"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PRACTICE_AREAS = [
  {
    n: "01",
    title: "General Legal Consultations",
    desc: "Strategic counsel across every area of UAE law, tailored to your circumstances.",
  },
  {
    n: "02",
    title: "Civil & Commercial Litigation",
    desc: "Assertive representation before UAE courts in civil and commercial disputes.",
  },
  {
    n: "03",
    title: "Real Estate Law",
    desc: "Guiding developers, landlords, and investors through the UAE property landscape.",
  },
  {
    n: "04",
    title: "Corporate Law",
    desc: "Structuring, governance, and transactional counsel for companies at every stage.",
  },
  {
    n: "05",
    title: "Arbitration & Dispute Resolution",
    desc: "Resolving high-stakes disputes through DIFC-LCIA, DIAC, and international arbitration.",
  },
  {
    n: "06",
    title: "Criminal Law",
    desc: "Rigorous defense and advisory across criminal proceedings in the UAE.",
  },
  {
    n: "07",
    title: "Labor & Employment Law",
    desc: "Protecting the interests of employers and employees under UAE labor law.",
  },
  {
    n: "08",
    title: "Intellectual Property",
    desc: "Safeguarding trademarks, patents, and creative assets across the region.",
  },
  {
    n: "09",
    title: "Family & Sharia Law",
    desc: "Sensitive, discreet counsel in matters of family, inheritance, and personal status.",
  },
  {
    n: "10",
    title: "Maritime & Insurance Law",
    desc: "Navigating maritime commerce and insurance claims across UAE waters and beyond.",
  },
];

export default function PracticeAreas() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };
          if (!isDesktop) return;

          const track = trackRef.current;
          const section = sectionRef.current;
          if (!track || !section) return;

          const cards = gsap.utils.toArray<HTMLElement>(".practice-card");

          const getDistance = () =>
            track.scrollWidth - section.clientWidth;

          const scrollTween = gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${getDistance()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          cards.forEach((card, i) => {
            gsap.fromTo(
              card,
              { opacity: 0.25, scale: 0.92 },
              {
                opacity: 1,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  containerAnimation: scrollTween,
                  trigger: card,
                  start: "left 85%",
                  end: "left 45%",
                  scrub: true,
                },
              }
            );
          });
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="practice-areas"
      ref={sectionRef}
      className="relative overflow-hidden border-t hairline bg-ink-soft py-24 md:h-screen md:py-0"
    >
      <div className="relative z-10 mb-12 px-6 md:absolute md:top-14 md:left-12 md:mb-0 md:px-0">
        <p className="eyebrow mb-4">What We Practice</p>
        <h2 className="font-serif text-4xl text-ivory md:text-5xl">
          Practice Areas
        </h2>
      </div>

      <div
        ref={trackRef}
        className="practice-track flex flex-col gap-5 px-6 md:h-full md:w-max md:flex-row md:items-center md:gap-8 md:px-12 md:pt-16"
      >
        {PRACTICE_AREAS.map((area) => (
          <div
            key={area.n}
            className="practice-card group relative flex h-[280px] w-full shrink-0 flex-col justify-between overflow-hidden rounded-2xl border hairline bg-gradient-to-br from-ink to-ink-soft p-8 transition-colors duration-500 hover:border-gold/50 md:h-[420px] md:w-[340px] md:p-9"
          >
            <div className="flex items-start justify-between">
              <span className="font-serif text-sm text-gold-soft">
                {area.n}
              </span>
              <span className="h-2 w-2 rounded-full bg-burgundy-bright transition-transform duration-500 group-hover:scale-150 group-hover:bg-gold" />
            </div>

            <div>
              <h3 className="font-serif text-2xl leading-tight text-ivory md:text-[1.7rem]">
                {area.title}
              </h3>
              <p className="mt-4 max-h-0 overflow-hidden text-sm font-light leading-relaxed text-ivory-dim opacity-0 transition-all duration-500 group-hover:mt-4 group-hover:max-h-24 group-hover:opacity-100">
                {area.desc}
              </p>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-gold via-gold-soft to-transparent transition-transform duration-500 group-hover:scale-x-100" />
          </div>
        ))}
      </div>
    </section>
  );
}
