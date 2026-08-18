import type { Variants, Transition } from "framer-motion";

/**
 * One easing family across the whole site. Long, decelerating curves read as
 * "expensive"; anything springy or bouncy would cheapen it.
 */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeInOutSoft = [0.65, 0, 0.35, 1] as const;

export const softTransition: Transition = {
  duration: 0.9,
  ease: easeOutExpo,
};

/** Viewport config shared by every scroll reveal — reveal once, slightly early. */
export const viewportOnce = { once: true, amount: 0.25, margin: "0px 0px -8% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: softTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.1, ease: easeOutExpo } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: easeOutExpo } },
};

/** Wrap a list to cascade its children. */
export function staggerParent(stagger = 0.09, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/**
 * Word-by-word text reveal. Uses clip-path + translate so it stays on the
 * compositor — no layout work per frame.
 */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: easeOutExpo },
  },
};

/* Image curtain reveals live in components/ui/ImageReveal.tsx: they animate an
   overlay rather than the content, so a reveal that never fires degrades to a
   plain visible image instead of hiding it. */
