import { Mail, MapPin, Phone } from "lucide-react";
import { contact, footerLinks, site, socials } from "@/data/site";
import { SocialIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[color-mix(in_srgb,var(--color-steel)_13%,transparent)] bg-ink">
      {/* Single soft gold wash, bottom-centre — the only decoration down here. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-40 h-80
          bg-[radial-gradient(50%_100%_at_50%_100%,rgba(198,161,91,0.12),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.2fr] lg:gap-16">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <p className="wordmark font-sans text-base text-chalk sm:text-lg">{site.name}</p>
            <p className="font-display text-2xl font-light italic text-gold-light sm:text-[1.7rem]">
              {site.tagline}
            </p>
            <p className="max-w-[42ch] text-[0.9rem] leading-relaxed text-steel">
              {site.description}
            </p>

            <ul className="mt-2 flex items-center gap-3">
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} sur ${social.label}`}
                    data-cursor="hover"
                    className="flex size-11 items-center justify-center rounded-full
                      border border-[color-mix(in_srgb,var(--color-steel)_20%,transparent)]
                      text-steel transition-colors duration-400
                      hover:border-gold hover:text-gold-light"
                  >
                    <SocialIcon name={social.name} className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <nav aria-label="Liens de pied de page" className="flex flex-col gap-5">
            <h2 className="eyebrow">Navigation</h2>
            <ul className="flex flex-col gap-1">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-cursor="hover"
                    className="group inline-flex min-h-11 items-center gap-2.5 text-[0.92rem]
                      text-steel transition-colors duration-400 hover:text-offwhite"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-0 bg-gold transition-[width] duration-500
                        [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
                        group-hover:w-5"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <h2 className="eyebrow">Contact</h2>
            <ul className="flex flex-col gap-1">
              <li>
                <a
                  href={`tel:${contact.phoneRaw}`}
                  data-cursor="hover"
                  className="inline-flex min-h-11 items-center gap-3 text-[0.92rem] text-steel
                    transition-colors duration-400 hover:text-gold-light"
                >
                  <Phone className="size-4 shrink-0 text-gold" strokeWidth={1.6} aria-hidden="true" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  data-cursor="hover"
                  className="inline-flex min-h-11 items-center gap-3 break-all text-[0.92rem] text-steel
                    transition-colors duration-400 hover:text-gold-light"
                >
                  <Mail className="size-4 shrink-0 text-gold" strokeWidth={1.6} aria-hidden="true" />
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3 py-2.5 text-[0.92rem] leading-relaxed text-steel">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-gold"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <span>
                  {contact.address.street}
                  <br />
                  {contact.address.postalCode} {contact.address.city}, {contact.address.country}
                </span>
              </li>
            </ul>
            <p className="text-[0.8rem] text-steel-dim">{contact.hours}</p>
          </div>
        </div>

        <div className="rule-gold mt-14" aria-hidden="true" />

        <div className="mt-7 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-[0.78rem] text-steel-dim">
            © {year} {site.name} — Tous droits réservés.
          </p>
          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-steel-dim">
            Immobilier premium
          </p>
        </div>
      </div>
    </footer>
  );
}
