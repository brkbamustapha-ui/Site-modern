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
    default: "La Dolce Vita — Ristorante Italiano",
    template: "%s — La Dolce Vita",
  },
  description:
    "Authentic Italian cuisine, reimagined. An immersive, cinematic dining experience — handmade pasta, wood-fired pizza, and a wine list from every corner of Italy.",
  keywords: [
    "Italian restaurant",
    "fine dining",
    "pasta",
    "pizza napoletana",
    "restaurant réservation",
    "La Dolce Vita",
  ],
  openGraph: {
    title: "La Dolce Vita — Ristorante Italiano",
    description: "Authentic Italian cuisine, reimagined. Book your table for a cinematic dining experience.",
    url: siteUrl,
    siteName: "La Dolce Vita",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Dolce Vita — Ristorante Italiano",
    description: "Authentic Italian cuisine, reimagined.",
  },
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "La Dolce Vita",
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
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full`} data-scroll-behavior="smooth">
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
