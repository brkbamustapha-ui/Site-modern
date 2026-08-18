"use client";

import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-titre"
      className="relative border-t border-[color-mix(in_srgb,var(--color-steel)_10%,transparent)] bg-ink py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Expertise"
          title="Nos services"
          id="services-titre"
          lede="Six métiers, une seule exigence : que chaque décision immobilière soit prise avec les bonnes informations, au bon moment."
          className="max-w-2xl"
        />

        <RevealGroup
          as="ul"
          stagger={0.07}
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[3px]
            border border-[color-mix(in_srgb,var(--color-steel)_14%,transparent)]
            bg-[color-mix(in_srgb,var(--color-steel)_14%,transparent)]
            sm:mt-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <RevealItem as="li" key={service.title}>
                {/* Hairline grid: cards share 1px gaps rather than borders,
                    which keeps the whole block reading as one object. */}
                <article
                  className="group relative flex h-full flex-col gap-5 overflow-hidden bg-ink
                    p-7 transition-colors duration-700
                    [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
                    hover:bg-anthracite sm:p-8"
                >
                  {/* Oversized ghost numeral */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-3 -top-6 font-display text-[6.5rem]
                      font-light leading-none text-offwhite/[0.035]
                      transition-[transform,color] duration-1000
                      [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
                      motion-safe:group-hover:-translate-y-1 group-hover:text-gold/[0.09]"
                  >
                    {service.index}
                  </span>

                  {/* Icon plate — the light 3D tilt happens here */}
                  <span
                    className="relative flex size-12 items-center justify-center rounded-[3px]
                      border border-[color-mix(in_srgb,var(--color-gold)_28%,transparent)]
                      bg-[color-mix(in_srgb,var(--color-gold)_7%,transparent)]
                      text-gold transition-[transform,border-color,background-color] duration-700
                      [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
                      [transform-style:preserve-3d]
                      motion-safe:group-hover:[transform:perspective(600px)_rotateX(14deg)_rotateY(-16deg)_translateZ(10px)]
                      group-hover:border-gold group-hover:text-gold-light"
                  >
                    <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>

                  <h3 className="relative font-display text-[1.4rem] font-light leading-tight text-chalk">
                    {service.title}
                  </h3>
                  <p className="relative text-[0.9rem] leading-relaxed text-steel">
                    {service.description}
                  </p>

                  {/* Gold underline drawn on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0
                      bg-gradient-to-r from-gold-deep via-gold-light to-transparent
                      transition-transform duration-700
                      [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
                      motion-safe:group-hover:scale-x-100"
                  />
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
