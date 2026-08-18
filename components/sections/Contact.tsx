"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { useFormStatus } from "react-dom";
import {
  ChevronDown,
  CircleAlert,
  CircleCheck,
  LoaderCircle,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { submitContact } from "@/app/actions/contact";
import { initialContactState, type ContactState } from "@/lib/contact-schema";
import { contact, projectTypes, whatsappHref } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-[3px] border bg-noir/55 px-4 py-3.5 text-[0.95rem] text-offwhite " +
  "placeholder:text-steel-dim/70 transition-colors duration-400 " +
  "focus:outline-none focus:border-gold " +
  "border-[color-mix(in_srgb,var(--color-steel)_20%,transparent)] " +
  "hover:border-[color-mix(in_srgb,var(--color-steel)_34%,transparent)]";

const labelClass =
  "mb-2 block text-[0.66rem] font-medium uppercase tracking-[0.18em] text-steel";

export function Contact() {
  const [state, formAction] = useActionState<ContactState, FormData>(
    submitContact,
    initialContactState
  );
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  // Clear the form once a submission is accepted, so a second enquiry starts clean.
  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  const fieldId = (name: string) => `${uid}-${name}`;
  const errorId = (name: string) => `${uid}-${name}-error`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-titre"
      className="relative overflow-hidden border-t border-[color-mix(in_srgb,var(--color-steel)_10%,transparent)] bg-ink py-20 sm:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-96
          bg-[radial-gradient(55%_60%_at_50%_0%,rgba(198,161,91,0.10),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* ---- Left: invitation + direct channels ------------------- */}
          <div className="flex flex-col gap-9">
            <SectionHeading
              eyebrow="Contact"
              title="Parlons de votre projet immobilier."
              id="contact-titre"
              lede="Décrivez-nous votre projet en quelques lignes. Nous vous répondons sous 24 heures ouvrées, avec une première lecture concrète du marché qui vous concerne."
            />

            <Reveal delay={0.12}>
              <ul className="flex flex-col gap-3">
                <DirectChannel
                  href={whatsappHref}
                  external
                  icon={<MessageCircle className="size-[18px]" strokeWidth={1.6} />}
                  label="WhatsApp"
                  value="Réponse rapide en journée"
                />
                <DirectChannel
                  href={`mailto:${contact.email}`}
                  icon={<Mail className="size-[18px]" strokeWidth={1.6} />}
                  label="Email"
                  value={contact.email}
                />
                <DirectChannel
                  href={`tel:${contact.phoneRaw}`}
                  icon={<Phone className="size-[18px]" strokeWidth={1.6} />}
                  label="Téléphone"
                  value={contact.phone}
                />
              </ul>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="glass rounded-[3px] p-6">
                <p className="text-[0.86rem] leading-relaxed text-steel">
                  {contact.address.street}, {contact.address.postalCode}{" "}
                  {contact.address.city}
                  <br />
                  <span className="text-steel-dim">{contact.hours}</span>
                </p>
              </div>
            </Reveal>
          </div>

          {/* ---- Right: form ------------------------------------------ */}
          <Reveal delay={0.1}>
            <form
              ref={formRef}
              action={formAction}
              noValidate
              className="glass flex flex-col gap-5 rounded-[3px] p-6 sm:p-8 lg:p-10"
            >
              {/* Honeypot — hidden from people and assistive tech alike. */}
              <div aria-hidden="true" className="hidden">
                <label htmlFor={fieldId("company")}>Société</label>
                <input
                  id={fieldId("company")}
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id={fieldId("name")}
                  errorId={errorId("name")}
                  label="Nom"
                  error={state.errors.name}
                >
                  <input
                    id={fieldId("name")}
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Votre nom"
                    aria-invalid={Boolean(state.errors.name)}
                    aria-describedby={state.errors.name ? errorId("name") : undefined}
                    className={cn(fieldClass, state.errors.name && "border-red-400/70")}
                  />
                </Field>

                <Field
                  id={fieldId("email")}
                  errorId={errorId("email")}
                  label="Email"
                  error={state.errors.email}
                >
                  <input
                    id={fieldId("email")}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    placeholder="vous@exemple.com"
                    aria-invalid={Boolean(state.errors.email)}
                    aria-describedby={state.errors.email ? errorId("email") : undefined}
                    className={cn(fieldClass, state.errors.email && "border-red-400/70")}
                  />
                </Field>

                <Field
                  id={fieldId("phone")}
                  errorId={errorId("phone")}
                  label="Téléphone"
                  optional
                  error={state.errors.phone}
                >
                  <input
                    id={fieldId("phone")}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+33 6 00 00 00 00"
                    aria-invalid={Boolean(state.errors.phone)}
                    aria-describedby={state.errors.phone ? errorId("phone") : undefined}
                    className={cn(fieldClass, state.errors.phone && "border-red-400/70")}
                  />
                </Field>

                <Field
                  id={fieldId("projectType")}
                  errorId={errorId("projectType")}
                  label="Type de projet"
                  error={state.errors.projectType}
                >
                  {/* A real element rather than a background-image chevron:
                      it inherits the theme colour and survives Tailwind's
                      arbitrary-value escaping. */}
                  <div className="relative">
                    <select
                      id={fieldId("projectType")}
                      name="projectType"
                      required
                      defaultValue=""
                      aria-invalid={Boolean(state.errors.projectType)}
                      aria-describedby={
                        state.errors.projectType ? errorId("projectType") : undefined
                      }
                      className={cn(
                        fieldClass,
                        "appearance-none pr-11",
                        state.errors.projectType && "border-red-400/70"
                      )}
                    >
                      <option value="" disabled>
                        Sélectionnez…
                      </option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-anthracite text-offwhite">
                          {type}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-steel"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </div>
                </Field>
              </div>

              <Field
                id={fieldId("message")}
                errorId={errorId("message")}
                label="Message"
                error={state.errors.message}
              >
                <textarea
                  id={fieldId("message")}
                  name="message"
                  required
                  rows={5}
                  placeholder="Votre projet, votre secteur de recherche, votre calendrier…"
                  aria-invalid={Boolean(state.errors.message)}
                  aria-describedby={state.errors.message ? errorId("message") : undefined}
                  className={cn(fieldClass, "resize-y", state.errors.message && "border-red-400/70")}
                />
              </Field>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <SubmitButton />
                <p className="text-[0.7rem] leading-relaxed text-steel-dim sm:max-w-[24ch]">
                  Vos informations restent confidentielles.
                </p>
              </div>

              {/* Status region — announced to screen readers on change. */}
              <div aria-live="polite" role="status" className="min-h-0">
                {state.status !== "idle" && state.message ? (
                  <p
                    className={cn(
                      "flex items-start gap-2.5 rounded-[3px] border px-4 py-3 text-[0.85rem]",
                      state.status === "success"
                        ? "border-gold/45 bg-gold/[0.07] text-gold-light"
                        : "border-red-400/40 bg-red-400/[0.07] text-red-200"
                    )}
                  >
                    {state.status === "success" ? (
                      <CircleCheck className="mt-0.5 size-4 shrink-0" strokeWidth={1.7} aria-hidden="true" />
                    ) : (
                      <CircleAlert className="mt-0.5 size-4 shrink-0" strokeWidth={1.7} aria-hidden="true" />
                    )}
                    {state.message}
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function SubmitButton() {
  // useFormStatus must live in a child of the form to read its pending state.
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="gold" size="lg" disabled={pending}>
      {pending ? (
        <>
          <LoaderCircle className="size-4 animate-spin" strokeWidth={1.8} aria-hidden="true" />
          Envoi en cours…
        </>
      ) : (
        <>
          Envoyer ma demande
          <Send className="size-4" strokeWidth={1.8} aria-hidden="true" />
        </>
      )}
    </Button>
  );
}

function Field({
  id,
  errorId,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  errorId: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className={labelClass}>
        {label}
        {optional ? <span className="ml-1.5 text-steel-dim normal-case">(facultatif)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="mt-1.5 text-[0.76rem] text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function DirectChannel({
  href,
  icon,
  label,
  value,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        data-cursor="hover"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex min-h-14 items-center gap-4 rounded-[3px] border
          border-[color-mix(in_srgb,var(--color-steel)_16%,transparent)] px-5 py-3.5
          transition-[border-color,background-color,transform] duration-500
          [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
          hover:border-gold hover:bg-[color-mix(in_srgb,var(--color-gold)_7%,transparent)]
          motion-safe:hover:translate-x-1"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full
          border border-[color-mix(in_srgb,var(--color-gold)_30%,transparent)] text-gold
          transition-colors duration-500 group-hover:border-gold group-hover:text-gold-light">
          {icon}
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="text-[0.63rem] uppercase tracking-[0.2em] text-steel-dim">{label}</span>
          <span className="truncate text-[0.93rem] text-offwhite">{value}</span>
        </span>
      </a>
    </li>
  );
}
