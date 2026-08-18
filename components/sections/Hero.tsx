"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Hero3D } from "@/components/three/Hero3D";
import { ButtonLink } from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/TextReveal";
import { easeOutExpo } from "@/lib/motion";
import { site, stats } from "@/data/site";

export function Hero() {
  // Everything starts after the loading curtain, so the two never overlap.
  // Reduced-motion users get the same markup with the transforms neutralised
  // by MotionConfig — branching here would break hydration.
  const base = 1.55;
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: base + delay, duration: 0.95, ease: easeOutExpo },
  });

  return (
    <section
      id="accueil"
      aria-label="Présentation de BMS Agency"
      className="relative flex min-h-screen-safe w-full items-end overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-36"
    >
      <Hero3D />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-[46rem]">
          {/* Eyebrow */}
          <motion.p className="mb-7 flex items-center gap-3.5" {...rise(0)}>
            <span aria-hidden="true" className="h-px w-9 bg-gradient-to-r from-transparent to-gold" />
            <span className="eyebrow">Agence immobilière premium</span>
          </motion.p>

          <h1 className="flex flex-col gap-3">
            <span className="wordmark font-sans text-[clamp(2.1rem,8.5vw,4.6rem)] leading-[1.02] text-chalk">
              <TextReveal text={site.name} immediate delay={base} stagger={0.09} />
            </span>
            {/* The gilded gradient goes on the word spans, not this wrapper —
                a text-clipped background never paints descendants' glyphs. */}
            <span className="font-display text-[clamp(1.5rem,5.2vw,2.9rem)] font-light italic leading-[1.12]">
              <TextReveal
                text={site.tagline}
                wordClassName="text-gilded"
                immediate
                delay={base + 0.3}
                stagger={0.05}
              />
            </span>
          </h1>

          <motion.p
            className="mt-7 max-w-[54ch] text-[0.98rem] leading-relaxed text-offwhite/72 sm:text-[1.08rem]"
            {...rise(0.55)}
          >
            De la première visite à la remise des clés, BMS Agency accompagne ses clients
            dans leurs projets immobiliers haut de gamme — acquisition, vente et gestion —
            avec la discrétion et l&apos;exigence que ce marché impose.
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap items-center gap-3.5" {...rise(0.72)}>
            <ButtonLink href="#proprietes" variant="gold" size="lg">
              Découvrir nos biens
              <ArrowRight className="size-4" strokeWidth={1.8} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#contact" variant="outline" size="lg">
              Nous contacter
            </ButtonLink>
          </motion.div>

          {/* Compact credibility strip — first three figures only. */}
          <motion.dl
            className="mt-14 flex flex-wrap gap-x-10 gap-y-5 border-t
              border-[color-mix(in_srgb,var(--color-steel)_14%,transparent)] pt-7"
            {...rise(0.9)}
          >
            {stats.slice(0, 3).map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="font-display text-2xl font-light text-gold-light sm:text-[1.8rem]">
                  {stat.value}
                </dt>
                <dd className="text-[0.68rem] uppercase tracking-[0.18em] text-steel-dim">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#proprietes"
        aria-label="Faire défiler vers nos propriétés"
        data-cursor="hover"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2.5
          text-steel-dim transition-colors duration-400 hover:text-gold-light md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: base + 1.15, duration: 1 } }}
      >
        <span className="text-[0.58rem] uppercase tracking-[0.3em]">Défiler</span>
        <span
          aria-hidden="true"
          className="relative h-10 w-px overflow-hidden bg-[color-mix(in_srgb,var(--color-steel)_28%,transparent)]"
        >
          <span className="absolute inset-x-0 top-0 h-4 bg-gold motion-safe:animate-scroll-hint" />
        </span>
        <ChevronDown className="size-4" strokeWidth={1.4} aria-hidden="true" />
      </motion.a>
    </section>
  );
}
