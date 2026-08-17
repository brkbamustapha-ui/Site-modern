"use client";

import type { RefObject } from "react";
import { SceneCanvas } from "./SceneCanvas";
import { Lighting } from "./Lighting";
import { MarbleTable } from "./MarbleTable";
import { PastaDish } from "./PastaDish";
import { WineBottle, WineGlass } from "./WineBottle";
import { Fork, Knife, Candle } from "./Cutlery";
import { CameraController } from "./CameraController";
import { Particles } from "./Particles";
import { useExperience } from "@/lib/motion-context";

export default function TableScene({ progressRef }: { progressRef: RefObject<number> }) {
  const { performanceTier } = useExperience();

  return (
    <SceneCanvas cameraPosition={[0, 1.8, 5.6]} fov={40}>
      <Lighting variant="table" />
      <CameraController
        basePosition={[0, 1.7, 5.6]}
        intensity={0.35}
        lookAt={[0, 0.15, 0]}
        scrollProgress={progressRef}
      />
      <MarbleTable radius={6.5} segments={performanceTier === "low" ? 24 : 64} />

      <group position={[0, -0.4, 0]}>
        <PastaDish detail={performanceTier} scale={1.2} />
        <WineBottle position={[1.9, -0.05, -0.9]} rotation={[0, -0.4, 0]} />
        <WineGlass position={[-2, -0.05, -0.5]} />
        <WineGlass position={[2, -0.05, 0.9]} />
        <Fork position={[-1.2, 0.02, 1]} rotation={[Math.PI / 2, 0, 0.3]} />
        <Knife position={[1.25, 0.02, 1]} rotation={[Math.PI / 2, 0, -0.3]} />
        <Candle position={[0, 0, -1.6]} />
      </group>

      <Particles detail={performanceTier} />
    </SceneCanvas>
  );
}
