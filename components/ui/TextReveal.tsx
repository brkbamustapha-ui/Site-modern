"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { staggerParent, viewportOnce, wordReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Reveals a headline word by word. Each word sits in its own overflow-hidden
 * box so the motion reads as type rising into place rather than a plain fade.
 *
 * The word structure is rendered unconditionally — including for reduced-motion
 * users, whose transforms are neutralised globally by `MotionConfig` — because
 * swapping in plain text on the client would break hydration. `aria-label` on
 * the wrapper plus `aria-hidden` on the pieces keeps it a single string to
 * assistive tech either way.
 */
export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
  /** Play on mount instead of waiting for the viewport (used in the hero). */
  immediate = false,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const words = text.split(" ");

  const animateProps = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: viewportOnce };

  return (
    <motion.span
      className={cn("inline-block", className)}
      variants={staggerParent(stagger, delay)}
      initial="hidden"
      {...animateProps}
      aria-label={text}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {/* pb/-mb pair keeps descenders from being clipped by overflow-hidden. */}
          <span
            className="inline-block overflow-hidden pb-[0.16em] -mb-[0.16em] align-bottom"
            aria-hidden="true"
          >
            <motion.span className={cn("inline-block", wordClassName)} variants={wordReveal}>
              {word}
            </motion.span>
          </span>
          {/* Real whitespace node so words keep normal spacing and can wrap. */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}
