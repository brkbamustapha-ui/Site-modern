"use client";

import { useEffect } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";

/**
 * Returns a factor of 1 (parallax on) or 0 (parallax off) as a MotionValue.
 *
 * It is a motion value rather than state on purpose: it starts at 1 so the
 * server and the client's first render produce identical markup, then an
 * effect zeroes it for reduced-motion users. Reading `useReducedMotion()`
 * during render would change the emitted `style` between server and client and
 * break hydration; writing a motion value after mount does not re-render at
 * all, so there is nothing to mismatch.
 */
export function useParallaxFactor(): MotionValue<number> {
  const factor = useMotionValue(1);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => factor.set(query.matches ? 0 : 1);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [factor]);

  return factor;
}
