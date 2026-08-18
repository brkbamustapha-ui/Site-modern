"use client";

import { useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, Clock, Loader2, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { InstagramIcon, FacebookIcon, TikTokIcon } from "@/components/ui/SocialIcons";
import { contactSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-cream/15 bg-transparent px-4 py-3.5 text-sm text-cream placeholder:text-cream/35 focus:border-gold-soft focus:outline-none";

const INFO = [
  { icon: MapPin, label: "12 Rue de la Paix, 75002 Paris" },
  { icon: Phone, label: "+33 1 23 45 67 89" },
  { icon: Mail, label: "reservations@orositaliano.example" },
  { icon: Clock, label: "Mar–Dim · 12h00–23h00" },
];

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
    <section id="contact" className="bg-noir-soft px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading kicker="Contatti" title="Nous Trouver" />

        <div className="mt-14 grid gap-12 md:grid-cols-2">
          <div className="space-y-10">
            <ScrollReveal>
              <ul className="space-y-4">
                {INFO.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-4 text-sm text-cream/75">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/15 text-gold-soft">
                      <Icon size={16} />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-3">
                {[InstagramIcon, FacebookIcon, TikTokIcon].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    data-cursor="View"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/70 hover:border-gold-soft hover:text-gold-soft"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="relative h-56 overflow-hidden rounded-2xl border border-cream/10 bg-noir">
                <svg viewBox="0 0 400 220" className="h-full w-full opacity-70" aria-hidden="true">
                  <path d="M0 40 H400 M0 90 H400 M0 140 H400 M0 190 H400" stroke="#ad8a4f" strokeWidth="0.5" opacity="0.3" />
                  <path d="M40 0 V220 M120 0 V220 M200 0 V220 M280 0 V220 M360 0 V220" stroke="#ad8a4f" strokeWidth="0.5" opacity="0.3" />
                  <circle cx="200" cy="110" r="6" fill="#7d1f1a" />
                  <circle cx="200" cy="110" r="14" fill="none" stroke="#ad8a4f" strokeWidth="1" />
                </svg>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-noir to-transparent p-4 text-xs uppercase tracking-[0.2em] text-cream/50">
                  Rue de la Paix, Paris
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.1}>
            {status === "success" ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-gold-soft/30 bg-noir py-16 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft/15 text-gold-soft">
                  <Check size={28} />
                </span>
                <p className="font-display text-2xl italic text-cream">Message envoyé</p>
                <p className="max-w-sm text-sm text-cream/60">Nous vous répondrons dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label htmlFor="c-name" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream/50">
                    Nom
                  </label>
                  <input id="c-name" name="name" type="text" required className={inputClass} />
                  {errors.name && <p className="mt-1.5 text-xs text-italian-red-bright">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="c-email" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream/50">
                    Email
                  </label>
                  <input id="c-email" name="email" type="email" required className={inputClass} />
                  {errors.email && <p className="mt-1.5 text-xs text-italian-red-bright">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="c-subject" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream/50">
                    Objet
                  </label>
                  <input id="c-subject" name="subject" type="text" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="c-message" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream/50">
                    Message
                  </label>
                  <textarea id="c-message" name="message" rows={4} required className={cn(inputClass, "resize-none")} />
                  {errors.message && <p className="mt-1.5 text-xs text-italian-red-bright">{errors.message}</p>}
                </div>

                {status === "error" && (
                  <p className="text-sm text-italian-red-bright" role="alert">
                    Une erreur est survenue. Merci de réessayer.
                  </p>
                )}

                <MagneticButton>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="flex items-center gap-2 rounded-full border border-gold-soft/70 px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.25em] text-cream transition-colors hover:bg-gold-soft hover:text-noir disabled:opacity-60"
                  >
                    {status === "submitting" && <Loader2 size={14} className="animate-spin" />}
                    {status === "submitting" ? "Envoi..." : "Envoyer"}
                  </button>
                </MagneticButton>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
