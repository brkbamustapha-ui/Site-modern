"use client";

const silver = { color: "#d9d4c6", roughness: 0.25, metalness: 0.9 } as const;

export function Fork({ position = [0, 0, 0] as [number, number, number], rotation = [0, 0, 0] as [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <capsuleGeometry args={[0.025, 0.75, 4, 8]} />
        <meshStandardMaterial {...silver} />
      </mesh>
      {[-0.04, -0.013, 0.013, 0.04].map((x, i) => (
        <mesh key={i} position={[x, 0.42, 0]} castShadow>
          <capsuleGeometry args={[0.009, 0.16, 4, 6]} />
          <meshStandardMaterial {...silver} />
        </mesh>
      ))}
    </group>
  );
}

export function Knife({ position = [0, 0, 0] as [number, number, number], rotation = [0, 0, 0] as [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <capsuleGeometry args={[0.025, 0.55, 4, 8]} />
        <meshStandardMaterial {...silver} />
      </mesh>
      <mesh position={[0, 0.42, 0]} castShadow>
        <boxGeometry args={[0.06, 0.32, 0.012]} />
        <meshStandardMaterial {...silver} />
      </mesh>
    </group>
  );
}

export function Candle({ position = [0, 0, 0] as [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.09, 0.1, 0.55, 20]} />
        <meshPhysicalMaterial color="#f2e9d8" roughness={0.6} transmission={0.15} thickness={0.4} />
      </mesh>
      <mesh position={[0, 0.29, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.06, 8]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.03, 10, 10]} />
        <meshStandardMaterial color="#ffb347" emissive="#ff9d2e" emissiveIntensity={2.5} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 0.4, 0]} color="#ffb347" intensity={2.2} distance={3} decay={2} />
    </group>
  );
}
