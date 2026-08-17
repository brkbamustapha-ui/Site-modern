"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useExperience } from "@/lib/motion-context";

/**
 * Subtle camera drift that follows the pointer. On touch devices it falls
 * back to a slow autonomous sway instead of tracking touch position.
 */
export function CameraController({
  basePosition = [0, 1.6, 5.2],
  intensity = 0.6,
  lookAt = [0, 0.2, 0],
  scrollProgress,
}: {
  basePosition?: [number, number, number];
  intensity?: number;
  lookAt?: [number, number, number];
  scrollProgress?: React.RefObject<number>;
}) {
  const { prefersReducedMotion, isTouchDevice } = useExperience();
  const t = useRef(0);
  const target = useRef(new THREE.Vector3(...lookAt));

  useFrame(({ camera, pointer }, delta) => {
    t.current += delta;
    const progress = scrollProgress?.current ?? 0;
    const angle = progress * Math.PI * 0.6;

    const orbitRadius = basePosition[2];
    const orbitX = Math.sin(angle) * orbitRadius;
    const orbitZ = Math.cos(angle) * orbitRadius;

    let offsetX = 0;
    let offsetY = 0;

    if (!prefersReducedMotion) {
      if (isTouchDevice) {
        offsetX = Math.sin(t.current * 0.25) * 0.3 * intensity;
        offsetY = Math.sin(t.current * 0.18) * 0.12 * intensity;
      } else {
        offsetX = pointer.x * intensity;
        offsetY = pointer.y * intensity * 0.4;
      }
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, orbitX + offsetX, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, basePosition[1] + offsetY, 0.035);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, orbitZ, 0.035);

    camera.lookAt(target.current);
  });

  return null;
}
