"use client";

import { SceneCanvas } from "./SceneCanvas";
import { Lighting } from "./Lighting";
import { CameraController } from "./CameraController";
import { MouseParallax } from "./MouseParallax";
import { InterfacePanels } from "./InterfacePanels";
import { AmbientParticles } from "./AmbientParticles";
import { useExperience } from "@/lib/motion-context";

export default function HeroScene() {
  const { performanceTier } = useExperience();

  return (
    <SceneCanvas cameraPosition={[0, 0.3, 6.5]} fov={38} className="pointer-events-none">
      <Lighting />
      <CameraController basePosition={[0, 0.3, 6.5]} intensity={0.5} />
      <MouseParallax intensity={0.22}>
        <InterfacePanels detail={performanceTier} />
      </MouseParallax>
      <AmbientParticles detail={performanceTier} />
    </SceneCanvas>
  );
}
