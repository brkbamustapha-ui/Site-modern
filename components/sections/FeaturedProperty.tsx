"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { featuredProperty as f } from "@/data/properties";
import { PropertyVisual } from "@/components/ui/PropertyVisual";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { useParallaxFactor } from "@/lib/use-parallax";

export function FeaturedProperty() {
  const sectionRef = useRef<HTMLElement>(null);
  // 1 normally, 0 when the visitor has asked for less motion.
  const parallax = useParallaxFactor();

  // Tracks this section's progress through the viewport, 0 → 1.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Two speeds: the backdrop drifts up slowly, the copy panel counter-moves.
  // Small amplitudes — parallax should be felt, not noticed.
  const backdropY = useTransform(
    [scrollYProgress, parallax],
    ([p, f]: number[]) => `${(-8 + p * 16) * f}%`
  );
  const backdropScale = useTransform(
    [scrollYProgress, parallax],
    ([p, f]: number[]) => 1 + (0.12 - Math.sin(p * Math.PI) * 0.08) * f
  );
  const panelY = useTransform(
    [scrollYProgress, parallax],
    ([p, f]: number[]) => `${(6 - p * 12) * f}%`
  );

  return (
    <section
      ref={sectionRef}
      id="propriete-vedette"
      aria-labelledby="vedette-titre"
      className="relative isolate flex min-h-[92svh] items-center overflow-hidden py-24 sm:py-32"
    >
      {/* ---- Parallax backdrop ------------------------------------- */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ y: backdropY, scale: backdropScale }}
      >
        {f.image ? (
          <Image
            src={f.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <PropertyVisual scene={f.visual} mood={f.mood} showDisc />
        )}
      </motion.div>

      {/* Scrims — the copy sits on the left, so weight the gradient that way.
          Heavy enough for AA contrast under the text, light enough on the right
          that the property is actually visible. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r
          from-noir via-noir/85 to-noir/10
          lg:via-noir/70 lg:to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-noir via-transparent to-noir/45"
      />

      {/* ---- Copy --------------------------------------------------- */}
      <motion.div
        className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12"
        style={{ y: panelY }}
      >
        <div className="max-w-[38rem]">
          <Reveal>
            <span className="flex items-center gap-3.5">
              <span aria-hidden="true" className="h-px w-9 bg-gradient-to-r from-transparent to-gold" />
              <span className="eyebrow">{f.eyebrow}</span>
            </span>
          </Reveal>

          <h2
            id="vedette-titre"
            className="mt-6 font-display text-[clamp(2.2rem,7vw,4.2rem)] font-light leading-[1.05] text-chalk"
          >
            <TextReveal text={f.name} />
          </h2>

          <Reveal delay={0.1}>
            <p className="mt-4 flex items-center gap-2.5 text-[0.86rem] uppercase tracking-[0.16em] text-gold-light">
              <MapPin className="size-4 shrink-0" strokeWidth={1.6} aria-hidden="true" />
              {f.location}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-7 text-[1.05rem] leading-relaxed text-offwhite/85 sm:text-[1.15rem]">
              {f.intro}
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-4 max-w-[52ch] text-[0.94rem] leading-relaxed text-steel">{f.body}</p>
          </Reveal>

          {/* Spec table */}
          <RevealGroup
            as="ul"
            stagger={0.08}
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-y
              border-[color-mix(in_srgb,var(--color-steel)_16%,transparent)] py-8 sm:grid-cols-4"
          >
            {f.specs.map((spec) => (
              <RevealItem as="li" key={spec.label} className="flex flex-col gap-1.5">
                <span className="text-[0.6rem] uppercase tracking-[0.2em] text-steel-dim">
                  {spec.label}
                </span>
                <span className="font-display text-xl font-light text-chalk sm:text-2xl">
                  {spec.value}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.14} className="mt-9">
            <p className="font-display text-[clamp(1.8rem,5vw,2.6rem)] font-light text-gilded">
              {f.price}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <ButtonLink href="#contact" variant="gold" size="lg">
                Organiser une visite privée
                <ArrowRight className="size-4" strokeWidth={1.8} aria-hidden="true" />
              </ButtonLink>
              <span className="text-[0.76rem] text-steel-dim">
                Dossier complet sur demande — {f.type}
              </span>
            </div>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}
