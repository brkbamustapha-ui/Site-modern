"use client";

import { motion } from "framer-motion";
import { useExperience } from "@/lib/motion-context";
import { useRevealOnce } from "@/lib/use-reveal";
import { cn } from "@/lib/utils";

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 32,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const { prefersReducedMotion } = useExperience();
  const { ref, inView } = useRevealOnce<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y }}
      animate={inView || prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
