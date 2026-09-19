import { RevealGroup, RevealItem } from "./Reveal";

const SLOTS = [
  { role: "Managing Partner", focus: "Disputes & Arbitration" },
  { role: "Partner", focus: "Corporate & Commercial" },
  { role: "Senior Associate", focus: "Real Estate & Employment" },
];

export function People() {
  return (
    <section id="people" className="bg-ivory-2 py-[clamp(56px,10vh,120px)]">
      <div className="wrap">
        <div className="flex items-baseline gap-3 mb-8">
          <span className="mono-label font-bold text-bronze">04 — People</span>
          <span className="h-px flex-1 bg-line" />
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-serif font-semibold text-navy leading-[1.08] text-[clamp(26px,3.6vw,50px)] max-w-[16ch]">
            Clients instruct <em>lawyers</em>, not websites.
          </h2>
          <p className="mono-label max-w-[36ch] text-muted">
            Real photography and verified bios to be added once supplied by the firm —
            no stock portraits, no generated likenesses.
          </p>
        </div>

        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {SLOTS.map((s) => (
            <RevealItem key={s.role} className="border border-line bg-ivory">
              <div className="aspect-[4/5] w-full border-b border-line flex items-center justify-center bg-navy/[0.04]">
                <div className="h-20 w-20 rounded-full border border-bronze/60" />
              </div>
              <div className="p-5">
                <p className="mono-label text-bronze">Profile pending</p>
                <p className="mt-2 font-serif text-lg font-semibold text-navy">{s.role}</p>
                <p className="mt-1 mono-label text-muted">{s.focus}</p>
                <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
                  <li className="mono-label text-muted/80">Languages — TBC</li>
                  <li className="mono-label text-muted/80">Admissions — TBC</li>
                  <li className="mono-label text-muted/80">Direct contact — TBC</li>
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
