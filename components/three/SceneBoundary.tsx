"use client";

import { Component, type ReactNode } from "react";

/**
 * Anything that throws inside the 3D tree — a driver quirk, an unsupported
 * extension, a bad shader compile — is caught here and reported upward so the
 * hero can fall back to the static backdrop instead of unmounting the page.
 */
export class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[BMS] 3D scene disabled after an error:", error);
    }
    this.props.onError();
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
