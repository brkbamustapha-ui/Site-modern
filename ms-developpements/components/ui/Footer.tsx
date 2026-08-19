"use client";

import { ScrollReveal } from "./ScrollReveal";
import { MagneticButton } from "./MagneticButton";
import { InstagramIcon, TikTokIcon } from "./SocialIcons";
import { CONTACT } from "@/lib/site-config";

const NAV = [
  { label: "Accueil", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Réalisations", href: "#realisations" },
  { label: "À propos", href: "#methode" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { label: "TikTok", href: CONTACT.tiktok, icon: TikTokIcon },
  { label: "Instagram", href: CONTACT.instagram, icon: InstagramIcon },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-soft">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <ScrollReveal>
          <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <p className="font-display text-2xl font-semibold text-white">MS Développements</p>
              <p className="mt-4 max-w-sm text-sm text-white/60">
                Créons quelque chose que vos clients n&apos;oublieront pas.
              </p>
              <div className="mt-6 flex gap-4">
                {SOCIALS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    data-cursor={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-accent-soft hover:text-accent-soft"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-accent-soft">Navigation</p>
              <ul className="mt-5 space-y-3">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-sm text-white/70 transition-colors hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-accent-soft">Contact</p>
              <div className="mt-5 space-y-2 text-sm text-white/70">
                <p>
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
                    {CONTACT.email}
                  </a>
                </p>
                <div className="pt-2">
                  <MagneticButton>
                    <a
                      href="#contact"
                      className="inline-block rounded-full border border-accent-soft/70 px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.25em] text-white transition-colors hover:bg-accent-soft hover:text-ink"
                    >
                      Me contacter
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-16 select-none text-center font-display text-[13vw] font-semibold leading-none text-white/5 md:text-[7vw]">
            MS Développements
          </div>
        </ScrollReveal>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} MS Développements. Tous droits réservés.</p>
          <p>Sites web modernes, premium et sur mesure.</p>
        </div>
      </div>
    </footer>
  );
}
