"use client";

import { createElement } from "react";
import { motion, type Variants } from "framer-motion";
import { useExperience } from "@/lib/motion-context";
import { useRevealOnce } from "@/lib/use-reveal";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  visible: {},
};

const word: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

// motion's tag proxy resolves any string key to a motion-wrapped element at runtime.
const motionTags = motion as unknown as Record<string, React.ComponentType<Record<string, unknown>>>;

export function RevealText({
  children,
  as = "div",
  className,
  delay = 0,
  stagger = 0.045,
}: {
  children: string;
  as?: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const { prefersReducedMotion } = useExperience();
  const { ref, inView } = useRevealOnce<HTMLElement>();
  const words = children.split(" ");

  if (prefersReducedMotion) {
    return createElement(as, { className }, children);
  }

  const MotionTag = motionTags[as] ?? motion.div;

  return (
    <MotionTag
      ref={ref}
      className={cn("flex flex-wrap", className)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={container}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} className="mr-[0.28em] overflow-hidden">
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
