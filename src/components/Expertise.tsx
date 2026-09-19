"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsapConfig";
import { Reveal } from "./Reveal";

const AREAS = [
  {
    id: "disputes",
    name: "Commercial Litigation & Disputes",
    width: 2.0,
    what: "Breach of contract, debt recovery, shareholder disputes, urgent applications, enforcement.",
    who: "Companies, founders, investors, family businesses.",
    approach: "Assessment → strategy → negotiation or court → enforcement.",
  },
  {
    id: "arbitration",
    name: "Arbitration",
    width: 2.6,
    what: "DIAC and international arbitration, award enforcement, interim measures.",
    who: "Parties to commercial and construction contracts.",
    approach: "Case strategy aligned to the seat, tribunal and applicable rules.",
  },
  {
    id: "corporate",
    name: "Corporate & Commercial",
    width: 1.6,
    what: "Structuring, contracts, M&A, market entry, governance.",
    who: "Investors, founders and foreign businesses entering the UAE.",
    approach: "Commercial risk assessed before it is drafted around.",
  },
  {
    id: "realestate",
    name: "Real Estate",
    width: 3.0,
    what: "Transactions, leasing, disputes, construction-related claims.",
    who: "Developers, landlords, tenants, individual buyers.",
    approach: "Title, structure and dispute exposure reviewed together.",
  },
  {
    id: "employment",
    name: "Employment",
    width: 1.9,
    what: "Termination, restructuring, disputes, policy review.",
    who: "Employers and HR directors managing UAE workforces.",
    approach: "Compliance first, then a defensible process.",
  },
  {
    id: "private",
    name: "Private Client",
    width: 2.3,
    what: "Family, succession and civil matters where representation is permitted.",
    who: "Individuals and families with UAE-linked affairs.",
    approach: "Discretion throughout, from first call to resolution.",
  },
  {
    id: "criminal",
    name: "Criminal / White-Collar",
    width: 3.4,
    what: "Representation in criminal proceedings and regulatory matters.",
    who: "Individuals and companies facing investigation or charge.",
    approach: "Early intervention, before a matter escalates.",
  },
] as const;

const SIGNATURE_D =
  "M 30 92 C 70 30, 110 30, 130 78 C 148 118, 180 118, 198 68 C 214 24, 250 24, 268 80 C 284 130, 320 130, 340 72 C 356 26, 392 26, 410 84 C 424 126, 460 126, 480 66 C 500 8, 560 8, 600 60 C 630 96, 700 90, 760 46";

export function Expertise() {
  const [active, setActive] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lengthRef = useRef(0);

  useGSAP(
    () => {
      const path = pathRef.current;
      if (!path) return;
      const length = path.getTotalLength();
      lengthRef.current = length;
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      ScrollTrigger.create({
        trigger: panelRef.current,
        start: "top 78%",
        once: true,
        onEnter: () => {
          gsap.to(path, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" });
        },
      });
    },
    { scope: panelRef }
  );

  function select(i: number) {
    setActive(i);
    const path = pathRef.current;
    if (!path) return;
    gsap.fromTo(
      path,
      { strokeDashoffset: lengthRef.current },
      { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut", strokeWidth: AREAS[i].width }
    );
  }

  const area = AREAS[active];

  return (
    <section id="expertise" className="bg-ivory py-[clamp(56px,10vh,120px)]">
      <div className="wrap">
        <Reveal>
          <div className="flex items-baseline gap-3 mb-8">
            <span className="mono-label font-bold text-bronze">02 — Expertise</span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <h2 className="font-serif font-semibold text-navy leading-[1.08] text-[clamp(26px,3.6vw,50px)] max-w-[18ch]">
            Seven practices. <em>One</em> standard of attention.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-2">
          {AREAS.map((a, i) => (
            <button
              key={a.id}
              type="button"
              aria-pressed={active === i}
              onClick={() => select(i)}
              className={`mono-label border px-4 py-[9px] transition-colors ${
                active === i
                  ? "border-navy text-navy"
                  : "border-line text-muted hover:border-bronze hover:text-bronze"
              }`}
            >
              {a.name}
            </button>
          ))}
        </Reveal>

        <div ref={panelRef} className="mt-8 border border-line bg-ivory-2 p-[clamp(20px,3vw,34px)]">
          <svg viewBox="0 0 800 150" className="w-full h-auto" role="img" aria-label="A signature drawn to represent the selected practice area.">
            <path
              ref={pathRef}
              d={SIGNATURE_D}
              fill="none"
              stroke="var(--color-bronze)"
              strokeWidth={area.width}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="mt-6 grid gap-6 border-t border-line pt-6 md:grid-cols-3">
            <div>
              <p className="mono-label font-bold text-bronze">What we do</p>
              <p className="body-copy mt-2 text-muted">{area.what}</p>
            </div>
            <div>
              <p className="mono-label font-bold text-bronze">Who we advise</p>
              <p className="body-copy mt-2 text-muted">{area.who}</p>
            </div>
            <div>
              <p className="mono-label font-bold text-bronze">Our approach</p>
              <p className="body-copy mt-2 text-muted">{area.approach}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
