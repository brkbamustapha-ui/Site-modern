import { ChefHat, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Chef() {
  return (
    <section className="bg-noir px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-[0.8fr_1.2fr]">
        <ScrollReveal>
          <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center rounded-full border border-gold-soft/20 bg-gradient-to-br from-noir-soft via-[#241a0c] to-noir">
            <div className="absolute inset-6 rounded-full border border-cream/10" />
            <ChefHat size={88} strokeWidth={0.75} className="text-gold-soft/80" />
          </div>
        </ScrollReveal>

        <div>
          <SectionHeading kicker="Il Nostro Chef" title="Massimo Romano" />
          <ScrollReveal delay={0.15}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-cream/65 md:text-lg">
              Formé à Bologne puis affiné dans les cuisines de Toscane, le chef Massimo Romano dirige La Dolce
              Vita depuis son ouverture. Sa philosophie tient en une phrase : respecter le produit avant tout,
              ne jamais le maquiller.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <blockquote className="mt-8 flex gap-4 border-l-2 border-gold-soft/60 pl-6">
              <Quote size={28} className="shrink-0 text-gold-soft/60" />
              <p className="font-display text-xl italic text-cream/80">
                « La cuisine italienne n&apos;a pas besoin d&apos;artifice. Elle a besoin de temps, de patience, et
                d&apos;un excellent produit. »
              </p>
            </blockquote>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
