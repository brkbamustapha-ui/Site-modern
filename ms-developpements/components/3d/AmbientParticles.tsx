"use client";

import { Sparkles } from "@react-three/drei";
import { useExperience } from "@/lib/motion-context";

type Detail = "high" | "medium" | "low";

const COUNTS: Record<Detail, number> = { high: 70, medium: 32, low: 0 };

export function AmbientParticles({ detail = "high" }: { detail?: Detail }) {
  const { prefersReducedMotion } = useExperience();
  const count = COUNTS[detail];
  if (count === 0 || prefersReducedMotion) return null;

  return (
    <Sparkles count={count} speed={0.2} opacity={0.5} scale={[10, 6, 8]} size={1.8} color="#a78bfa" noise={1} />
  );
}
