"use client";

import { useEffect, useRef } from "react";
import { useDevice } from "@/lib/device";

/**
 * Two-part cursor: a crisp dot that tracks the pointer exactly, and a ring
 * that trails it with inertia. Both are driven by a single rAF loop writing
 * transforms straight to the DOM — React never re-renders on mouse move.
 *
 * Mounted only on fine-pointer devices. Touch screens keep native behaviour.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { isTouch, prefersReducedMotion, ready } = useDevice();

  const enabled = ready && !isTouch;

  useEffect(() => {
    if (!enabled) return;
    // Final guard: matchMedia is the source of truth for "has a real pointer".
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.dataset.customCursor = "on";

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pointer };
    let ringScale = 1;
    let targetScale = 1;
    let visible = false;
    let frame = 0;

    // Instant follow when the user asked for less motion; inertia otherwise.
    const ease = prefersReducedMotion ? 1 : 0.16;

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (!visible) {
        visible = true;
        // Jump the ring to the pointer on first sight so it doesn't fly in.
        ringPos.x = pointer.x;
        ringPos.y = pointer.y;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }

      const target = event.target as Element | null;
      const interactive = target?.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]'
      );
      targetScale = interactive ? 1.85 : 1;
      ring.dataset.state = interactive ? "hover" : "idle";
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onDown = () => {
      targetScale *= 0.78;
    };
    const onUp = () => {
      targetScale = ring.dataset.state === "hover" ? 1.85 : 1;
    };

    const tick = () => {
      ringPos.x += (pointer.x - ringPos.x) * ease;
      ringPos.y += (pointer.y - ringPos.y) * ease;
      ringScale += (targetScale - ringScale) * 0.18;

      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform =
        `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${ringScale.toFixed(3)})`;

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      delete document.body.dataset.customCursor;
    };
  }, [enabled, prefersReducedMotion]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 size-9 rounded-full border opacity-0
          border-[color-mix(in_srgb,var(--color-gold)_55%,transparent)]
          shadow-[0_0_22px_-4px_rgba(198,161,91,0.55)]
          transition-[background-color,border-color,box-shadow] duration-300
          data-[state=hover]:border-gold-light
          data-[state=hover]:bg-[color-mix(in_srgb,var(--color-gold)_11%,transparent)]
          data-[state=hover]:shadow-[0_0_34px_-2px_rgba(230,207,154,0.6)]"
        data-state="idle"
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 size-1.5 rounded-full bg-gold-light opacity-0
          shadow-[0_0_12px_rgba(230,207,154,0.9)]"
      />
    </div>
  );
}
