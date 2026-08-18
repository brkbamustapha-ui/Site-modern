"use client";

import { motion } from "framer-motion";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Curtain reveal for imagery.
 *
 * The content is always painted; only an opaque overlay slides away on top of
 * it. That ordering matters — an animated `clip-path` on the content itself
 * leaves the whole thing invisible if the animation never runs, whereas the
 * worst case here is simply a visible image with no reveal.
 *
 * `scaleY` on the overlay keeps the whole effect on the compositor.
 */
export function ImageReveal({
  children,
  className,
  duration = 1.15,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children}
      {/* `motion-reduce:hidden` retires the curtain for reduced-motion users in
          CSS, which keeps the markup identical between server and client. */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 origin-bottom bg-noir motion-reduce:hidden"
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={viewportOnce}
        transition={{ duration, delay, ease: easeOutExpo }}
      />
    </div>
  );
}
