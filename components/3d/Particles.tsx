"use client";

import { Sparkles } from "@react-three/drei";
import { useExperience } from "@/lib/motion-context";

type Detail = "high" | "medium" | "low";

const COUNTS: Record<Detail, number> = { high: 90, medium: 45, low: 0 };

export function Particles({ detail = "high" }: { detail?: Detail }) {
  const { prefersReducedMotion } = useExperience();
  const count = COUNTS[detail];
  if (count === 0 || prefersReducedMotion) return null;

  return (
    <Sparkles
      count={count}
      speed={0.25}
      opacity={0.55}
      scale={[9, 5, 9]}
      size={2.4}
      color="#c7ab77"
      noise={1}
    />
  );
}
