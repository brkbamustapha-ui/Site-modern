"use client";

import { Environment, Lightformer } from "@react-three/drei";
import type { QualitySettings } from "@/lib/device";

/**
 * Lighting is a warm low key from the right and a cool fill from the left —
 * the classic dusk architectural photograph.
 *
 * The environment map is generated in-scene from lightformers (`frames={1}`
 * renders it exactly once), so the reflections cost one render at startup and
 * nothing after that. Crucially it also means no HDRI is downloaded from a
 * CDN, which keeps the hero working offline and off the critical path.
 */
export function Lighting({ quality }: { quality: QualitySettings }) {
  return (
    <>
      <ambientLight intensity={0.45} color="#6b768c" />

      {/* Key: warm, low, casts the long shadows across the slabs. Kept modest
          so the concrete stays concrete instead of turning tan under ACES. */}
      <directionalLight
        position={[6.5, 5.2, 4.5]}
        intensity={1.5}
        color="#ffe0c2"
        castShadow={quality.shadows}
        shadow-mapSize-width={quality.shadows ? 1024 : 256}
        shadow-mapSize-height={quality.shadows ? 1024 : 256}
        shadow-camera-near={1}
        shadow-camera-far={32}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-bias={-0.0012}
        shadow-normalBias={0.02}
      />

      {/* Cool fill from the sea side, keeps the shadow faces from going black. */}
      <directionalLight position={[-7, 3.4, -3]} intensity={1.15} color="#8fb0d8" />

      {/* Rim along the top edge of the stack. */}
      <directionalLight position={[-1.5, 7, -6]} intensity={0.6} color="#cfe0ff" />

      <Environment frames={1} resolution={quality.envResolution}>
        {/* Sky dome */}
        <Lightformer
          form="rect"
          intensity={0.7}
          color="#4a5b7a"
          position={[0, 8, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[24, 24, 1]}
        />
        {/* Warm sun card — what the glass and gold actually reflect. */}
        <Lightformer
          form="circle"
          intensity={5.5}
          color="#ffc078"
          position={[9, 4, 6]}
          scale={[7, 7, 1]}
          target={[0, 0, 0]}
        />
        {/* Cool horizon band */}
        <Lightformer
          form="rect"
          intensity={1.1}
          color="#20304d"
          position={[-11, 1.5, -4]}
          scale={[16, 5, 1]}
          target={[0, 0, 0]}
        />
        {/* Ground bounce */}
        <Lightformer
          form="rect"
          intensity={0.35}
          color="#1a1d26"
          position={[0, -6, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[20, 20, 1]}
        />
      </Environment>
    </>
  );
}
