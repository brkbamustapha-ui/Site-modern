"use client";

import { useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { reservationSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-cream/15 bg-transparent px-4 py-3.5 text-sm text-cream placeholder:text-cream/35 focus:border-gold-soft focus:outline-none";

export function Reservation() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Capture the form node now: `event.currentTarget` is null once the
    // handler yields at the first `await`.
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const parsed = reservationSchema.safeParse(payload);
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
    setErrorMessage(null);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="reservation" className="bg-noir px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-3xl">
        <SectionHeading kicker="Prenota" title="Book a Table" align="center" />

        <ScrollReveal delay={0.15} className="mt-14">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-gold-soft/30 bg-noir-soft py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft/15 text-gold-soft">
                <Check size={28} />
              </span>
              <p className="font-display text-2xl italic text-cream">Grazie mille!</p>
              <p className="max-w-sm text-sm text-cream/60">
                Your request has been received. We&apos;ll confirm your table by email shortly.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 text-[11px] font-medium uppercase tracking-[0.25em] text-gold-soft hover:text-cream"
              >
                Book another table
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream/50">
                  Full Name
                </label>
                <input id="name" name="name" type="text" required className={inputClass} />
                {errors.name && <p className="mt-1.5 text-xs text-italian-red-bright">{errors.name}</p>}
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="email" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream/50">
                  Email
                </label>
                <input id="email" name="email" type="email" required className={inputClass} />
                {errors.email && <p className="mt-1.5 text-xs text-italian-red-bright">{errors.email}</p>}
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="phone" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream/50">
                  Phone
                </label>
                <input id="phone" name="phone" type="tel" required className={inputClass} />
                {errors.phone && <p className="mt-1.5 text-xs text-italian-red-bright">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="guests" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream/50">
                  Guests
                </label>
                <input id="guests" name="guests" type="number" min={1} max={20} defaultValue={2} required className={inputClass} />
                {errors.guests && <p className="mt-1.5 text-xs text-italian-red-bright">{errors.guests}</p>}
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="date" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream/50">
                  Date
                </label>
                <input id="date" name="date" type="date" min={today} required className={inputClass} />
                {errors.date && <p className="mt-1.5 text-xs text-italian-red-bright">{errors.date}</p>}
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="time" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream/50">
                  Time
                </label>
                <input id="time" name="time" type="time" required className={inputClass} />
                {errors.time && <p className="mt-1.5 text-xs text-italian-red-bright">{errors.time}</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream/50">
                  Message (optional)
                </label>
                <textarea id="message" name="message" rows={3} className={cn(inputClass, "resize-none")} />
              </div>

              {status === "error" && errorMessage && (
                <p className="sm:col-span-2 text-sm text-italian-red-bright" role="alert">
                  {errorMessage}
                </p>
              )}

              <div className="sm:col-span-2 mt-2 flex justify-center">
                <MagneticButton>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="flex items-center gap-2 rounded-full bg-cream px-10 py-4 text-[11px] font-medium uppercase tracking-[0.25em] text-noir transition-colors hover:bg-gold-soft disabled:opacity-60"
                  >
                    {status === "submitting" && <Loader2 size={14} className="animate-spin" />}
                    {status === "submitting" ? "Sending..." : "Confirm Reservation"}
                  </button>
                </MagneticButton>
              </div>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
