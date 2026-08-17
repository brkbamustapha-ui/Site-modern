"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type PerformanceTier = "high" | "medium" | "low";

type ExperienceContextValue = {
  prefersReducedMotion: boolean;
  isTouchDevice: boolean;
  performanceTier: PerformanceTier;
  /** False until client-side capability detection has run. */
  tierResolved: boolean;
};

const ExperienceContext = createContext<ExperienceContextValue>({
  prefersReducedMotion: false,
  isTouchDevice: false,
  performanceTier: "high",
  tierResolved: false,
});

function detectPerformanceTier(): PerformanceTier {
  if (typeof navigator === "undefined") return "high";

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const isSmallViewport = typeof window !== "undefined" && window.innerWidth < 768;

  if (cores <= 2 || memory <= 2) return "low";
  if (cores <= 4 || memory <= 4 || isSmallViewport) return "medium";
  return "high";
}

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [performanceTier, setPerformanceTier] = useState<PerformanceTier>("high");
  const [tierResolved, setTierResolved] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setPrefersReducedMotion(motionQuery.matches);
    updateMotion();
    motionQuery.addEventListener("change", updateMotion);

    // One-time client capability detection on mount — not a store subscription.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTouchDevice(window.matchMedia("(hover: none), (pointer: coarse)").matches);
    setPerformanceTier(detectPerformanceTier());
    setTierResolved(true);

    return () => motionQuery.removeEventListener("change", updateMotion);
  }, []);

  const value = useMemo(
    () => ({ prefersReducedMotion, isTouchDevice, performanceTier, tierResolved }),
    [prefersReducedMotion, isTouchDevice, performanceTier, tierResolved]
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience() {
  return useContext(ExperienceContext);
}
