"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import type { QualitySettings } from "@/lib/device";

/**
 * A contemporary cliff villa built entirely from primitives.
 *
 * No glTF, no textures, no external fetch — the whole building is a few dozen
 * boxes. That keeps the payload at zero bytes beyond the code itself and makes
 * the geometry budget trivially tunable per quality tier.
 */

// Cool concrete against warm interiors is the whole colour story of the scene.
const CONCRETE = "#cdd2d6";
const CONCRETE_DARK = "#5e646c";
const GOLD = "#c6a15b";
const INTERIOR = "#ffd49b";
const INTERIOR_DIM = "#b07f45";

type Level = {
  /** Slab: [width, height, depth] and position. */
  slab: [number, number, number];
  slabPos: [number, number, number];
  /** Glazed volume sitting on the slab. */
  volume: [number, number, number];
  volumePos: [number, number, number];
};

const levels: Level[] = [
  {
    slab: [7.4, 0.16, 4.4],
    slabPos: [0, -0.62, 0],
    volume: [6.5, 0.66, 3.7],
    volumePos: [0, -0.21, 0],
  },
  {
    slab: [6.8, 0.15, 4.0],
    slabPos: [0.4, 0.16, 0.18],
    volume: [5.8, 0.7, 3.3],
    volumePos: [0.4, 0.58, 0.18],
  },
  {
    slab: [5.4, 0.14, 3.3],
    slabPos: [-0.35, 0.98, -0.12],
    volume: [4.4, 0.58, 2.7],
    volumePos: [-0.35, 1.34, -0.12],
  },
];

export function Villa({ quality }: { quality: QualitySettings }) {
  const castShadow = quality.shadows;

  // Materials are memoised so tier changes don't leak GPU programs.
  const materials = useMemo(() => {
    const concrete = new THREE.MeshStandardMaterial({
      color: CONCRETE,
      roughness: 0.72,
      metalness: 0.04,
    });
    const concreteDark = new THREE.MeshStandardMaterial({
      color: CONCRETE_DARK,
      roughness: 0.85,
      metalness: 0.02,
    });
    // Transparent rather than opaque-metal: the lit interior behind it is the
    // whole point of the shot, and a mirror-black pane hides it completely.
    const glass = new THREE.MeshPhysicalMaterial({
      color: "#16202e",
      roughness: 0.06,
      metalness: 0.2,
      transparent: true,
      opacity: 0.42,
      transmission: 0,
      envMapIntensity: 2.1,
      side: THREE.DoubleSide,
    });
    const gold = new THREE.MeshStandardMaterial({
      color: GOLD,
      roughness: 0.22,
      metalness: 1,
      envMapIntensity: 1.6,
    });
    // Unlit and untonemapped so the rooms glow at a constant, controlled
    // brightness regardless of the exposure applied to the rest of the scene.
    const interior = new THREE.MeshBasicMaterial({
      color: INTERIOR,
      toneMapped: false,
      side: THREE.DoubleSide,
    });
    const interiorDim = new THREE.MeshBasicMaterial({
      color: INTERIOR_DIM,
      toneMapped: false,
    });
    return { concrete, concreteDark, glass, gold, interior, interiorDim };
  }, []);

  // Materials built outside the reconciler are not auto-disposed by R3F,
  // so they are released explicitly when the scene unmounts.
  useEffect(() => {
    return () => {
      Object.values(materials).forEach((material) => material.dispose());
    };
  }, [materials]);

  return (
    <group position={[0, -0.15, 0]}>
      {levels.map((level, i) => (
        <group key={i}>
          {/* Cantilevered slab */}
          <mesh
            position={level.slabPos}
            castShadow={castShadow}
            receiveShadow={castShadow}
            material={materials.concrete}
          >
            <boxGeometry args={level.slab} />
          </mesh>

          {/* Gold reveal along the slab's leading edge — the only bright metal. */}
          <mesh
            position={[
              level.slabPos[0],
              level.slabPos[1] - level.slab[1] / 2 - 0.012,
              level.slabPos[2] + level.slab[2] / 2 + 0.005,
            ]}
            material={materials.gold}
          >
            <boxGeometry args={[level.slab[0] * 0.98, 0.024, 0.03]} />
          </mesh>

          {/* Glazed volume */}
          <mesh
            position={level.volumePos}
            castShadow={castShadow}
            material={materials.glass}
          >
            <boxGeometry args={level.volume} />
          </mesh>

          {/* Lit back wall, seen through the glazing. A bright unlit plane set
              behind the glass is what makes each level read as an inhabited
              room rather than a tinted void. */}
          <mesh
            position={[
              level.volumePos[0],
              level.volumePos[1],
              level.volumePos[2] - level.volume[2] / 2 + 0.08,
            ]}
            material={materials.interior}
          >
            <planeGeometry args={[level.volume[0] - 0.22, level.volume[1] - 0.1]} />
          </mesh>

          {/* Interior floor slab, catching the warm light. */}
          <mesh
            position={[
              level.volumePos[0],
              level.volumePos[1] - level.volume[1] * 0.36,
              level.volumePos[2],
            ]}
            material={materials.interiorDim}
          >
            <boxGeometry args={[level.volume[0] - 0.3, 0.04, level.volume[2] - 0.3]} />
          </mesh>

          {/* Mullions: vertical fins across the front glazing. */}
          {Array.from({ length: quality.windowRows }, (_, m) => {
            const span = level.volume[0] * 0.9;
            const step = span / (quality.windowRows - 1 || 1);
            return (
              <mesh
                key={m}
                position={[
                  level.volumePos[0] - span / 2 + m * step,
                  level.volumePos[1],
                  level.volumePos[2] + level.volume[2] / 2 + 0.012,
                ]}
                material={materials.concreteDark}
              >
                <boxGeometry args={[0.035, level.volume[1], 0.03]} />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* Roof cap */}
      <mesh
        position={[-0.35, 1.7, -0.12]}
        castShadow={castShadow}
        material={materials.concrete}
      >
        <boxGeometry args={[5.7, 0.13, 3.6]} />
      </mesh>

      {/* Service core anchoring the stack into the rock */}
      <mesh position={[2.5, 0.1, -1.5]} castShadow={castShadow} material={materials.concreteDark}>
        <boxGeometry args={[1.5, 2.7, 1.5]} />
      </mesh>

      {/* Warm point lights so the villa reads as inhabited, not as a lit box. */}
      <pointLight position={[0, -0.2, 1.2]} intensity={9} distance={12} color={INTERIOR} />
      <pointLight position={[0.4, 0.6, 1.0]} intensity={7.5} distance={11} color={INTERIOR} />
      <pointLight position={[-0.4, 1.34, 0.8]} intensity={6} distance={10} color={INTERIOR} />
    </group>
  );
}
