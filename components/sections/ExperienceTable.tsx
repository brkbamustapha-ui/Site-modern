"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const TableScene = dynamic(() => import("@/components/3d/TableScene").then((m) => m.default), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-noir-soft via-noir to-noir" />,
});

export function ExperienceTable() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  return (
    <section id="experience" ref={sectionRef} className="relative h-[220vh] bg-noir">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0">
          <TableScene progressRef={progressRef} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir via-noir/10 to-noir/70" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:px-10">
          <SectionHeading kicker="L'Esperienza" title="Une Table Italienne, Vivante" />
          <ScrollReveal delay={0.2}>
            <p className="mt-6 max-w-md text-base text-cream/65 md:text-lg">
              Faites défiler pour vous déplacer autour de la table. Bougez votre curseur pour observer chaque
              détail de plus près — la lueur des bougies, le vin, les pâtes fraîches sorties de la cuisine.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.35}>
            <div className="mt-10">
              <MagneticButton>
                <a
                  href="#reservation"
                  data-cursor="Book"
                  className="rounded-full bg-italian-red px-8 py-4 text-[11px] font-medium uppercase tracking-[0.25em] text-cream transition-colors hover:bg-italian-red-bright"
                >
                  Réserver Votre Table
                </a>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
