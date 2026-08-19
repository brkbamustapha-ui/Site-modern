"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useExperience } from "@/lib/motion-context";

export function MouseParallax({
  children,
  intensity = 0.25,
  position = [0, 0, 0],
}: {
  children: React.ReactNode;
  intensity?: number;
  position?: [number, number, number];
}) {
  const group = useRef<THREE.Group>(null);
  const { prefersReducedMotion, isTouchDevice } = useExperience();
  const t = useRef(0);

  useFrame((state, delta) => {
    if (!group.current) return;
    t.current += delta;

    if (prefersReducedMotion) return;

    if (isTouchDevice) {
      group.current.rotation.y = Math.sin(t.current * 0.3) * 0.08 * intensity * 4;
      group.current.rotation.x = Math.sin(t.current * 0.22) * 0.04 * intensity * 4;
      return;
    }

    const targetY = state.pointer.x * intensity;
    const targetX = -state.pointer.y * intensity * 0.5;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.04);
  });

  return (
    <group ref={group} position={position}>
      {children}
    </group>
  );
}
