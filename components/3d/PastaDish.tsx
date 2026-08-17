"use client";

import { useMemo } from "react";
import * as THREE from "three";

type Detail = "high" | "medium" | "low";

const SEGMENTS: Record<Detail, { sphere: [number, number]; torus: number }> = {
  high: { sphere: [24, 20], torus: 24 },
  medium: { sphere: [16, 12], torus: 16 },
  low: { sphere: [8, 8], torus: 8 },
};

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

export function PastaDish({ detail = "high", scale = 1 }: { detail?: Detail; scale?: number }) {
  const seg = SEGMENTS[detail];
  const strandCount = detail === "low" ? 10 : detail === "medium" ? 16 : 24;
  const basilCount = detail === "low" ? 2 : 4;
  const tomatoCount = detail === "low" ? 3 : 5;

  const strands = useMemo(() => {
    const rand = seededRandom(42);
    return Array.from({ length: strandCount }, () => {
      const angle = rand() * Math.PI * 2;
      const r = rand() * 0.85;
      return {
        position: [Math.cos(angle) * r, 0.12 + rand() * 0.12, Math.sin(angle) * r] as [number, number, number],
        rotation: [rand() * Math.PI, rand() * Math.PI, rand() * Math.PI] as [number, number, number],
        scale: 0.32 + rand() * 0.18,
      };
    });
  }, [strandCount]);

  const basil = useMemo(() => {
    const rand = seededRandom(7);
    return Array.from({ length: basilCount }, () => {
      const angle = rand() * Math.PI * 2;
      const r = 0.55 + rand() * 0.35;
      return {
        position: [Math.cos(angle) * r, 0.22 + rand() * 0.05, Math.sin(angle) * r] as [number, number, number],
        rotation: [Math.PI / 2 + (rand() - 0.5), rand() * Math.PI, 0] as [number, number, number],
      };
    });
  }, [basilCount]);

  const tomatoes = useMemo(() => {
    const rand = seededRandom(21);
    return Array.from({ length: tomatoCount }, () => {
      const angle = rand() * Math.PI * 2;
      const r = 0.3 + rand() * 0.5;
      return {
        position: [Math.cos(angle) * r, 0.2, Math.sin(angle) * r] as [number, number, number],
      };
    });
  }, [tomatoCount]);

  return (
    <group scale={scale}>
      {/* Plate */}
      <mesh receiveShadow castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[1.3, 1.15, 0.1, seg.torus * 2]} />
        <meshPhysicalMaterial color="#f4ecd9" roughness={0.15} metalness={0} clearcoat={1} clearcoatRoughness={0.15} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <torusGeometry args={[1.22, 0.03, 8, seg.torus * 2]} />
        <meshPhysicalMaterial color="#ad8a4f" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Pasta strands */}
      {strands.map((s, i) => (
        <mesh key={i} position={s.position} rotation={s.rotation} scale={s.scale} castShadow>
          <torusGeometry args={[0.22, 0.045, 8, seg.torus]} />
          <meshStandardMaterial color="#eec27a" roughness={0.55} metalness={0.05} />
        </mesh>
      ))}

      {/* Basil leaves */}
      {basil.map((b, i) => (
        <mesh key={i} position={b.position} rotation={b.rotation} scale={[1, 1, 0.22]} castShadow>
          <sphereGeometry args={[0.15, seg.sphere[0], seg.sphere[1]]} />
          <meshPhysicalMaterial
            color="#2f5233"
            roughness={0.35}
            clearcoat={0.4}
            transparent
            opacity={0.98}
          />
        </mesh>
      ))}

      {/* Cherry tomatoes */}
      {tomatoes.map((t, i) => (
        <mesh key={i} position={t.position} castShadow>
          <sphereGeometry args={[0.09, seg.sphere[0], seg.sphere[1]]} />
          <meshPhysicalMaterial color="#9c2b23" roughness={0.25} clearcoat={0.8} />
        </mesh>
      ))}

      {/* Parmesan shavings */}
      {basil.slice(0, 3).map((b, i) => (
        <mesh
          key={`p-${i}`}
          position={[b.position[0] * 0.6, 0.24, b.position[2] * 0.6]}
          rotation={[Math.PI / 2, i, 0]}
        >
          <planeGeometry args={[0.16, 0.1]} />
          <meshStandardMaterial
            color="#f2e6c2"
            roughness={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
