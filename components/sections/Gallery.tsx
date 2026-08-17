"use client";

import { Wheat, Pizza, IceCream, Flame, ChefHat, Building2, Grape } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

const TILES = [
  { title: "Tagliatelle al Tartufo", icon: Wheat, gradient: "from-[#8a6a2b] via-[#4a3418] to-noir", span: "md:row-span-2" },
  { title: "Pizza Margherita DOP", icon: Pizza, gradient: "from-[#7d1f1a] via-[#4a1310] to-noir", span: "" },
  { title: "Tiramisù della Casa", icon: IceCream, gradient: "from-[#8a7040] via-[#4a3a22] to-noir", span: "" },
  { title: "Il Forno a Legna", icon: Flame, gradient: "from-[#5c2a1c] via-[#341811] to-noir", span: "" },
  { title: "Massimo in Cucina", icon: ChefHat, gradient: "from-[#33421f] via-[#1c2a12] to-noir", span: "md:col-span-2" },
  { title: "La Sala", icon: Building2, gradient: "from-[#3a2e22] via-[#1c150c] to-noir", span: "" },
  { title: "Uve di Toscana", icon: Grape, gradient: "from-[#5c1a30] via-[#33111e] to-noir", span: "" },
];

export function Gallery() {
  return (
    <section id="gallery" className="bg-noir-soft px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Galleria" title="A Taste of the Room" />

        <div className="mt-14 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {TILES.map((tile, i) => {
            const Icon = tile.icon;
            return (
              <ScrollReveal key={tile.title} delay={i * 0.05} className={cn("h-full", tile.span)}>
                <div
                  data-cursor="View"
                  className={cn(
                    "group relative h-full w-full overflow-hidden rounded-2xl border border-cream/10 bg-gradient-to-br",
                    tile.gradient
                  )}
                >
                  <Icon
                    size={56}
                    strokeWidth={0.85}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-cream/60 transition-transform duration-700 ease-out group-hover:scale-125"
                  />
                  <div className="absolute inset-0 bg-noir/0 transition-colors duration-500 group-hover:bg-noir/40" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-display text-lg italic text-cream">{tile.title}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
