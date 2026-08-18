"use client";

import { MotionConfig } from "framer-motion";

/**
 * `reducedMotion="user"` makes Framer Motion drop transform and layout
 * animations whenever the OS asks for reduced motion, while leaving gentle
 * opacity fades in place.
 *
 * Doing it here rather than per-component matters for correctness, not just
 * tidiness: `useReducedMotion()` reads matchMedia during the first client
 * render but returns `false` on the server, so branching rendered markup on it
 * produces a hydration mismatch. Configuring it centrally lets every component
 * emit identical markup on both sides.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
