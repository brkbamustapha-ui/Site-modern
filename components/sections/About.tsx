"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, Sparkles, Users } from "lucide-react";
import { site, stats } from "@/data/site";
import { PropertyVisual } from "@/components/ui/PropertyVisual";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { useParallaxFactor } from "@/lib/use-parallax";

const pillars = [
  {
    icon: Sparkles,
    title: "Sélection",
    text: "Nous refusons plus de mandats que nous n'en acceptons.",
  },
  {
    icon: ShieldCheck,
    title: "Discrétion",
    text: "Aucune diffusion publique sans votre accord écrit.",
  },
  {
    icon: Users,
    title: "Suivi",
    text: "Un interlocuteur unique, du premier appel à l'acte.",
  },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const parallax = useParallaxFactor();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(
    [scrollYProgress, parallax],
    ([p, f]: number[]) => `${(-6 + p * 12) * f}%`
  );

  return (
    <section
      id="a-propos"
      aria-labelledby="apropos-titre"
      className="relative border-t border-[color-mix(in_srgb,var(--color-steel)_10%,transparent)] py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
          {/* ---- Image column ---------------------------------------- */}
          <div ref={ref} className="relative">
            <ImageReveal className="rounded-[3px]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[3px] sm:aspect-[4/4.4]">
                <motion.div
                  className="absolute -inset-y-[7%] inset-x-0"
                  style={{ y: imageY }}
                >
                  <PropertyVisual scene="estate" mood="dawn" />
                </motion.div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent"
                />
                {/* Inset hairline frame */}
                <div
                  aria-hidden="true"
                  className="absolute inset-3 border border-white/10 sm:inset-4"
                />
              </div>
            </ImageReveal>

            {/* Overlapping accent card */}
            <Reveal delay={0.2}>
              <div
                className="glass relative z-10 mx-auto -mt-12 w-[86%] rounded-[3px] p-6
                  text-center sm:-mt-14 sm:p-7 lg:mx-0 lg:ml-auto lg:mr-6"
              >
                <p className="font-display text-2xl font-light italic text-gold-light sm:text-[1.7rem]">
                  {site.tagline}
                </p>
                <p className="mt-2 text-[0.74rem] uppercase tracking-[0.22em] text-steel-dim">
                  {site.name}
                </p>
              </div>
            </Reveal>
          </div>

          {/* ---- Copy column ----------------------------------------- */}
          <div className="flex flex-col gap-7">
            <Reveal>
              <span className="flex items-center gap-3.5">
                <span aria-hidden="true" className="h-px w-9 bg-gradient-to-r from-transparent to-gold" />
                <span className="eyebrow">L&apos;agence</span>
              </span>
            </Reveal>

            <h2
              id="apropos-titre"
              className="wordmark font-sans text-[clamp(1.7rem,5.5vw,2.9rem)] leading-[1.06] text-chalk"
            >
              <TextReveal text={site.name} stagger={0.08} />
            </h2>

            <Reveal delay={0.1}>
              <p className="text-[1.05rem] leading-relaxed text-offwhite/85 sm:text-[1.12rem]">
                BMS Agency est une agence immobilière moderne, spécialisée dans
                l&apos;accompagnement de projets exigeants. Nous travaillons sur un volume
                volontairement limité de dossiers, pour pouvoir traiter chacun d&apos;eux
                avec le temps qu&apos;il mérite.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="text-[0.95rem] leading-relaxed text-steel">
                Notre approche tient en trois convictions : un bien ne se vend pas, il se
                présente ; une recherche efficace commence par écarter ce qui ne convient
                pas ; et la confidentialité n&apos;est pas une option sur ce marché. De
                l&apos;estimation à la signature, vous gardez le même interlocuteur.
              </p>
            </Reveal>

            {/* Pillars */}
            <RevealGroup as="ul" stagger={0.08} className="flex flex-col gap-4">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <RevealItem
                    as="li"
                    key={pillar.title}
                    className="flex items-start gap-4 border-l border-[color-mix(in_srgb,var(--color-gold)_35%,transparent)] pl-5"
                  >
                    <Icon className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.6} aria-hidden="true" />
                    <p className="text-[0.92rem] text-steel">
                      <span className="font-medium text-offwhite">{pillar.title}.</span>{" "}
                      {pillar.text}
                    </p>
                  </RevealItem>
                );
              })}
            </RevealGroup>

            {/* ---- Key figures --------------------------------------- */}
            <RevealGroup
              as="ul"
              stagger={0.09}
              className="mt-3 grid grid-cols-2 gap-x-6 gap-y-8 border-t
                border-[color-mix(in_srgb,var(--color-steel)_16%,transparent)] pt-9 sm:grid-cols-4"
            >
              {stats.map((stat) => (
                <RevealItem as="li" key={stat.label} className="flex flex-col gap-1.5">
                  <span className="font-display text-[2.2rem] font-light leading-none text-gilded sm:text-[2.5rem]">
                    {stat.value}
                  </span>
                  <span className="text-[0.68rem] uppercase leading-snug tracking-[0.16em] text-steel-dim">
                    {stat.label}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.1}>
              <p className="text-[0.7rem] leading-relaxed text-steel-dim">
                Chiffres donnés à titre indicatif — à remplacer par les données vérifiées de
                l&apos;agence (voir <code className="text-steel">data/site.ts</code>).
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
