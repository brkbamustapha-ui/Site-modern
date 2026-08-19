"use client";

export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} color="#1a1830" />
      <hemisphereLight args={["#8b7dff", "#050609", 0.35]} />

      {/* Key light — cool premium white */}
      <directionalLight position={[3, 5, 4]} intensity={1.4} color="#e8e6ff" />

      {/* Accent rim — violet */}
      <pointLight position={[-4, 1.5, -2]} intensity={9} color="#7c5cff" distance={14} decay={2} />

      {/* Secondary rim — cyan glow */}
      <pointLight position={[4, -1, -1]} intensity={6} color="#2dd9c4" distance={12} decay={2} />

      {/* Soft fill from the front */}
      <pointLight position={[0, 0, 5]} intensity={2} color="#a78bfa" distance={10} decay={2} />
    </>
  );
}
