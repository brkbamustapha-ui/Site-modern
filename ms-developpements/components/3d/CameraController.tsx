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
  basePosition = [0, 0.4, 6.5],
  intensity = 0.5,
  lookAt = [0, 0.1, 0],
}: {
  basePosition?: [number, number, number];
  intensity?: number;
  lookAt?: [number, number, number];
}) {
  const { prefersReducedMotion, isTouchDevice } = useExperience();
  const t = useRef(0);
  const target = useRef(new THREE.Vector3(...lookAt));

  useFrame(({ camera, pointer }, delta) => {
    t.current += delta;

    let offsetX = 0;
    let offsetY = 0;

    if (!prefersReducedMotion) {
      if (isTouchDevice) {
        offsetX = Math.sin(t.current * 0.25) * 0.25 * intensity;
        offsetY = Math.sin(t.current * 0.18) * 0.1 * intensity;
      } else {
        offsetX = pointer.x * intensity;
        offsetY = pointer.y * intensity * 0.4;
      }
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, basePosition[0] + offsetX, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, basePosition[1] + offsetY, 0.035);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, basePosition[2], 0.035);

    camera.lookAt(target.current);
  });

  return null;
}
