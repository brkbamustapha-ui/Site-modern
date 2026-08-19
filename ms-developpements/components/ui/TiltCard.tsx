"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useExperience } from "@/lib/motion-context";
import { cn } from "@/lib/utils";

export function TiltCard({
  children,
  className,
  strength = 10,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion, isTouchDevice } = useExperience();
  const disabled = prefersReducedMotion || isTouchDevice;

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const springConfig = { stiffness: 220, damping: 22, mass: 0.5 };
  const smoothX = useSpring(mx, springConfig);
  const smoothY = useSpring(my, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [strength, -strength]);
  const rotateY = useTransform(smoothX, [0, 1], [-strength, strength]);
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width);
    my.set((event.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: 1000 }}
      className={cn("group relative", className)}
    >
      <motion.div
        style={disabled ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {!disabled && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at ${glowX} ${glowY}, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 60%)`,
            }}
          />
        )}
        {children}
      </motion.div>
    </motion.div>
  );
}
