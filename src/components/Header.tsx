"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Practice Areas", href: "#practice-areas" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-4 bg-gradient-to-b from-ink/80 to-transparent px-5 py-5 md:px-10 md:py-7">
      <a
        href="#top"
        className="shrink-0 whitespace-nowrap font-serif text-xs tracking-[0.14em] uppercase text-ivory sm:text-sm lg:text-base"
      >
        F. Alhassan <span className="text-gold-soft">&amp;</span> Legal
      </a>

      <nav className="hidden items-center gap-6 lg:flex xl:gap-9">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="eyebrow whitespace-nowrap text-ivory-dim hover:text-gold-soft transition-colors"
          >
            {link.label}
          </a>
        ))}
        <MagneticButton href="#contact" className="!px-6 !py-3 !text-xs whitespace-nowrap">
          Book a Consultation
        </MagneticButton>
      </nav>

      <button
        aria-label="Toggle menu"
        className="lg:hidden relative z-50 h-9 w-9 shrink-0 flex flex-col items-center justify-center gap-1.5"
        onClick={() => setOpen((v) => !v)}
      >
        <motion.span
          animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          className="block h-[2px] w-6 rounded-full bg-ivory"
        />
        <motion.span
          animate={open ? { opacity: 0 } : { opacity: 1 }}
          className="block h-[2px] w-6 rounded-full bg-ivory"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          className="block h-[2px] w-6 rounded-full bg-ivory"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="lg:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-ink"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="font-serif text-3xl text-ivory"
              >
                {link.label}
              </motion.a>
            ))}
            <MagneticButton href="#contact" onClick={() => setOpen(false)}>
              Book a Consultation
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
