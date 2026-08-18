"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useExperience } from "@/lib/motion-context";

const SESSION_KEY = "oro-italiano-intro-seen";

export function IntroSequence() {
  const { prefersReducedMotion } = useExperience();
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(SESSION_KEY);

    // One-time client capability check on mount — not a store subscription.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
    if (seen) return;

    setVisible(true);
    document.body.style.overflow = "hidden";

    const duration = prefersReducedMotion ? 700 : 2600;
    const timer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      sessionStorage.setItem(SESSION_KEY, "1");
    }, duration);

    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  if (!ready) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-noir"
          aria-hidden="true"
        >
          {!prefersReducedMotion && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.55, 0.2], scale: [0.6, 1.6, 2.2] }}
              transition={{ duration: 2.2, times: [0, 0.45, 1], ease: "easeOut" }}
              className="pointer-events-none absolute h-[60vmin] w-[60vmin] rounded-full bg-gold-soft/40 blur-[80px]"
            />
          )}

          <div className="relative flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 h-px w-16 origin-center bg-gold-soft/70"
            />

            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.6em", filter: "blur(6px)" }}
              animate={{ opacity: 1, letterSpacing: "0.35em", filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, delay: prefersReducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl italic text-cream sm:text-5xl md:text-6xl"
            >
              L&apos;Oro Italiano
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: prefersReducedMotion ? 0.1 : 1.3, ease: "easeOut" }}
              className="mt-5 text-[10px] font-medium uppercase tracking-[0.5em] text-gold-soft/80"
            >
              Ristorante Italiano di Lusso
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
