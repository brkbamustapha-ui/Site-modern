"use client";

import { motion } from "framer-motion";
import { useExperience } from "@/lib/motion-context";

export function ScrollIndicator() {
  const { prefersReducedMotion } = useExperience();

  return (
    <div className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-white/70">
      <span className="text-[10px] font-medium uppercase tracking-[0.35em]">Scroll</span>
      <motion.div
        className="h-12 w-px bg-gradient-to-b from-accent-soft to-transparent"
        animate={prefersReducedMotion ? undefined : { scaleY: [0.3, 1, 0.3] }}
        style={{ transformOrigin: "top" }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
