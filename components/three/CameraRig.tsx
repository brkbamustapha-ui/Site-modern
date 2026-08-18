"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

/**
 * Camera choreography.
 *
 * Three layers, all deliberately small in amplitude:
 *  1. a slow orbital drift so the scene is never frozen,
 *  2. pointer parallax on fine-pointer devices,
 *  3. a one-off dolly-in on mount that settles into the drift.
 *
 * Everything is lerped, so a dropped frame degrades into a slightly slower
 * move rather than a jump, and nothing here accumulates drift over time.
 *
 * The camera and viewport are read off the per-frame `state` rather than from
 * `useThree()` — r3f owns those objects, and driving them from the frame
 * callback is the supported way to animate them imperatively.
 */
export function CameraRig({
  enableParallax,
  reducedMotion,
}: {
  enableParallax: boolean;
  reducedMotion: boolean;
}) {
  const pointer = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const elapsed = useRef(0);
  // Reused each frame instead of allocating a Vector3 sixty times a second.
  const target = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    // Clamp delta so returning from a background tab doesn't fling the camera.
    const dt = Math.min(delta, 0.05);
    elapsed.current += dt;

    // Intro: start pulled back and slightly high, settle over ~2.6s.
    const intro = reducedMotion ? 1 : Math.min(elapsed.current / 2.6, 1);
    const eased = 1 - Math.pow(1 - intro, 4);

    if (enableParallax && !reducedMotion) {
      pointer.current.x = state.pointer.x;
      pointer.current.y = state.pointer.y;
    }
    current.current.x += (pointer.current.x - current.current.x) * 0.045;
    current.current.y += (pointer.current.y - current.current.y) * 0.045;

    // Framing is aspect-driven. The copy occupies the left of the hero on wide
    // screens and the bottom on phones, so the villa is pushed to the opposite
    // side by offsetting what the camera aims at — never by moving the model,
    // which would swing through the frame as the camera orbits.
    // Aiming below the villa lifts it into the upper part of the frame;
    // aiming to one side pushes it across. Both are cheaper and steadier than
    // moving the model, which would swing as the camera orbits.
    const aspect = state.size.width / Math.max(state.size.height, 1);
    let distance: number;
    let offsetX: number;
    let offsetY: number;
    let height: number;

    if (aspect < 0.8) {
      // Portrait: the copy block fills most of a phone screen, so the villa is
      // pushed well back and framed high — atmosphere behind the words, not a
      // competing subject sitting under them.
      distance = 30;
      offsetX = 0;
      offsetY = -4.6;
      height = 3.2;
    } else if (aspect < 1.35) {
      // Square-ish tablet: slightly right of centre and a touch high.
      distance = 19;
      offsetX = -1.4;
      offsetY = -0.9;
      height = 2.6;
    } else {
      // Desktop: villa sits right of centre, copy breathes on the left.
      distance = 16;
      offsetX = -3.2;
      offsetY = 0.45;
      height = 2.1;
    }

    const drift = reducedMotion ? 0 : 1;
    const orbit = Math.sin(elapsed.current * 0.11) * 0.085 * drift;
    const bob = Math.sin(elapsed.current * 0.17) * 0.13 * drift;

    const introOffset = (1 - eased) * 4.5;
    const angle = orbit + current.current.x * 0.14;

    target.current.set(offsetX, offsetY, 0);

    state.camera.position.set(
      Math.sin(angle) * (distance + introOffset) + offsetX,
      height + bob + (1 - eased) * 1.6 - current.current.y * 0.55,
      Math.cos(angle) * (distance + introOffset)
    );
    state.camera.lookAt(target.current);
  });

  return null;
}
