"use client";

import { Suspense, useCallback } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Preload } from "@react-three/drei";
import { qualitySettings, type QualityTier } from "@/lib/device";
import { Villa } from "./Villa";
import { Cliff, Particles, Water } from "./Environmental";
import { CameraRig } from "./CameraRig";
import { Lighting } from "./Lighting";

export type HeroSceneProps = {
  /** Never "none" here — the parent renders the static backdrop instead. */
  tier: Exclude<QualityTier, "none">;
  /** Pauses the render loop when the hero is off-screen or the tab is hidden. */
  active: boolean;
  enableParallax: boolean;
  reducedMotion: boolean;
  onReady: () => void;
  onFailure: () => void;
};

export default function HeroScene({
  tier,
  active,
  enableParallax,
  reducedMotion,
  onReady,
  onFailure,
}: HeroSceneProps) {
  const quality = qualitySettings[tier];

  const handleCreated = useCallback(
    ({ gl }: { gl: THREE.WebGLRenderer }) => {
      gl.toneMapping = THREE.ACESFilmicToneMapping;
      gl.toneMappingExposure = 1.05;

      // A lost context (driver reset, tab suspended too long, GPU OOM) must
      // surface as a graceful fallback, not a black rectangle.
      const canvas = gl.domElement;
      const onLost = (event: Event) => {
        event.preventDefault();
        onFailure();
      };
      canvas.addEventListener("webglcontextlost", onLost);

      onReady();
    },
    [onReady, onFailure]
  );

  return (
    <Canvas
      // Pausing the loop is the single biggest battery win on mobile.
      frameloop={active ? "always" : "never"}
      shadows={quality.shadows}
      dpr={quality.dpr}
      gl={{
        antialias: quality.antialias,
        alpha: true,
        powerPreference: "high-performance",
        // The hero is decorative; losing it is better than crashing the tab.
        failIfMajorPerformanceCaveat: false,
      }}
      camera={{ position: [0, 2.6, 12], fov: 38, near: 0.5, far: 90 }}
      onCreated={handleCreated}
      // R3F only needs pointer coordinates here — no raycasting against meshes.
      events={undefined}
      className="!absolute inset-0"
    >
      {/* Fog dissolves the far rocks into the page background colour. */}
      <fog attach="fog" args={["#07080b", 14, 42]} />

      <Suspense fallback={null}>
        <Lighting quality={quality} />
        <Villa quality={quality} />
        <Cliff quality={quality} />
        <Water quality={quality} reflective={tier === "ultra"} />
        {quality.particles > 0 ? <Particles count={quality.particles} /> : null}
        <Preload all />
      </Suspense>

      <CameraRig enableParallax={enableParallax} reducedMotion={reducedMotion} />
      {/* Drops resolution automatically if the frame budget slips. */}
      <AdaptiveDpr pixelated={false} />
    </Canvas>
  );
}
