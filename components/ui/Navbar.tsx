"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "./MagneticButton";

const LINKS = [
  { label: "Accueil", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Histoire", href: "#about" },
  { label: "Expérience", href: "#experience" },
  { label: "Galerie", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-cream/10 bg-noir/70 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#home"
          data-cursor="Home"
          className="font-display text-xl italic tracking-wide text-cream"
        >
          L&apos;Oro Italiano
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-cursor="View"
                className="text-[11px] font-medium uppercase tracking-[0.25em] text-cream/80 transition-colors hover:text-gold-soft"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <MagneticButton>
            <a
              href="#experience"
              data-cursor="Book"
              className="rounded-full border border-gold-soft/70 px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.25em] text-cream transition-colors hover:bg-gold-soft hover:text-noir"
            >
              Réserver une table
            </a>
          </MagneticButton>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="text-cream md:hidden"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 z-40 flex h-dvh flex-col justify-center gap-8 bg-noir px-8 md:hidden"
          >
            {LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.5 }}
                className="font-display text-4xl italic text-cream"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#experience"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * LINKS.length, duration: 0.5 }}
              className="mt-4 w-fit rounded-full border border-gold-soft/70 px-7 py-3 text-xs font-medium uppercase tracking-[0.25em] text-cream"
            >
              Réserver une table
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
