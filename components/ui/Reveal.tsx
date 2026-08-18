"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, staggerParent, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered reveal. Animates transform + opacity only and fires once.
 *
 * Reduced motion is handled globally by `MotionConfig reducedMotion="user"`
 * (see lib/motion-provider.tsx) rather than by branching here — these
 * components must emit the same markup on the server and on the client's first
 * render, and `useReducedMotion()` disagrees across that boundary.
 */
export function Reveal({
  children,
  className,
  /** Extra delay in seconds, for hand-tuning a cascade. */
  delay = 0,
  variants = fadeUp,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  as?: "div" | "li" | "section" | "article" | "span";
}) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

/**
 * Child of a `RevealGroup`. It declares variants only — `initial`/`animate`
 * are inherited from the group, which is what produces the stagger. Using a
 * plain `Reveal` here instead would give each item its own trigger and the
 * cascade would be lost.
 */
export function RevealItem({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "li" | "article" | "span";
}) {
  const Component = motion[as];

  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  );
}

/** Parent that cascades its `RevealItem` children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  delayChildren = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  as?: "div" | "ul" | "ol" | "section";
}) {
  const Component = motion[as];

  return (
    <Component
      className={cn(className)}
      variants={staggerParent(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </Component>
  );
}
