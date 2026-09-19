import { RevealGroup, RevealItem } from "./Reveal";

const STATS = [
  { label: "Years of practice", value: "—" },
  { label: "Lawyers", value: "—" },
  { label: "Languages spoken", value: "—" },
  { label: "Jurisdictions", value: "UAE · DIFC" },
];

export function CredibilityBar() {
  return (
    <section className="border-y border-line bg-ivory-2 py-8">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
        <RevealGroup className="flex flex-wrap gap-x-12 gap-y-6" stagger={0.06}>
          {STATS.map((s) => (
            <RevealItem key={s.label}>
              <p className="font-serif text-3xl font-semibold text-navy leading-none">{s.value}</p>
              <p className="mono-label mt-2 text-muted">{s.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mono-label text-muted/70 max-w-[26ch]">
          Figures confirmed by the firm before launch — no placeholder numbers published live.
        </p>
      </div>
    </section>
  );
}
