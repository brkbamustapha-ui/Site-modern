import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { ExperienceProvider } from "@/lib/motion-context";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "L'Oro Italiano — Ristorante Italiano di Lusso",
    template: "%s — L'Oro Italiano",
  },
  description:
    "L'authentique élégance de la cuisine italienne. Une expérience gastronomique immersive et cinématique — pâtes fraîches faites maison, pizza au feu de bois, et une carte des vins venue de toute l'Italie.",
  keywords: [
    "restaurant italien",
    "gastronomie",
    "pâtes fraîches",
    "pizza napolitaine",
    "réservation restaurant",
    "restaurant de luxe Paris",
    "L'Oro Italiano",
  ],
  openGraph: {
    title: "L'Oro Italiano — Ristorante Italiano di Lusso",
    description: "L'authentique élégance de la cuisine italienne. Réservez votre table pour une expérience cinématique.",
    url: siteUrl,
    siteName: "L'Oro Italiano",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "L'Oro Italiano — Ristorante Italiano di Lusso",
    description: "L'authentique élégance de la cuisine italienne.",
  },
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "L'Oro Italiano",
  servesCuisine: "Italian",
  priceRange: "€€€",
  url: siteUrl,
  telephone: "+33-1-23-45-67-89",
  address: {
    "@type": "PostalAddress",
    streetAddress: "12 Rue de la Paix",
    addressLocality: "Paris",
    postalCode: "75002",
    addressCountry: "FR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Sunday"],
      opens: "12:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "12:00",
      closes: "00:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/",
    "https://www.facebook.com/",
    "https://www.tiktok.com/",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable} h-full`} data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
      </head>
      <body className="min-h-full bg-noir text-cream antialiased selection:bg-italian-red">
        <ExperienceProvider>
          <div className="grain-overlay" aria-hidden="true" />
          {children}
        </ExperienceProvider>
      </body>
    </html>
  );
}
