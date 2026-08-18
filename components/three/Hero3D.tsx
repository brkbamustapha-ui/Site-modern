"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDevice } from "@/lib/device";
import { StaticHeroBackdrop } from "@/components/ui/StaticHeroBackdrop";
import { SceneBoundary } from "./SceneBoundary";
import { cn } from "@/lib/utils";

/**
 * three.js and drei are the heaviest thing on the page, so they are code-split
 * behind a client-only dynamic import. Nothing is even requested until the
 * capability probe has decided the device should get a 3D hero at all — a
 * phone on data-saver never downloads the renderer.
 */
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

export function Hero3D({ className }: { className?: string }) {
  const { tier, prefersReducedMotion, isTouch, ready } = useDevice();
  const containerRef = useRef<HTMLDivElement>(null);

  const [sceneReady, setSceneReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(true);

  const handleFailure = useCallback(() => {
    setFailed(true);
    setSceneReady(false);
  }, []);
  const handleReady = useCallback(() => setSceneReady(true), []);

  // Only render frames while the hero is on screen and the tab is focused.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && !document.hidden),
      { threshold: 0.01 }
    );
    observer.observe(el);

    const onVisibility = () => {
      setActive(!document.hidden && el.getBoundingClientRect().bottom > 0);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Safety net: if the scene has not reported itself ready within 6s, treat it
  // as failed and commit to the static backdrop. The hero is never left half-lit.
  useEffect(() => {
    if (!ready || tier === "none" || tier === null || sceneReady || failed) return;
    const timer = window.setTimeout(() => setFailed(true), 6000);
    return () => window.clearTimeout(timer);
  }, [ready, tier, sceneReady, failed]);

  const show3D = ready && tier !== null && tier !== "none" && !failed;

  return (
    <div ref={containerRef} className={cn("absolute inset-0", className)}>
      {/* Always mounted. It is the poster while the scene loads, and the
          permanent backdrop when 3D is unavailable. */}
      <StaticHeroBackdrop muted={show3D && sceneReady} />

      {show3D ? (
        <SceneBoundary onError={handleFailure}>
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-[1800ms] ease-out",
              sceneReady ? "opacity-100" : "opacity-0"
            )}
          >
            <HeroScene
              tier={tier}
              active={active}
              enableParallax={!isTouch}
              reducedMotion={prefersReducedMotion}
              onReady={handleReady}
              onFailure={handleFailure}
            />
          </div>
        </SceneBoundary>
      ) : null}

      {/* Scrims sit above the canvas so the headline keeps its contrast
          whichever backdrop ends up rendering. */}
      {/* Phones stack the copy over the middle of the scene, so the vertical
          scrim is heavy there and eases off once the layout goes side-by-side. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t
          from-noir via-noir/62 to-noir/28
          lg:via-noir/22 lg:to-transparent"
      />
      {/* On wide screens the copy sits left and the villa right — weight the
          horizontal scrim to match. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r
          from-noir/92 via-noir/35 to-transparent lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-noir to-transparent"
      />
    </div>
  );
}
