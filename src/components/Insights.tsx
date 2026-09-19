import { RevealGroup, RevealItem } from "./Reveal";

const ARTICLES = [
  { tag: "Corporate", title: "7 clauses every UAE business should review in commercial contracts" },
  { tag: "Arbitration", title: "When can an arbitration award be challenged in the UAE?" },
  { tag: "Corporate", title: "Shareholder disputes in UAE companies: practical warning signs" },
];

export function Insights() {
  return (
    <section id="insights" className="bg-ivory-2 py-[clamp(56px,10vh,120px)]">
      <div className="wrap">
        <div className="flex items-baseline gap-3 mb-8">
          <span className="mono-label font-bold text-bronze">06 — Insights</span>
          <span className="h-px flex-1 bg-line" />
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-serif font-semibold text-navy leading-[1.08] text-[clamp(26px,3.6vw,50px)] max-w-[16ch]">
            Practical reading, <em>not</em> a blog.
          </h2>
          <a href="#contact" className="mono-label text-bronze hover:text-navy transition-colors border-b border-bronze pb-0.5">
            Need advice on this? Speak with our team →
          </a>
        </div>

        <RevealGroup className="mt-12 grid gap-px bg-line md:grid-cols-3" stagger={0.08}>
          {ARTICLES.map((a) => (
            <RevealItem key={a.title} className="bg-ivory-2 p-6 flex flex-col gap-4 min-h-[220px]">
              <span className="mono-label text-bronze">{a.tag}</span>
              <p className="font-serif text-lg leading-snug text-navy flex-1">{a.title}</p>
              <span className="mono-label text-muted/70">Forthcoming</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
