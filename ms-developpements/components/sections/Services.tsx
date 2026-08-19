import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { SKILLS } from "@/lib/content";

export function Services() {
  return (
    <section id="services" className="bg-ink px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Ce que je sais faire" title="Des sites qui travaillent pour vous" />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <ScrollReveal key={skill.title} delay={i * 0.06}>
                <TiltCard className="h-full">
                  <div className="glass flex h-full flex-col gap-5 rounded-2xl p-7 transition-colors duration-300 hover:border-accent-soft/40">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent-soft">
                      <Icon size={22} strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-medium text-white">{skill.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">{skill.description}</p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
