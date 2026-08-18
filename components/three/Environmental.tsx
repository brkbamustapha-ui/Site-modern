"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import type { QualitySettings } from "@/lib/device";

/** Small deterministic PRNG — see the note in the particle buffer below. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/**
 * Water plane below the villa.
 *
 * Real screen-space reflections are an extra render pass, so they are reserved
 * for the top tier; everything else gets a polished metal approximation that
 * samples the (procedural) environment map instead and costs nothing per frame.
 */
export function Water({
  quality,
  reflective,
}: {
  quality: QualitySettings;
  reflective: boolean;
}) {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1.05, 0]}
      receiveShadow={quality.shadows}
    >
      <planeGeometry args={[46, 46]} />
      {reflective ? (
        <MeshReflectorMaterial
          resolution={512}
          mixBlur={6}
          // Low strength on purpose: a hard mirror throws bright vertical
          // streaks of the lit interiors across the frame, which reads as a
          // smudge rather than water.
          mixStrength={2.5}
          blur={[420, 140]}
          depthScale={1.2}
          minDepthThreshold={0.3}
          maxDepthThreshold={1.4}
          mirror={0.18}
          color="#0b1018"
          metalness={0.6}
          roughness={0.6}
        />
      ) : (
        <meshStandardMaterial
          color="#0a0d14"
          metalness={0.9}
          roughness={0.22}
          envMapIntensity={1.1}
        />
      )}
    </mesh>
  );
}

/** Low-poly rock mass so the villa reads as sitting on a cliff, not floating. */
export function Cliff({ quality }: { quality: QualitySettings }) {
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#15171d", roughness: 0.95, metalness: 0 }),
    []
  );
  useEffect(() => () => material.dispose(), [material]);

  // Flattened and set low so they read as a shadowed headland the villa is
  // anchored into. Taller blobs at this distance just look like debris.
  const rocks: { pos: [number, number, number]; scale: [number, number, number]; rot: number }[] =
    [
      { pos: [4.6, -2.3, -2.2], scale: [4.2, 1.5, 3.4], rot: 0.42 },
      { pos: [-5.0, -2.5, -1.8], scale: [3.6, 1.2, 3.0], rot: -0.3 },
      { pos: [0.4, -2.7, -4.0], scale: [7.0, 1.3, 3.0], rot: 0.12 },
    ];

  return (
    <group>
      {rocks.map((rock, i) => (
        <mesh
          key={i}
          position={rock.pos}
          rotation={[0, rock.rot, 0]}
          scale={rock.scale}
          receiveShadow={quality.shadows}
          material={material}
        >
          {/* Low-detail icosahedron: craggy silhouette, 80 triangles. */}
          <icosahedronGeometry args={[1, 1]} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Dust motes drifting through the key light. One `points` draw call, count
 * scaled by tier, animated by rotating the whole group rather than rewriting
 * the position buffer every frame.
 */
export function Particles({ count }: { count: number }) {
  const groupRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    // Seeded rather than Math.random: the distribution is identical on every
    // render and between server and client, so the scene can never re-shuffle.
    const rand = seeded(20260818);
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 4 + rand() * 7;
      const angle = rand() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = -1 + rand() * 5;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#e6cf9a",
        size: 0.035,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.022;
    // Gentle vertical breathing, clamped so motes never leave the frame.
    groupRef.current.position.y = Math.sin(performance.now() * 0.00016) * 0.22;
  });

  return <points ref={groupRef} geometry={geometry} material={material} />;
}
