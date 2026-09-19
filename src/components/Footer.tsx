import { SpreadWordmark } from "./SpreadWordmark";

const COLUMNS = [
  {
    title: "Firm",
    links: ["About FS", "Values", "Why Us", "Careers"],
  },
  {
    title: "Expertise",
    links: ["Disputes", "Arbitration", "Corporate", "Real Estate", "Employment", "Private Client"],
  },
  {
    title: "Resources",
    links: ["Insights", "Book a Consultation", "Privacy Policy", "Terms"],
  },
];

export function Footer() {
  return (
    <footer className="overflow-clip bg-ivory-2 pt-[clamp(56px,9vh,110px)]">
      <div className="wrap">
        <div className="grid gap-10 border-b border-line pb-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <p className="font-serif text-xl font-semibold text-navy">FS Advocates</p>
            <p className="body-copy mt-3 max-w-[30ch] text-muted">
              UAE counsel with a commercial perspective. Dubai, United Arab Emirates.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="mono-label font-bold text-bronze">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="mono-label text-muted hover:text-navy transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 py-6 border-b border-line">
          <span className="mono-label text-muted">© {new Date().getFullYear()} FS Advocates &amp; Legal Consultants</span>
          <span className="mono-label text-muted">Dubai, UAE</span>
          <span className="mono-label text-muted ml-auto max-w-[46ch]">
            This website provides general information only and does not constitute legal advice.
            Contacting the firm does not create a lawyer-client relationship.
          </span>
        </div>
      </div>

      <div className="pt-3 pb-2">
        <SpreadWordmark variant="footer" />
      </div>
    </footer>
  );
}
