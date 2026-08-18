"use client";

import { createContext, useContext, useEffect, useState } from "react";

/**
 * Rendering budget for the 3D scene.
 *  ultra  — desktop with a real GPU: full geometry, shadows, particles
 *  high   — capable laptop: shadows, fewer particles
 *  low    — phones / weak hardware: no shadows, minimal geometry
 *  none   — no WebGL, reduced motion, or data-saver: static backdrop only
 */
export type QualityTier = "ultra" | "high" | "low" | "none";

export type DeviceState = {
  /** null while detection is still pending on the client. */
  tier: QualityTier | null;
  prefersReducedMotion: boolean;
  isTouch: boolean;
  isCoarsePointer: boolean;
  /** True once the client-side capability probe has run. */
  ready: boolean;
};

const DeviceContext = createContext<DeviceState>({
  tier: null,
  prefersReducedMotion: false,
  isTouch: false,
  isCoarsePointer: false,
  ready: false,
});

/**
 * Probes for a real WebGL context. Some browsers expose the constructor but
 * fail to create a context (blocklisted driver, headless, GPU crash), so we
 * actually create one — and release it immediately to avoid holding a slot.
 */
function hasWebGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ||
      canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;
    // Free the context straight away; we only wanted to know it works.
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

function detectTier(prefersReducedMotion: boolean): QualityTier {
  if (typeof window === "undefined") return "none";
  if (prefersReducedMotion) return "none";
  if (!hasWebGL()) return "none";

  const nav = navigator as NavigatorWithHints;

  // Respect an explicit data-saver request — 3D is pure decoration.
  if (nav.connection?.saveData) return "none";
  if (nav.connection?.effectiveType === "2g" || nav.connection?.effectiveType === "slow-2g") {
    return "none";
  }

  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const width = window.innerWidth;

  // Anything obviously weak drops straight to the cheapest scene.
  if (cores <= 2 || memory <= 2) return "low";
  // Phones and tablets get the light scene regardless of core count —
  // thermal throttling matters more than raw benchmarks here.
  if (coarse || width < 900) return "low";
  if (cores <= 4 || memory <= 4) return "high";
  return "ultra";
}

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DeviceState>({
    tier: null,
    prefersReducedMotion: false,
    isTouch: false,
    isCoarsePointer: false,
    ready: false,
  });

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarseQuery = window.matchMedia("(pointer: coarse)");
    const hoverQuery = window.matchMedia("(hover: none)");

    const sync = () => {
      const reduced = motionQuery.matches;
      setState({
        tier: detectTier(reduced),
        prefersReducedMotion: reduced,
        isTouch: hoverQuery.matches || coarseQuery.matches,
        isCoarsePointer: coarseQuery.matches,
        ready: true,
      });
    };

    sync();
    motionQuery.addEventListener("change", sync);
    coarseQuery.addEventListener("change", sync);
    hoverQuery.addEventListener("change", sync);

    return () => {
      motionQuery.removeEventListener("change", sync);
      coarseQuery.removeEventListener("change", sync);
      hoverQuery.removeEventListener("change", sync);
    };
  }, []);

  return <DeviceContext.Provider value={state}>{children}</DeviceContext.Provider>;
}

export function useDevice() {
  return useContext(DeviceContext);
}

/** Per-tier 3D budget. Keeping it in one place makes the cost auditable. */
export const qualitySettings = {
  ultra: {
    dpr: [1, 1.9] as [number, number],
    shadows: true,
    particles: 70,
    envResolution: 256,
    windowRows: 7,
    antialias: true,
  },
  high: {
    dpr: [1, 1.5] as [number, number],
    shadows: true,
    particles: 36,
    envResolution: 128,
    windowRows: 5,
    antialias: true,
  },
  low: {
    dpr: [1, 1.35] as [number, number],
    shadows: false,
    particles: 14,
    envResolution: 64,
    windowRows: 4,
    antialias: false,
  },
} as const;

export type QualitySettings = (typeof qualitySettings)[keyof typeof qualitySettings];
