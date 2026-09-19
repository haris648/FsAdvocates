import { RevealGroup, RevealItem } from "./Reveal";

const SECTORS = [
  { n: "01", name: "Real Estate" },
  { n: "02", name: "Technology" },
  { n: "03", name: "Family Business" },
  { n: "04", name: "Hospitality" },
  { n: "05", name: "Financial Services" },
  { n: "06", name: "Start-ups" },
];

export function Industries() {
  return (
    <section id="industries" className="bg-ivory py-[clamp(56px,10vh,120px)]">
      <div className="wrap">
        <div className="flex items-baseline gap-3 mb-8">
          <span className="mono-label font-bold text-bronze">05 — Industries</span>
          <span className="h-px flex-1 bg-line" />
        </div>
        <h2 className="font-serif font-semibold text-navy leading-[1.08] text-[clamp(26px,3.6vw,50px)] max-w-[18ch]">
          Sector fluency, not <em>generic</em> advice.
        </h2>

        <RevealGroup className="mt-10 border-t border-line" stagger={0.05}>
          {SECTORS.map((s) => (
            <RevealItem key={s.n}>
              <div className="flex items-center gap-6 border-b border-line py-5 group">
                <span className="mono-label text-bronze w-8 shrink-0">{s.n}</span>
                <span className="font-serif text-xl md:text-2xl text-navy group-hover:text-bronze transition-colors">
                  {s.name}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
