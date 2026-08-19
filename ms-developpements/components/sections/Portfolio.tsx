"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";
import { PROJECTS, PROJECT_CATEGORIES, type ProjectCategory } from "@/lib/projects";

const FILTERS: Array<ProjectCategory | "Tout"> = ["Tout", ...PROJECT_CATEGORIES];

export function Portfolio() {
  const [filter, setFilter] = useState<ProjectCategory | "Tout">("Tout");
  const projects = filter === "Tout" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="realisations" className="bg-ink px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Nos réalisations" title="Des expériences pensées pour convertir" />

        <div className="mt-10 flex gap-3 overflow-x-auto pb-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              data-cursor="Filtrer"
              className={cn(
                "shrink-0 rounded-full border px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors",
                filter === f
                  ? "border-accent-soft bg-accent-soft text-ink"
                  : "border-white/15 text-white/65 hover:border-white/40 hover:text-white"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <TiltCard key={project.slug} strength={6}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-soft">
                <div
                  className="relative flex h-48 items-center justify-center overflow-hidden"
                  style={{
                    background: `radial-gradient(circle at 30% 20%, color-mix(in srgb, ${project.accent} 35%, transparent), transparent 65%), linear-gradient(135deg, var(--color-ink-elevated), var(--color-ink))`,
                  }}
                >
                  <span
                    className="font-display text-3xl font-semibold uppercase tracking-tight opacity-25 transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ color: project.accent }}
                  >
                    {project.category}
                  </span>
                  {project.isPlaceholder && (
                    <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-ink/60 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-white/60">
                      Exemple
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-accent-soft">
                    {project.category}
                  </span>
                  <h3 className="font-display text-xl font-medium text-white">{project.name}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-white/60">{project.description}</p>
                  <span
                    data-cursor="Voir"
                    className="mt-2 inline-flex w-fit items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/80 transition-colors group-hover:text-accent-soft"
                  >
                    Voir le projet
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
