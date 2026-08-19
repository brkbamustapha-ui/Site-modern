"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useExperience } from "@/lib/motion-context";
import { cn } from "@/lib/utils";

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  ...props
}: React.ComponentPropsWithoutRef<typeof motion.div> & { strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion, isTouchDevice } = useExperience();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const disabled = prefersReducedMotion || isTouchDevice;

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={disabled ? undefined : { x: springX, y: springY }}
      className={cn("inline-block", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
