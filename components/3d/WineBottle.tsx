"use client";

export function WineBottle({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Body */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.24, 0.26, 1.1, 24]} />
        <meshPhysicalMaterial
          color="#12331f"
          roughness={0.15}
          metalness={0}
          transmission={0.55}
          thickness={0.4}
          ior={1.4}
          transparent
          opacity={0.95}
        />
      </mesh>
      {/* Shoulder */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <coneGeometry args={[0.24, 0.22, 24]} />
        <meshPhysicalMaterial color="#12331f" roughness={0.15} transmission={0.5} thickness={0.4} transparent opacity={0.95} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 1.42, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.4, 16]} />
        <meshPhysicalMaterial color="#12331f" roughness={0.15} transmission={0.5} thickness={0.3} transparent opacity={0.95} />
      </mesh>
      {/* Cork */}
      <mesh position={[0, 1.64, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.1, 12]} />
        <meshStandardMaterial color="#c9a56b" roughness={0.9} />
      </mesh>
      {/* Label */}
      <mesh position={[0, 0.45, 0.26]}>
        <planeGeometry args={[0.32, 0.4]} />
        <meshStandardMaterial color="#f4ecd9" roughness={0.8} />
      </mesh>
    </group>
  );
}

export function WineGlass({
  position = [0, 0, 0],
}: {
  position?: [number, number, number];
}) {
  return (
    <group position={position}>
      <mesh position={[0, 0.32, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.1, 0.32, 20, 1, true]} />
        <meshPhysicalMaterial
          color="#7d1f1a"
          roughness={0.05}
          transmission={0.85}
          thickness={0.15}
          ior={1.45}
          transparent
          opacity={0.85}
          side={2}
        />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} />
        <meshPhysicalMaterial color="#eae4d6" roughness={0.1} transmission={0.9} transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, -0.04, 0]}>
        <cylinderGeometry args={[0.13, 0.14, 0.02, 20]} />
        <meshPhysicalMaterial color="#eae4d6" roughness={0.1} transmission={0.9} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
