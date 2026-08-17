"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Wheat } from "lucide-react";
import { useExperience } from "@/lib/motion-context";

export function StoryParallaxPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useExperience();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const yBack = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-40, 40]);
  const yFront = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [40, -60]);

  return (
    <div ref={ref} className="relative h-[420px] md:h-[520px]">
      <motion.div
        style={{ y: yBack }}
        className="absolute inset-4 rounded-[2rem] bg-gradient-to-br from-[#4a3418] via-[#241a0c] to-noir"
      />
      <motion.div
        style={{ y: yFront }}
        className="absolute inset-0 flex items-center justify-center rounded-[2.5rem] border border-cream/10 bg-gradient-to-br from-italian-red/25 via-noir-soft to-noir shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]"
      >
        <Wheat size={96} strokeWidth={0.75} className="text-gold-soft/70" />
      </motion.div>
    </div>
  );
}
