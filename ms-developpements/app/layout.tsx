import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ExperienceProvider } from "@/lib/motion-context";
import { siteUrl, siteUrlString, SITE_NAME, SITE_TAGLINE } from "@/lib/site-config";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${SITE_NAME} — Création de sites web premium`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "MS Développements conçoit des sites web modernes, premium, immersifs en 3D et sur mesure pour restaurants, agences immobilières, commerces, marques et entrepreneurs.",
  keywords: [
    "création site web",
    "site web premium",
    "agence web",
    "site 3D",
    "développeur web freelance",
    "site vitrine",
    "site restaurant",
    "site immobilier",
    SITE_NAME,
  ],
  openGraph: {
    title: `${SITE_NAME} — Création de sites web premium`,
    description: SITE_TAGLINE,
    url: siteUrlString,
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Création de sites web premium`,
    description: SITE_TAGLINE,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full bg-ink text-white antialiased selection:bg-accent">
        <ExperienceProvider>
          <div className="grain-overlay" aria-hidden="true" />
          {children}
        </ExperienceProvider>
      </body>
    </html>
  );
}
