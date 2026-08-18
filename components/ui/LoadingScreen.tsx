"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import { site } from "@/data/site";

/**
 * Brand curtain shown on first paint.
 *
 * Hard rules it obeys:
 *  - it dismisses on a timer, never on the 3D scene being ready, so a slow or
 *    failed WebGL init can't strand the visitor behind it;
 *  - it self-destructs after the exit transition, so it can never trap focus
 *    or intercept pointer events;
 *  - reduced motion removes it in CSS (`motion-reduce:hidden`) rather than by
 *    branching in JS — the markup has to match what the server rendered, and
 *    `useReducedMotion()` disagrees across that boundary.
 */
export function LoadingScreen() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Short and fixed. The page underneath is already interactive.
    const timer = window.setTimeout(() => setDismissed(true), 1750);

    // Escape hatch — never hold someone hostage behind a splash screen.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDismissed(true);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    // The curtain is display:none for reduced-motion visitors, so locking their
    // scroll would freeze a page they can already see.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.style.overflow = dismissed ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [dismissed]);

  return (
    <AnimatePresence>
      {dismissed ? null : (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-noir motion-reduce:hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.75, ease: easeOutExpo } }}
          role="status"
          aria-live="polite"
          aria-label="Chargement du site BMS Agency"
        >
          {/* Faint radial warmth so the black isn't dead flat */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_50%,rgba(198,161,91,0.10),transparent_70%)]"
          />

          <div className="relative flex flex-col items-center gap-7 px-6">
            <motion.p
              className="wordmark text-center font-sans text-[clamp(1.4rem,5vw,2.4rem)] text-chalk"
              initial={{ opacity: 0, y: 14, letterSpacing: "0.55em" }}
              animate={{
                opacity: 1,
                y: 0,
                letterSpacing: "0.3em",
                transition: { duration: 1.1, ease: easeOutExpo },
              }}
            >
              {site.name}
            </motion.p>

            {/* Progress hairline — a fixed, honest 1.4s sweep. */}
            <div className="h-px w-40 overflow-hidden bg-[color-mix(in_srgb,var(--color-steel)_22%,transparent)] sm:w-56">
              <motion.div
                className="h-full w-full origin-left bg-gradient-to-r from-gold-deep via-gold-light to-gold"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1, transition: { duration: 1.4, ease: easeOutExpo } }}
              />
            </div>

            <motion.p
              className="text-[0.62rem] uppercase tracking-[0.34em] text-steel-dim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.35, duration: 0.8 } }}
            >
              {site.tagline}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
