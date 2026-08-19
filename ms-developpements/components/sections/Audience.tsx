import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AUDIENCE } from "@/lib/content";

export function Audience() {
  return (
    <section className="bg-ink px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Pour qui ?" title="Des projets pour tous les entrepreneurs ambitieux" align="center" />

        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {AUDIENCE.map((item, i) => (
            <ScrollReveal key={item} delay={i * 0.04}>
              <span className="glass inline-flex rounded-full px-6 py-3 text-sm text-white/80 transition-colors hover:border-accent-soft/40 hover:text-white">
                {item}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
