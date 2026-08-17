"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { RevealText } from "@/components/ui/RevealText";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { MagneticButton } from "@/components/ui/MagneticButton";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene").then((m) => m.default), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-noir-soft via-noir to-noir" />,
});

export function Hero() {
  return (
    <section id="home" className="relative flex h-svh min-h-[720px] w-full items-center overflow-hidden bg-noir">
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir via-noir/20 to-noir/70" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-noir/70 via-transparent to-noir/40" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[11px] font-medium uppercase tracking-[0.5em] text-gold-soft"
        >
          Ristorante Italiano · Paris
        </motion.p>

        <h1 className="mt-6 max-w-4xl font-display text-6xl italic leading-[0.95] text-cream sm:text-7xl md:text-8xl">
          <RevealText delay={0.4}>La Dolce Vita</RevealText>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-6 max-w-md text-base text-cream/70 md:text-lg"
        >
          Authentic Italian cuisine, reimagined.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <MagneticButton>
            <a
              href="#menu"
              data-cursor="View"
              className="rounded-full bg-cream px-8 py-4 text-[11px] font-medium uppercase tracking-[0.25em] text-noir transition-colors hover:bg-gold-soft"
            >
              Explore Menu
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#reservation"
              data-cursor="Book"
              className="rounded-full border border-cream/40 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.25em] text-cream transition-colors hover:border-gold-soft hover:text-gold-soft"
            >
              Book a Table
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
