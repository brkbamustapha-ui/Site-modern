import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { RevealText } from "@/components/ui/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function CTA() {
  return (
    <section id="cta" className="relative overflow-hidden bg-ink-soft px-6 py-28 md:px-10 md:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[140px]"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-accent-soft">Prêt à démarrer ?</p>
        </ScrollReveal>

        <RevealText
          as="h2"
          className="mx-auto mt-6 max-w-3xl justify-center font-display text-3xl font-semibold leading-[1.1] text-white sm:text-4xl md:text-6xl"
        >
          Votre entreprise mérite mieux qu&apos;un site ordinaire.
        </RevealText>

        <ScrollReveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-lg text-lg italic text-white/70">Parlons de votre prochain projet.</p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <MagneticButton>
              <a
                href="#contact"
                data-cursor="Go"
                className="rounded-full bg-white px-9 py-4 text-[11px] font-medium uppercase tracking-[0.25em] text-ink transition-colors hover:bg-accent-soft"
              >
                Créer mon site
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#contact"
                data-cursor="Contact"
                className="rounded-full border border-white/30 px-9 py-4 text-[11px] font-medium uppercase tracking-[0.25em] text-white transition-colors hover:border-accent-soft hover:text-accent-soft"
              >
                Me contacter
              </a>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
