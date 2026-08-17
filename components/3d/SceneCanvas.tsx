"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useExperience } from "@/lib/motion-context";

export function SceneCanvas({
  children,
  cameraPosition = [0, 1.6, 5.2],
  fov = 42,
  className,
}: {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
  className?: string;
}) {
  const { performanceTier } = useExperience();
  const dpr: [number, number] = performanceTier === "low" ? [1, 1] : performanceTier === "medium" ? [1, 1.5] : [1, 2];
  const shadows = performanceTier !== "low";

  return (
    <Canvas
      className={className}
      shadows={shadows}
      dpr={dpr}
      gl={{ antialias: performanceTier !== "low", powerPreference: "high-performance", alpha: true }}
      camera={{ position: cameraPosition, fov }}
    >
      <Suspense fallback={null}>
        {children}
        {shadows && (
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.55}
            scale={12}
            blur={2.4}
            far={2}
            color="#0a0806"
          />
        )}
      </Suspense>
    </Canvas>
  );
}
