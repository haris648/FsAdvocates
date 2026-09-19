import { Reveal } from "./Reveal";

const POINTS = [
  "Built for businesses, investors and individuals who need clear legal direction in the UAE.",
  "Focused on practical outcomes, not legal complexity for its own sake.",
  "Combines advocacy, legal consultancy and commercial judgement.",
];

export function Positioning() {
  return (
    <section id="firm" className="bg-ivory py-[clamp(48px,8vh,96px)]">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] items-start">
        <Reveal>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="mono-label font-bold text-bronze">01 — The Firm</span>
            <span className="h-px flex-1 bg-line lg:hidden" />
          </div>
          <h2 className="font-serif font-semibold text-navy leading-[1.1] text-[clamp(24px,3.2vw,40px)]">
            UAE counsel with a <em>commercial</em> perspective.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="space-y-4 border-t border-line pt-6">
            {POINTS.map((p) => (
              <li key={p} className="body-copy flex gap-4 text-muted">
                <span className="mono-label text-bronze shrink-0">—</span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
