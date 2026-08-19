"use client";

import { useState, type FormEvent } from "react";
import { Mail, Loader2, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { InstagramIcon, TikTokIcon } from "@/components/ui/SocialIcons";
import { contactSchema } from "@/lib/validations";
import { PROJECT_TYPES } from "@/lib/content";
import { CONTACT } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-white/15 bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-white/35 focus:border-accent-soft focus:outline-none";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const [key, value] of Object.entries(parsed.error.flatten().fieldErrors)) {
        if (value?.[0]) fieldErrors[key] = value[0];
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-ink-soft px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Contact" title="Parlons de votre projet" />

        <div className="mt-14 grid gap-12 md:grid-cols-2">
          <ScrollReveal className="space-y-8">
            <div className="flex items-center gap-4 text-sm text-white/75">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-accent-soft">
                <Mail size={16} />
              </span>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
                {CONTACT.email}
              </a>
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-accent-soft">Réseaux sociaux</p>
              <div className="mt-4 flex gap-3">
                <a
                  href={CONTACT.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="TikTok"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 hover:border-accent-soft hover:text-accent-soft"
                >
                  <TikTokIcon size={16} />
                </a>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 hover:border-accent-soft hover:text-accent-soft"
                >
                  <InstagramIcon size={16} />
                </a>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <p className="font-display text-lg font-medium text-white">Une idée de projet ?</p>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Décrivez votre activité et vos objectifs dans le formulaire — je reviens vers vous rapidement pour
                en discuter.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            {status === "success" ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-accent-soft/30 bg-ink py-16 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft/15 text-accent-soft">
                  <Check size={28} />
                </span>
                <p className="font-display text-2xl font-medium text-white">Message envoyé</p>
                <p className="max-w-sm text-sm text-white/60">Merci ! Je vous réponds dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Nom
                  </label>
                  <input id="c-name" name="name" type="text" required className={inputClass} />
                  {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="c-company" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Entreprise
                  </label>
                  <input id="c-company" name="company" type="text" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="c-email" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Email
                  </label>
                  <input id="c-email" name="email" type="email" required className={inputClass} />
                  {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="c-phone" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Téléphone
                  </label>
                  <input id="c-phone" name="phone" type="tel" className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-project" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Type de projet
                  </label>
                  <select id="c-project" name="projectType" required defaultValue="" className={cn(inputClass, "appearance-none")}>
                    <option value="" disabled className="bg-ink-soft">
                      Sélectionnez un type de projet
                    </option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-ink-soft">
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && <p className="mt-1.5 text-xs text-red-400">{errors.projectType}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-message" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Message
                  </label>
                  <textarea id="c-message" name="message" rows={4} required className={cn(inputClass, "resize-none")} />
                  {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
                </div>

                {status === "error" && (
                  <p className="sm:col-span-2 text-sm text-red-400" role="alert">
                    Une erreur est survenue. Merci de réessayer.
                  </p>
                )}

                <div className="sm:col-span-2 mt-2 flex justify-center">
                  <MagneticButton>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="flex items-center gap-2 rounded-full bg-white px-10 py-4 text-[11px] font-medium uppercase tracking-[0.25em] text-ink transition-colors hover:bg-accent-soft disabled:opacity-60"
                    >
                      {status === "submitting" && <Loader2 size={14} className="animate-spin" />}
                      {status === "submitting" ? "Envoi..." : "Envoyer le message"}
                    </button>
                  </MagneticButton>
                </div>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
