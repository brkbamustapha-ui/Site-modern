"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { RevealText } from "@/components/ui/RevealText";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { MagneticButton } from "@/components/ui/MagneticButton";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene").then((m) => m.default), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-ink-soft via-ink to-ink" />,
});

export function Hero() {
  return (
    <section id="home" className="relative flex h-svh min-h-[720px] w-full items-center overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-ink/50" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.5em] text-accent-soft"
        >
          <span className="h-px w-8 bg-accent-soft/50" />
          Agence de création de sites web
        </motion.p>

        <h1 className="mt-6 max-w-4xl font-display text-[9vw] font-semibold uppercase leading-[0.98] text-white sm:text-6xl md:text-7xl lg:text-8xl">
          <RevealText delay={0.4}>MS Développements</RevealText>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-6 max-w-lg text-lg text-white/75 md:text-xl"
        >
          Des sites web qui ne se contentent pas d&apos;être beaux. Ils donnent envie de vous choisir.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.8 }}
          className="mt-4 max-w-md text-sm text-white/55 md:text-base"
        >
          Nous créons des expériences web modernes, immersives et performantes pour donner à votre entreprise une
          image à la hauteur de vos ambitions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <MagneticButton>
            <a
              href="#cta"
              data-cursor="Go"
              className="rounded-full bg-white px-8 py-4 text-[11px] font-medium uppercase tracking-[0.25em] text-ink transition-colors hover:bg-accent-soft"
            >
              Créer mon site
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#realisations"
              data-cursor="Voir"
              className="rounded-full border border-white/30 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.25em] text-white transition-colors hover:border-accent-soft hover:text-accent-soft"
            >
              Voir nos réalisations
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
