"use client";

import { PropertyVisual } from "./PropertyVisual";
import { cn } from "@/lib/utils";

/**
 * The hero's guaranteed floor.
 *
 * Rendered underneath the 3D canvas at all times, and left on its own when
 * WebGL is unavailable, refused (reduced motion / data saver) or has crashed.
 * Because it is pure vector + CSS it costs nothing and cannot fail, which is
 * what makes "never a black screen" an actual guarantee rather than a hope.
 */
export function StaticHeroBackdrop({
  /** Dim it when it is only acting as the backdrop behind a live 3D scene. */
  muted = false,
  className,
}: {
  muted?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {/* Once the live scene is up the artwork is retired completely — leaving
          it at partial opacity read as a smudge behind the 3D villa. Only the
          glow and scrims below stay, and they are shared by both cases. */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-[1600ms] ease-out",
          muted ? "opacity-0" : "opacity-100"
        )}
      >
        {/* Slight overscale + slow drift keeps the static case from feeling dead. */}
        <div className="absolute -inset-x-[6%] -inset-y-[4%] motion-safe:animate-float-slow">
          <PropertyVisual scene="cliff-villa" mood="dusk" />
        </div>
      </div>

      {/* Warm key glow, upper right — echoes the 3D scene's key light. */}
      <div className="absolute inset-0 bg-[radial-gradient(48%_38%_at_72%_28%,rgba(198,161,91,0.22),transparent_68%)]" />

      {/* Only the navbar scrim lives here. The scrims that guarantee text
          contrast are applied once, by Hero3D, on top of whichever backdrop
          ends up rendering — stacking a second full set here just crushed the
          fallback into near-black. */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-noir/85 to-transparent" />
    </div>
  );
}
