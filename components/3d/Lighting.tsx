"use client";

export function Lighting({ variant = "hero" }: { variant?: "hero" | "table" }) {
  return (
    <>
      <ambientLight intensity={0.35} color="#3a2e22" />
      <hemisphereLight args={["#f4ecd9", "#0a0806", 0.25]} />

      {/* Key light — warm, cinematic */}
      <directionalLight
        position={[4, 6, 4]}
        intensity={variant === "hero" ? 2.2 : 1.8}
        color="#f8e6c4"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />

      {/* Rim / accent light — italian gold */}
      <pointLight position={[-4, 2.5, -3]} intensity={6} color="#ad8a4f" distance={12} decay={2} />

      {/* Soft fill from below-front to lift shadows */}
      <pointLight position={[0, 1, 4]} intensity={2.5} color="#7d1f1a" distance={10} decay={2} />

      {/* Subtle top spot for the plate highlight */}
      <spotLight
        position={[0, 5, 1]}
        angle={0.5}
        penumbra={0.9}
        intensity={variant === "hero" ? 25 : 18}
        color="#fff3df"
        distance={12}
      />
    </>
  );
}
