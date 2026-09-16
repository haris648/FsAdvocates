"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const HEADLINE_LINE_1 = ["Fareed", "Alhassan"];
const HEADLINE_LINE_2 = ["Advocates", "&", "Legal", "Consultants"];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.3 },
  },
};

const word = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-1/3 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(182,146,79,0.16) 0%, rgba(182,146,79,0) 70%)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-20%] right-[10%] h-[55vh] w-[55vh] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(92,15,24,0.35) 0%, rgba(92,15,24,0) 70%)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <div className="noise-overlay" />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="eyebrow relative z-10 mb-8"
      >
        United Arab Emirates &mdash; Est. Legal Practice
      </motion.p>

      <h1 className="relative z-10 font-serif font-medium leading-[0.98] text-ivory">
        <motion.span
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-wrap justify-center gap-x-4 overflow-hidden text-[12vw] md:text-[6.4vw]"
        >
          {HEADLINE_LINE_1.map((w) => (
            <span key={w} className="overflow-hidden py-1">
              <motion.span variants={word} className="inline-block">
                {w}
              </motion.span>
            </span>
          ))}
        </motion.span>
        <motion.span
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-1 flex flex-wrap justify-center gap-x-4 overflow-hidden text-[7vw] italic text-gold-soft md:text-[3.1vw]"
        >
          {HEADLINE_LINE_2.map((w) => (
            <span key={w} className="overflow-hidden py-1">
              <motion.span variants={word} className="inline-block">
                {w}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.2 }}
        className="text-balance relative z-10 mx-auto mt-10 max-w-xl text-base font-light text-ivory-dim md:text-lg"
      >
        Distinguished counsel for individuals, businesses, and institutions
        across the UAE &mdash; where precedent meets discretion, and every
        matter is argued with the full weight of the firm behind it.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.4 }}
        className="relative z-10 mt-12"
      >
        <MagneticButton href="#contact">Book a Consultation</MagneticButton>
      </motion.div>

      <motion.div
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="eyebrow !text-[0.62rem] !tracking-[0.28em]">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-ivory-dim/25">
          <motion.span
            className="absolute left-0 top-0 h-1/2 w-full bg-gold-soft"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
