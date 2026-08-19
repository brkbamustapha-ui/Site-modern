"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useExperience } from "@/lib/motion-context";

export function CustomCursor() {
  const { prefersReducedMotion, isTouchDevice } = useExperience();
  const enabled = !prefersReducedMotion && !isTouchDevice;
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { stiffness: 260, damping: 26, mass: 0.4 });
  const ringY = useSpring(mouseY, { stiffness: 260, damping: 26, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("has-custom-cursor");

    const handleMove = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    const handleOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      if (target) {
        setIsHovering(true);
        setHoverLabel(target.dataset.cursor || null);
      } else {
        setIsHovering(false);
        setHoverLabel(null);
      }
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerover", handleOver);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{ x: mouseX, y: mouseY }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent-soft/70 text-[10px] font-medium uppercase tracking-[0.2em] text-white mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          width: isHovering ? 64 : 34,
          height: isHovering ? 64 : 34,
        }}
        transition={{ width: { duration: 0.25 }, height: { duration: 0.25 } }}
      >
        {hoverLabel}
      </motion.div>
    </>
  );
}
