"use client";

import { useMemo } from "react";
import { Float, RoundedBox } from "@react-three/drei";
import { useExperience } from "@/lib/motion-context";

type Detail = "high" | "medium" | "low";

/** A thin glowing "UI line" — a stand-in for text/content rows on a panel. */
function UiBar({
  position,
  width = 0.6,
  color = "#a78bfa",
  opacity = 0.9,
}: {
  position: [number, number, number];
  width?: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={[width, 0.035, 0.01]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={opacity} />
    </mesh>
  );
}

function GlassPanel({
  position,
  rotation = [0, 0, 0],
  size = [1.8, 1.1, 0.06],
  accent = "#7c5cff",
  bars = 3,
  floatSpeed = 1,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  size?: [number, number, number];
  accent?: string;
  bars?: number;
  floatSpeed?: number;
}) {
  const { prefersReducedMotion } = useExperience();

  return (
    <Float
      speed={prefersReducedMotion ? 0 : floatSpeed}
      floatIntensity={prefersReducedMotion ? 0 : 0.7}
      rotationIntensity={prefersReducedMotion ? 0 : 0.25}
      position={position}
      rotation={rotation}
    >
      <group>
        <RoundedBox args={size} radius={0.06} smoothness={4}>
          <meshPhysicalMaterial
            color="#12141f"
            metalness={0.2}
            roughness={0.25}
            transparent
            opacity={0.72}
            clearcoat={0.6}
            clearcoatRoughness={0.3}
          />
        </RoundedBox>

        {/* accent dot — like a status/notification indicator */}
        <mesh position={[-size[0] / 2 + 0.16, size[1] / 2 - 0.15, size[2] / 2 + 0.01]}>
          <circleGeometry args={[0.045, 16]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.2} />
        </mesh>

        {Array.from({ length: bars }).map((_, i) => (
          <UiBar
            key={i}
            position={[-size[0] / 2 + 0.16 + (i === 0 ? 0.32 : 0), size[1] / 2 - 0.15 - i * 0.16 - (i === 0 ? 0 : 0.05), size[2] / 2 + 0.01]}
            width={i === 0 ? size[0] * 0.32 : size[0] * (0.72 - i * 0.12)}
            color={i === 0 ? accent : "#f4f5fa"}
            opacity={i === 0 ? 1 : 0.35}
          />
        ))}
      </group>
    </Float>
  );
}

export function InterfacePanels({ detail = "high" }: { detail?: Detail }) {
  const panels = useMemo(
    () => [
      { position: [0, 0.05, 0] as [number, number, number], size: [2.4, 1.5, 0.08] as [number, number, number], accent: "#7c5cff", bars: 4, floatSpeed: 0.7 },
      { position: [-1.7, 0.7, 0.9] as [number, number, number], rotation: [0, 0.35, 0.05] as [number, number, number], size: [1.3, 0.85, 0.06] as [number, number, number], accent: "#2dd9c4", bars: 2, floatSpeed: 1.1 },
      { position: [1.75, -0.5, 0.7] as [number, number, number], rotation: [0, -0.3, -0.04] as [number, number, number], size: [1.2, 0.8, 0.06] as [number, number, number], accent: "#a78bfa", bars: 2, floatSpeed: 1.3 },
      { position: [1.1, 0.95, 1.2] as [number, number, number], rotation: [0, -0.5, 0.06] as [number, number, number], size: [0.9, 0.6, 0.05] as [number, number, number], accent: "#2dd9c4", bars: 1, floatSpeed: 1.5 },
    ],
    []
  );

  const visible = detail === "low" ? panels.slice(0, 2) : panels;

  return (
    <group>
      {visible.map((panel, i) => (
        <GlassPanel key={i} {...panel} />
      ))}
    </group>
  );
}
