"use client";

import { ArrowUpRight } from "lucide-react";
import { properties } from "@/data/properties";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function Properties() {
  return (
    <section
      id="proprietes"
      aria-labelledby="proprietes-titre"
      className="relative border-t border-[color-mix(in_srgb,var(--color-steel)_10%,transparent)] py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Sélection"
            title="Nos propriétés"
            id="proprietes-titre"
            lede="Une sélection restreinte, réévaluée chaque semaine. Chaque bien présenté ici a été visité, vérifié et retenu par nos équipes."
            className="max-w-2xl"
          />

          <Reveal delay={0.15}>
            <a
              href="#contact"
              data-cursor="hover"
              className="group inline-flex min-h-11 shrink-0 items-center gap-2.5 text-[0.76rem]
                font-medium uppercase tracking-[0.18em] text-gold
                transition-colors duration-400 hover:text-gold-light"
            >
              Demander la liste off-market
              <ArrowUpRight
                className="size-4 transition-transform duration-500
                  [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
                  motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </a>
          </Reveal>
        </div>

        <RevealGroup
          as="ul"
          stagger={0.1}
          className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
        >
          {properties.map((property, i) => (
            <RevealItem as="li" key={property.slug} className="h-full">
              <PropertyCard property={property} priority={i < 3} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
