import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { METHOD_STEPS } from "@/lib/content";

export function Method() {
  return (
    <section id="methode" className="bg-ink-soft px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Ma méthode" title="Un processus clair, du premier échange à la mise en ligne" />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {METHOD_STEPS.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.1} className="relative">
              <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
                <span className="font-display text-4xl font-semibold text-transparent [-webkit-text-stroke:1px_var(--color-accent-soft)]">
                  {step.number}
                </span>
                <h3 className="font-display text-xl font-medium text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{step.description}</p>
              </div>
              {i < METHOD_STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute right-[-1rem] top-6 hidden h-px w-8 bg-gradient-to-r from-accent-soft/50 to-transparent md:block lg:block"
                />
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
