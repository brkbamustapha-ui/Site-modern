"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const sectionIds = navLinks.map((link) => link.href.replace("#", ""));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("accueil");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* --- Compact on scroll ------------------------------------------ */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* --- Scroll spy -------------------------------------------------- */
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that is visible.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* --- Mobile panel: scroll lock, Escape, focus return -------------- */
  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);

    // Move focus into the panel so keyboard users land in the menu.
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500",
          "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
          "border-b",
          scrolled
            ? "border-[color-mix(in_srgb,var(--color-steel)_14%,transparent)] bg-noir/72 backdrop-blur-xl backdrop-saturate-150 shadow-[0_1px_30px_-16px_rgba(0,0,0,0.9)]"
            : "border-transparent bg-transparent"
        )}
      >
        <nav
          aria-label="Navigation principale"
          className={cn(
            "mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4",
            "px-5 transition-[padding] duration-500 sm:px-8 lg:px-12",
            scrolled ? "py-3.5" : "py-5 sm:py-7"
          )}
        >
          {/* Wordmark */}
          <a
            href="#accueil"
            data-cursor="hover"
            aria-label={`${site.name} — retour à l'accueil`}
            className={cn(
              "wordmark shrink-0 font-sans text-chalk transition-[font-size,letter-spacing] duration-500",
              scrolled ? "text-[0.78rem] sm:text-[0.85rem]" : "text-[0.85rem] sm:text-[0.95rem]"
            )}
          >
            {site.name}
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeId === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-cursor="hover"
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group relative block px-3.5 py-2 text-[0.78rem] font-medium tracking-[0.06em]",
                      "transition-colors duration-400",
                      isActive ? "text-gold-light" : "text-offwhite/75 hover:text-offwhite"
                    )}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-gold",
                        "transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2.5">
            <ButtonLink
              href="#proprietes"
              variant="gold"
              size="md"
              className="hidden sm:inline-flex"
            >
              Voir les propriétés
            </ButtonLink>

            {/* Hamburger */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              data-cursor="hover"
              className="inline-flex size-11 items-center justify-center rounded-full
                border border-[color-mix(in_srgb,var(--color-steel)_24%,transparent)]
                text-offwhite transition-colors duration-400
                hover:border-gold hover:text-gold-light lg:hidden"
            >
              {open ? (
                <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Menu className="size-5" strokeWidth={1.5} aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* ---- Mobile panel ------------------------------------------- */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-mobile"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            // Fully opaque: at 97% the hero's oversized headline ghosted
            // through the panel and read as a rendering artefact.
            className="fixed inset-0 z-40 flex flex-col bg-noir lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4, ease: easeOutExpo } }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: easeOutExpo } }}
          >
            <div className="flex flex-1 flex-col justify-center gap-2 px-7 pb-16 pt-28 sm:px-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="group flex items-baseline gap-4 border-b
                    border-[color-mix(in_srgb,var(--color-steel)_12%,transparent)]
                    py-4 font-display text-[clamp(1.8rem,9vw,2.9rem)] font-light
                    leading-none text-chalk transition-colors duration-300
                    active:text-gold-light"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.12 + i * 0.06, duration: 0.6, ease: easeOutExpo },
                  }}
                >
                  <span className="text-[0.6rem] font-sans tracking-[0.24em] text-gold">
                    0{i + 1}
                  </span>
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                className="mt-9"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.46, duration: 0.6, ease: easeOutExpo } }}
              >
                <ButtonLink href="#proprietes" onClick={close} variant="gold" size="lg" className="w-full">
                  Voir les propriétés
                </ButtonLink>
                <p className="mt-7 text-[0.66rem] uppercase tracking-[0.3em] text-steel-dim">
                  {site.tagline}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
