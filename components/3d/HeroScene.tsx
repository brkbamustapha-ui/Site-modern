"use client";

import { SceneCanvas } from "./SceneCanvas";
import { Lighting } from "./Lighting";
import { MarbleTable } from "./MarbleTable";
import { PastaDish } from "./PastaDish";
import { WineBottle, WineGlass } from "./WineBottle";
import { Fork, Knife } from "./Cutlery";
import { MouseParallax } from "./MouseParallax";
import { CameraController } from "./CameraController";
import { FloatingObjects } from "./FloatingObjects";
import { Particles } from "./Particles";
import { useExperience } from "@/lib/motion-context";

export default function HeroScene() {
  const { performanceTier } = useExperience();

  return (
    <SceneCanvas cameraPosition={[0, 1.5, 5]} fov={38} className="pointer-events-none">
      <Lighting variant="hero" />
      <CameraController basePosition={[0, 1.5, 5]} intensity={0.6} lookAt={[0, 0.1, 0]} />
      <MarbleTable radius={6} segments={performanceTier === "low" ? 24 : 64} />
      <MouseParallax intensity={0.28}>
        <group position={[0, -0.4, 0]}>
          <PastaDish detail={performanceTier} scale={1.35} />
          <WineBottle position={[1.7, -0.05, -0.7]} rotation={[0, 0.3, 0]} />
          <WineGlass position={[-1.8, -0.05, -0.35]} />
          <Fork position={[-1.15, 0.02, 1]} rotation={[Math.PI / 2, 0, 0.3]} />
          <Knife position={[1.2, 0.02, 1]} rotation={[Math.PI / 2, 0, -0.3]} />
        </group>
      </MouseParallax>
      <FloatingObjects detail={performanceTier} />
      <Particles detail={performanceTier} />
    </SceneCanvas>
  );
}
