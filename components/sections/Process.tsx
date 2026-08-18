"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { processSteps } from "@/data/process";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function Process() {
  const listRef = useRef<HTMLDivElement>(null);

  // The gold rail fills as the list scrolls past — a progress bar for the
  // process itself. Spring-smoothed so it never jitters with the wheel.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 72%", "end 55%"],
  });
  const railScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section
      id="processus"
      aria-labelledby="processus-titre"
      className="relative border-t border-[color-mix(in_srgb,var(--color-steel)_10%,transparent)] py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Méthode"
          title="Votre projet, étape par étape"
          id="processus-titre"
          lede="Cinq étapes, un calendrier clair. Vous savez à tout moment où en est votre dossier et ce qui vous attend ensuite."
          className="max-w-2xl"
        />

        <div ref={listRef} className="relative mt-14 sm:mt-20">
          {/* Rail */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[9px] top-2 w-px
              bg-[color-mix(in_srgb,var(--color-steel)_18%,transparent)] sm:left-[11px]"
          >
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-gold-light via-gold to-gold-deep"
              style={{ scaleY: railScale }}
            />
          </div>

          <RevealGroup as="ol" stagger={0.12} className="flex flex-col">
            {processSteps.map((step) => (
              <RevealItem
                as="li"
                key={step.number}
                className="group relative flex gap-6 pb-12 pl-10 last:pb-0 sm:gap-9 sm:pl-14"
              >
                {/* Node */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 flex size-[19px] items-center justify-center
                    rounded-full border border-[color-mix(in_srgb,var(--color-gold)_45%,transparent)]
                    bg-noir transition-[background-color,box-shadow] duration-700
                    group-hover:bg-gold group-hover:shadow-[0_0_22px_-4px_rgba(198,161,91,0.9)]
                    sm:size-[23px]"
                >
                  <span className="size-1.5 rounded-full bg-gold transition-colors duration-700 group-hover:bg-noir" />
                </span>

                <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-10">
                  <span
                    className="font-display text-[2.4rem] font-light leading-none text-offwhite/15
                      transition-colors duration-700 group-hover:text-gold/45 sm:w-24 sm:shrink-0 sm:text-[3.2rem]"
                  >
                    {step.number}
                  </span>

                  <div className="flex flex-col gap-2.5">
                    <h3 className="font-display text-[1.6rem] font-light leading-tight text-chalk sm:text-[1.9rem]">
                      {step.title}
                    </h3>
                    <p className="max-w-[54ch] text-[0.93rem] leading-relaxed text-steel">
                      {step.description}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
