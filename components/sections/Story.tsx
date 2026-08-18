import { getStoryContent } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StoryParallaxPanel } from "./StoryParallaxPanel";

export async function Story() {
  const story = await getStoryContent();

  return (
    <section id="about" className="relative overflow-hidden bg-noir-soft px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 md:items-center">
        <div>
          <SectionHeading kicker="La Nostra Storia" title="L'Art de la Cuisine Italienne" />
          <ScrollReveal delay={0.15}>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-cream/65 md:text-lg">{story}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-cream/10 pt-8">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-cream/40">Depuis</dt>
                <dd className="mt-2 font-display text-3xl italic text-gold-soft">2012</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-cream/40">Pâte fermentée</dt>
                <dd className="mt-2 font-display text-3xl italic text-gold-soft">48h</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-cream/40">Importé d&apos;</dt>
                <dd className="mt-2 font-display text-3xl italic text-gold-soft">Italia</dd>
              </div>
            </dl>
          </ScrollReveal>
        </div>

        <StoryParallaxPanel />
      </div>
    </section>
  );
}
