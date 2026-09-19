"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#firm", label: "Firm" },
  { href: "#expertise", label: "Expertise" },
  { href: "#industries", label: "Industries" },
  { href: "#people", label: "People" },
  { href: "#insights", label: "Insights" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[70] h-[64px] border-b hairline-on-navy bg-navy/92 backdrop-blur-md">
      <div className="wrap flex h-full items-center gap-6">
        <a href="#top" className="font-serif text-[19px] font-semibold text-ivory shrink-0">
          FS <span className="mono-label align-middle text-bronze-light">Advocates</span>
        </a>

        <nav className="ml-auto hidden md:flex items-center gap-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="mono-label text-muted-on-navy transition-colors hover:text-champagne"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4 pl-2">
          <button type="button" className="mono-label text-muted-on-navy hover:text-champagne transition-colors">
            EN <span className="opacity-40">|</span> عربي
          </button>
          <a
            href="#contact"
            className="mono-label inline-flex items-center border border-bronze bg-bronze px-4 py-[10px] text-navy-deep font-bold transition-colors hover:bg-champagne hover:border-champagne"
          >
            Book a Consultation
          </a>
        </div>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto md:hidden text-ivory"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {open ? (
              <path d="M4 4 L18 18 M18 4 L4 18" stroke="currentColor" strokeWidth="1.6" />
            ) : (
              <path d="M2 6h18 M2 11h18 M2 16h18" stroke="currentColor" strokeWidth="1.4" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-x-0 top-[64px] bottom-0 bg-navy border-t hairline-on-navy px-6 py-8 flex flex-col gap-1 overflow-y-auto">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-serif text-2xl text-ivory py-3 border-b hairline-on-navy"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mono-label mt-6 inline-flex items-center justify-center border border-bronze bg-bronze px-5 py-3 text-navy-deep font-bold"
          >
            Book a Consultation
          </a>
        </div>
      )}
    </header>
  );
}
