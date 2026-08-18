"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, BedDouble, MapPin, Scaling } from "lucide-react";
import type { Property } from "@/data/properties";
import { PropertyVisual } from "./PropertyVisual";
import { cn } from "@/lib/utils";

export function PropertyCard({
  property,
  priority = false,
}: {
  property: Property;
  /** First row of cards skips lazy-loading so the fold paints immediately. */
  priority?: boolean;
}) {
  // A real photo is preferred when supplied, but a dead URL must never leave
  // a hole — we fall straight back to the generated artwork.
  const [imageFailed, setImageFailed] = useState(false);
  const useImage = Boolean(property.image) && !imageFailed;

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-[3px]
        border border-[color-mix(in_srgb,var(--color-steel)_15%,transparent)]
        bg-ink/70
        transition-[border-color,transform,box-shadow] duration-700
        [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
        motion-safe:hover:-translate-y-1.5
        hover:border-[color-mix(in_srgb,var(--color-gold)_42%,transparent)]
        hover:shadow-[0_30px_70px_-40px_rgba(0,0,0,0.95)]"
    >
      {/* ---- Media ------------------------------------------------ */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-anthracite sm:aspect-[16/11]">
        <div
          className="absolute inset-0 transition-transform duration-[1400ms]
            [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
            motion-safe:group-hover:scale-[1.06]"
        >
          {useImage ? (
            <Image
              src={property.image as string}
              alt={`${property.name}, ${property.location}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              priority={priority}
              onError={() => setImageFailed(true)}
            />
          ) : (
            <PropertyVisual scene={property.visual} mood={property.mood} />
          )}
        </div>

        {/* Type badge */}
        <span
          className="absolute left-4 top-4 z-10 rounded-full border border-white/15
            bg-noir/55 px-3 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.2em]
            text-offwhite backdrop-blur-md"
        >
          {property.type}
        </span>

        {/* Price — always legible thanks to the artwork's built-in vignette. */}
        <p className="absolute bottom-4 left-4 z-10 font-display text-2xl font-light text-chalk sm:text-[1.7rem]">
          {property.price}
        </p>

        {/* Gold hairline that draws itself on hover (pointer devices). */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px origin-left
            scale-x-0 bg-gradient-to-r from-gold-deep via-gold-light to-gold-deep
            transition-transform duration-700
            [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
            motion-safe:group-hover:scale-x-100"
        />
      </div>

      {/* ---- Body ------------------------------------------------- */}
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-[1.45rem] font-light leading-tight text-chalk sm:text-[1.6rem]">
            {property.name}
          </h3>
          <p className="flex items-center gap-2 text-[0.82rem] text-steel">
            <MapPin className="size-3.5 shrink-0 text-gold" strokeWidth={1.6} aria-hidden="true" />
            {property.location}
          </p>
        </div>

        <p className="text-[0.88rem] leading-relaxed text-steel/90">{property.description}</p>

        {/* Key figures */}
        <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-[color-mix(in_srgb,var(--color-steel)_14%,transparent)] pt-4">
          <Spec icon={<Scaling className="size-3.5" strokeWidth={1.6} />} label="Surface" value={property.surface} />
          <Spec
            icon={<BedDouble className="size-3.5" strokeWidth={1.6} />}
            label="Chambres"
            value={String(property.bedrooms)}
          />
          <Spec label="Salles d'eau" value={String(property.bathrooms)} />
        </dl>

        <a
          href="#contact"
          data-cursor="hover"
          aria-label={`Voir le bien : ${property.name}, ${property.location}`}
          className="group/cta mt-1 inline-flex min-h-11 items-center justify-between gap-3
            rounded-full border border-[color-mix(in_srgb,var(--color-steel)_22%,transparent)]
            px-5 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-offwhite
            transition-colors duration-500
            hover:border-gold hover:bg-[color-mix(in_srgb,var(--color-gold)_10%,transparent)]
            hover:text-gold-light"
        >
          Voir le bien
          <ArrowUpRight
            className="size-4 shrink-0 transition-transform duration-500
              [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
              motion-safe:group-hover/cta:translate-x-0.5
              motion-safe:group-hover/cta:-translate-y-0.5"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1")}>
      <dt className="flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.16em] text-steel-dim">
        {icon ? <span className="text-gold">{icon}</span> : null}
        {label}
      </dt>
      <dd className="text-[0.9rem] font-medium text-offwhite">{value}</dd>
    </div>
  );
}
