"use client";

import { Component, type ReactNode } from "react";
import { SceneFallback } from "./SceneFallback";

/**
 * Returns true when the browser can actually give us a WebGL context.
 * Feature-detecting the constructor is not enough: plenty of environments
 * expose `WebGLRenderingContext` but refuse to create a context (blocklisted
 * GPU, disabled hardware acceleration, exhausted context pool).
 */
function probeWebGL() {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    if (!gl) return false;
    // Release the probe context so it does not count against the browser limit.
    const lose = (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context");
    lose?.loseContext();
    return true;
  } catch {
    return false;
  }
}

// The answer cannot change over a page's lifetime, so probe once and cache.
// `useSyncExternalStore` calls the snapshot on every render and requires a
// stable result, which this guarantees.
let webglSupport: boolean | null = null;

export function isWebGLAvailable() {
  if (webglSupport === null) webglSupport = probeWebGL();
  return webglSupport;
}

type Props = { children: ReactNode };
type State = { failed: boolean };

/**
 * Keeps a failing 3D scene from taking the whole page down. The scenes are
 * decorative, so any renderer error degrades to a static gradient.
 */
export class SceneBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("3D scene failed, falling back to static backdrop:", error);
  }

  render() {
    if (this.state.failed) return <SceneFallback />;
    return this.props.children;
  }
}
