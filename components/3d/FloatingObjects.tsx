"use client";

import { useMemo } from "react";
import { Float } from "@react-three/drei";
import { useExperience } from "@/lib/motion-context";

type Detail = "high" | "medium" | "low";

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

const OLIVE = { color: "#37471f", roughness: 0.35 } as const;
const TOMATO = { color: "#9c2b23", roughness: 0.25 } as const;
const BASIL = { color: "#345a37", roughness: 0.4 } as const;

export function FloatingObjects({ detail = "high" }: { detail?: Detail }) {
  const { prefersReducedMotion } = useExperience();
  const count = detail === "low" ? 3 : detail === "medium" ? 5 : 8;

  const items = useMemo(() => {
    const rand = seededRandom(99);
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + rand();
      const radius = 2.6 + rand() * 1.6;
      const kind = i % 3;
      return {
        kind,
        position: [Math.cos(angle) * radius, -0.2 + rand() * 1.6, Math.sin(angle) * radius - 1] as [
          number,
          number,
          number,
        ],
        scale: 0.6 + rand() * 0.6,
        speed: 0.6 + rand() * 0.8,
      };
    });
  }, [count]);

  return (
    <group>
      {items.map((item, i) => (
        <Float
          key={i}
          speed={prefersReducedMotion ? 0 : item.speed}
          floatIntensity={prefersReducedMotion ? 0 : 1.2}
          rotationIntensity={prefersReducedMotion ? 0 : 0.6}
          position={item.position}
        >
          {item.kind === 0 && (
            <mesh scale={item.scale * 0.09} castShadow>
              <sphereGeometry args={[1, 12, 12]} />
              <meshPhysicalMaterial {...TOMATO} clearcoat={0.7} />
            </mesh>
          )}
          {item.kind === 1 && (
            <mesh scale={[item.scale * 0.14, item.scale * 0.14, item.scale * 0.02]} castShadow>
              <sphereGeometry args={[1, 12, 10]} />
              <meshPhysicalMaterial {...BASIL} clearcoat={0.3} />
            </mesh>
          )}
          {item.kind === 2 && (
            <mesh scale={item.scale * 0.07} castShadow>
              <sphereGeometry args={[1, 10, 10]} />
              <meshStandardMaterial {...OLIVE} />
            </mesh>
          )}
        </Float>
      ))}
    </group>
  );
}
