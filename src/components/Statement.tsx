"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsapConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsDesktop } from "@/hooks/useIsDesktop";

type Segment =
  | { text: string; kind: "lead" | "accent" | "stamp" | "muted" | "plain" }
  | { mark: true };

// A single continuous line, read like a ticker rather than flipped through
// like slides — the firm's actual position, not a slogan. "Signature" and
// "conviction" get the same treatment deliberately: the pen motif carried
// from the hero into language, not just imagery.
const SEGMENTS: Segment[] = [
  { text: "Every", kind: "lead" },
  { text: "signature", kind: "accent" },
  { text: "we put to a matter is a position we are prepared to", kind: "plain" },
  { text: "defend", kind: "stamp" },
  { mark: true },
  { text: "in negotiation, in arbitration, in court", kind: "muted" },
  { text: "because advice without", kind: "plain" },
  { text: "conviction", kind: "accent" },
  { text: "is not advice — it is", kind: "plain" },
  { text: "optimism.", kind: "stamp" },
  { text: "Our clients don't pay us for optimism.", kind: "lead" },
  { mark: true },
];

const SR_TEXT = SEGMENTS.filter((s): s is Extract<Segment, { text: string }> => "text" in s)
  .map((s) => s.text)
  .join(" ");

// Weighted by how often each kind actually appears in SEGMENTS (lead×2,
// accent×2, plain×3, stamp×2, muted×1), the clamp max sizes below average to
// 85px — some words read bigger (accent, the emotional peaks), some smaller
// (stamp, muted — deliberately quieter beats), but the line as a whole reads
// big.
const KIND_CLASS: Record<Exclude<Segment, { mark: true }>["kind"], string> = {
  lead: "font-serif font-semibold text-ivory text-[clamp(48px,6.6vw,92px)]",
  accent: "font-serif italic text-champagne text-[clamp(53px,7.2vw,100px)]",
  stamp:
    "mono-label border-b-4 border-bronze-light text-bronze-light font-bold text-[clamp(36px,5.2vw,73px)] pb-2 tracking-[0.04em]",
  muted: "font-serif italic text-muted-on-navy text-[clamp(32px,4.7vw,66px)]",
  plain: "body-copy text-ivory/75 text-[clamp(44px,6.1vw,85px)]",
};

function Chars({ text }: { text: string }) {
  return (
    <>
      {[...text].map((c, i) => (
        <span key={i} className="stmt-char inline-block will-change-transform">
          {c === " " ? " " : c}
        </span>
      ))}
    </>
  );
}

function Flourish() {
  return (
    <span className="stmt-mark inline-flex h-[clamp(28px,4vw,56px)] w-[clamp(56px,8vw,112px)] shrink-0 items-center" aria-hidden="true">
      <svg viewBox="0 0 64 24" fill="none" className="h-full w-full overflow-visible">
        <path
          d="M2,14 C12,2 18,22 26,12 C34,2 42,22 50,12 C55,7 58,10 62,8"
          stroke="var(--color-champagne)"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

export function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();
  // The GSAP horizontal-pin hijacks 2-3 screens' worth of vertical scroll to
  // pay off one sentence — fine as a deliberate desktop moment, too heavy a
  // toll on a phone. Below md it falls back to the same static block used
  // for reduced motion, matching how HowWeWork simplifies on mobile too.
  const usePin = !reduced && isDesktop;

  useGSAP(
    () => {
      if (!usePin) return;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const getScrollDistance = () => Math.max(track.scrollWidth - window.innerWidth, 0);

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      const segments = gsap.utils.toArray<HTMLElement>(".stmt-segment", track);
      segments.forEach((seg) => {
        const chars = seg.querySelectorAll(".stmt-char");
        if (!chars.length) return;
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 80,
            rotate: () => gsap.utils.random(-10, 10),
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            filter: "blur(0px)",
            ease: "power2.out",
            stagger: 0.045,
            scrollTrigger: {
              containerAnimation: tween,
              trigger: seg,
              // End is anchored to the segment's RIGHT edge, not its left —
              // a long, small-font phrase is physically wider than a single
              // big word, so tying the end to the left edge alone gave wide
              // segments the same scroll-window as narrow ones and left
              // their trailing characters finishing well after the next
              // (bigger) word had already resolved. Right-edge anchoring
              // scales the window with each segment's actual width, so
              // reveal order tracks reading order regardless of size.
              start: "left 95%",
              end: "right 55%",
              scrub: true,
            },
          }
        );
      });

      const marks = gsap.utils.toArray<SVGPathElement>(".stmt-mark path", track);
      marks.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            containerAnimation: tween,
            trigger: path.parentElement,
            start: "left 90%",
            end: "left 40%",
            scrub: true,
          },
        });
      });

      ScrollTrigger.refresh();
    },
    { dependencies: [usePin], scope: sectionRef }
  );

  if (!usePin) {
    return (
      <section className="bg-charcoal py-[clamp(48px,9vh,100px)]">
        <div className="wrap">
          <p className="max-w-[52ch] font-serif text-[clamp(22px,3vw,32px)] leading-[1.3] text-ivory">
            {SR_TEXT}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-charcoal">
      <p className="sr-only">{SR_TEXT}</p>
      <div className="flex h-screen items-center" aria-hidden="true">
        {/*
          The right padding is deliberately huge and asymmetric with the
          left. Scroll distance is derived from this track's total width, so
          without the extra runway the pin ends the instant the last word is
          flush with the right edge — mid-reveal, since its char animation
          needs room to keep panning left of that point to finish. The pad
          gives it somewhere to go before the section releases.
        */}
        <div
          ref={trackRef}
          className="flex items-center gap-x-[clamp(28px,3.6vw,60px)] whitespace-nowrap pl-[8vw] pr-[52vw]"
        >
          {SEGMENTS.map((s, i) =>
            "mark" in s ? (
              <Flourish key={i} />
            ) : (
              <span key={i} className={`stmt-segment inline-block ${KIND_CLASS[s.kind]}`}>
                <Chars text={s.text} />
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
