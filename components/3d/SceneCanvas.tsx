"use client";

import { Suspense, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useExperience } from "@/lib/motion-context";
import { SceneBoundary, isWebGLAvailable } from "./SceneBoundary";
import { SceneFallback } from "./SceneFallback";

// WebGL support never changes at runtime, so there is nothing to subscribe to.
const subscribeNoop = () => () => {};

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
  const { performanceTier, tierResolved } = useExperience();

  // Server renders the fallback; the client swaps in the real answer on mount.
  const webglOk = useSyncExternalStore(subscribeNoop, isWebGLAvailable, () => false);

  // Hold the canvas back until we know both the device tier and whether WebGL
  // works, so a low-end device never renders a frame at full quality first.
  if (!tierResolved || !webglOk) return <SceneFallback />;

  const dpr: [number, number] =
    performanceTier === "low" ? [1, 1] : performanceTier === "medium" ? [1, 1.5] : [1, 2];
  const shadows = performanceTier !== "low";

  return (
    <SceneBoundary>
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
    </SceneBoundary>
  );
}
