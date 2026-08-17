"use client";

import { ScrollReveal } from "./ScrollReveal";
import { MagneticButton } from "./MagneticButton";
import { InstagramIcon, FacebookIcon, TikTokIcon } from "./SocialIcons";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/", icon: InstagramIcon },
  { label: "Facebook", href: "https://www.facebook.com/", icon: FacebookIcon },
  { label: "TikTok", href: "https://www.tiktok.com/", icon: TikTokIcon },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cream/10 bg-noir-soft">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <ScrollReveal>
          <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
            <div>
              <p className="font-display text-3xl italic text-cream">La Dolce Vita</p>
              <p className="mt-4 max-w-xs text-sm text-cream/60">
                Authentic Italian cuisine, reimagined. A cinematic dining experience in the heart of Paris.
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
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold-soft hover:text-gold-soft"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold-soft">Navigate</p>
              <ul className="mt-5 space-y-3">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-sm text-cream/70 transition-colors hover:text-cream">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold-soft">Visit</p>
              <address className="mt-5 space-y-2 text-sm not-italic text-cream/70">
                <p>12 Rue de la Paix</p>
                <p>75002 Paris, France</p>
                <p>
                  <a href="tel:+33123456789" className="hover:text-cream">
                    +33 1 23 45 67 89
                  </a>
                </p>
                <p>
                  <a href="mailto:reservations@ladolcevita.example" className="hover:text-cream">
                    reservations@ladolcevita.example
                  </a>
                </p>
              </address>
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold-soft">Newsletter</p>
              <p className="mt-5 text-sm text-cream/60">
                Seasonal menus, private events and stories from our kitchen.
              </p>
              <form
                className="mt-4 flex items-center gap-2 border-b border-cream/20 pb-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  aria-label="Email address"
                  className="w-full bg-transparent text-sm text-cream placeholder:text-cream/40 focus:outline-none"
                />
                <MagneticButton>
                  <button
                    type="submit"
                    className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-soft hover:text-cream"
                  >
                    Join
                  </button>
                </MagneticButton>
              </form>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-16 select-none text-center font-display text-[16vw] italic leading-none text-cream/5 md:text-[9vw]">
            La Dolce Vita
          </div>
        </ScrollReveal>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/40 md:flex-row">
          <p>© {new Date().getFullYear()} La Dolce Vita. All rights reserved.</p>
          <p>Crafted with care, one table at a time.</p>
        </div>
      </div>
    </footer>
  );
}
