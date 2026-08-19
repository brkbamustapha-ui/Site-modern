"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useExperience } from "@/lib/motion-context";

export function SceneCanvas({
  children,
  cameraPosition = [0, 0.4, 6.5],
  fov = 40,
  className,
}: {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
  className?: string;
}) {
  const { performanceTier } = useExperience();
  const dpr: [number, number] = performanceTier === "low" ? [1, 1] : performanceTier === "medium" ? [1, 1.5] : [1, 2];

  return (
    <Canvas
      className={className}
      dpr={dpr}
      gl={{ antialias: performanceTier !== "low", powerPreference: "high-performance", alpha: true }}
      camera={{ position: cameraPosition, fov }}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
