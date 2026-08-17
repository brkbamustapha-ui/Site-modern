"use client";

export function MarbleTable({ radius = 5, segments = 64 }: { radius?: number; segments?: number }) {
  return (
    <group position={[0, -1.05, 0]}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius, radius, 0.3, segments]} />
        <meshPhysicalMaterial
          color="#e8e1d3"
          roughness={0.25}
          metalness={0.05}
          clearcoat={0.6}
          clearcoatRoughness={0.3}
        />
      </mesh>
      <mesh position={[0, -0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius * 0.99, radius * 0.99, 0.02, segments]} />
        <meshStandardMaterial color="#8f8672" roughness={0.9} />
      </mesh>
    </group>
  );
}
