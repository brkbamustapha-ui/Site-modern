import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { REASONS } from "@/lib/content";

export function WhyPremium() {
  return (
    <section className="relative overflow-hidden bg-ink-soft px-6 py-28 md:px-10 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <SectionHeading kicker="Pourquoi un site premium ?" title="Votre vitrine, votre première impression" />
          <ScrollReveal delay={0.15}>
            <p className="mt-6 text-base leading-relaxed text-white/65 md:text-lg">
              Votre site est souvent la première impression que vos clients ont de votre entreprise.
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, i) => (
            <ScrollReveal key={reason.title} delay={i * 0.07} className="bg-ink-soft">
              <div className="flex h-full flex-col gap-3 p-8">
                <span className="font-display text-2xl text-accent-soft">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-lg font-medium text-white">{reason.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{reason.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
