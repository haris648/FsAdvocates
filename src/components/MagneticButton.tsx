"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
};

export default function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  variant = "solid",
}: MagneticButtonProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setPos({ x: relX * 0.35, y: relY * 0.35 });
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 });
  }

  const base =
    "relative inline-flex items-center justify-center gap-3 rounded-full px-9 py-4 text-sm tracking-[0.08em] uppercase font-medium transition-colors duration-300";
  const styles =
    variant === "solid"
      ? "bg-gold text-ink hover:bg-gold-soft"
      : "border border-ivory-dim/60 text-ivory hover:border-gold hover:text-gold-soft";

  return (
    <motion.span
      className="inline-block"
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.4 }}
    >
      {href ? (
        <motion.a
          ref={anchorRef}
          href={href}
          onClick={onClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileTap={{ scale: 0.94 }}
          className={`${base} ${styles} ${className}`}
        >
          {children}
        </motion.a>
      ) : (
        <motion.button
          ref={buttonRef}
          type="button"
          onClick={onClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileTap={{ scale: 0.94 }}
          className={`${base} ${styles} ${className}`}
        >
          {children}
        </motion.button>
      )}
    </motion.span>
  );
}
