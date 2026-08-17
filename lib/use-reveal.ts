"use client";

import { useEffect, useRef, useState } from "react";

function isVisible(el: Element) {
  const rect = el.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < viewportHeight * 0.92 && rect.bottom > 0;
}

/**
 * Fires once when the element first enters the viewport. Backed by
 * IntersectionObserver, with a scroll/resize listener as a safety net.
 */
export function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    if (isVisible(el)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setInView(true);
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );
    observer.observe(el);

    const checkScroll = () => {
      if (el.isConnected && isVisible(el)) setInView(true);
    };
    window.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [inView]);

  return { ref, inView };
}
