/**
 * Single source of truth for everything BMS Agency needs to swap before
 * going live. Replace the placeholder values below with the real ones —
 * nothing else in the codebase hardcodes contact details.
 */

export const site = {
  name: "BMS AGENCY",
  tagline: "L'immobilier, autrement.",
  description:
    "BMS Agency vous accompagne dans vos projets immobiliers avec une approche moderne, professionnelle et premium.",
  // Used for canonical URLs, sitemap and Open Graph. Override with
  // NEXT_PUBLIC_SITE_URL in your environment.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bms-agency.com",
} as const;

/** ⚠️ PLACEHOLDERS — replace with BMS Agency's real coordinates. */
export const contact = {
  email: "contact@bms-agency.com",
  /** Human-readable phone number. */
  phone: "+33 1 23 45 67 89",
  /** Same number, E.164 digits only — used for tel: and wa.me links. */
  phoneRaw: "+33123456789",
  whatsapp: "33123456789",
  whatsappMessage:
    "Bonjour BMS Agency, je souhaite échanger à propos d'un projet immobilier.",
  address: {
    street: "12 avenue Montaigne",
    postalCode: "75008",
    city: "Paris",
    country: "France",
  },
  hours: "Du lundi au samedi — 9h00 à 19h00",
} as const;

export const whatsappHref = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
  contact.whatsappMessage
)}`;

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Accueil", href: "#accueil" },
  { label: "Nos biens", href: "#proprietes" },
  { label: "À propos", href: "#a-propos" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const footerLinks: NavLink[] = [
  { label: "Accueil", href: "#accueil" },
  { label: "Propriétés", href: "#proprietes" },
  { label: "Services", href: "#services" },
  { label: "À propos", href: "#a-propos" },
  { label: "Contact", href: "#contact" },
];

export type SocialName = "instagram" | "linkedin" | "facebook" | "x";

export const socials: { name: SocialName; label: string; href: string }[] = [
  { name: "instagram", label: "Instagram", href: "https://instagram.com/" },
  { name: "linkedin", label: "LinkedIn", href: "https://linkedin.com/" },
  { name: "facebook", label: "Facebook", href: "https://facebook.com/" },
  { name: "x", label: "X", href: "https://x.com/" },
];

/**
 * ⚠️ ILLUSTRATIVE FIGURES — these are placeholders, not audited results.
 * Swap in BMS Agency's verified numbers (or remove the section) before launch.
 */
export const stats = [
  { value: "10+", label: "années d'expérience" },
  { value: "250+", label: "biens accompagnés" },
  { value: "98%", label: "de clients satisfaits" },
  { value: "24h", label: "délai de première réponse" },
] as const;

export const projectTypes = [
  "Achat",
  "Vente",
  "Location",
  "Gestion locative",
  "Estimation",
  "Autre",
] as const;
