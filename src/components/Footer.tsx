const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Practice Areas", href: "#practice-areas" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

// [DEMO PLACEHOLDER] contact details and social links are illustrative;
// replace with the firm's verified information before the real build.
export default function Footer() {
  return (
    <footer className="relative border-t hairline bg-ink px-6 pb-8 pt-20 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <p className="font-serif text-2xl text-ivory">
            Fareed Alhassan <span className="text-gold-soft">&amp;</span>
            <br />
            Legal Consultants
          </p>
          <p className="mt-5 text-sm font-light leading-relaxed text-ivory-dim">
            Comprehensive legal services for individuals, businesses, and
            institutions across the United Arab Emirates.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
          <div>
            <p className="eyebrow mb-5">Navigate</p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-light text-ivory-dim transition-colors hover:text-gold-soft"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Contact</p>
            <ul className="space-y-3 text-sm font-light text-ivory-dim">
              <li>Dubai, United Arab Emirates</li>
              <li>+971 (0) 4 000 0000</li>
              <li>consultation@fareedalhassan.ae</li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Follow</p>
            <ul className="space-y-3 text-sm font-light text-ivory-dim">
              <li>
                <a href="#" className="transition-colors hover:text-gold-soft">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-gold-soft">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 flex max-w-6xl flex-col items-center justify-between gap-4 border-t hairline pt-6 text-xs font-light text-ivory-dim/70 md:flex-row">
        <span>
          &copy; {new Date().getFullYear()} Fareed Alhassan Advocates and
          Legal Consultants. All rights reserved.
        </span>
        <span className="text-ivory-dim/50">
          Demo concept by Canary Digital Media
        </span>
      </div>
    </footer>
  );
}
