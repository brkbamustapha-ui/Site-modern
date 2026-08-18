import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { DeviceProvider } from "@/lib/device";
import { MotionProvider } from "@/lib/motion-provider";
import { contact, site, socials } from "@/data/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const title = "BMS Agency — Immobilier Premium";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "agence immobilière",
    "immobilier premium",
    "immobilier de luxe",
    "villa de luxe",
    "penthouse",
    "achat immobilier",
    "vente immobilière",
    "gestion immobilière",
    "BMS Agency",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: site.url,
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true, address: false, email: true },
};

export const viewport: Viewport = {
  themeColor: "#07080b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  // Zooming stays available — clamping it would fail WCAG 1.4.4.
  maximumScale: 5,
  viewportFit: "cover",
};

/** Structured data so search engines read this as a real estate agency. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  email: contact.email,
  telephone: contact.phoneRaw,
  priceRange: "€€€€",
  areaServed: "France",
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.address.street,
    postalCode: contact.address.postalCode,
    addressLocality: contact.address.city,
    addressCountry: "FR",
  },
  sameAs: socials.map((social) => social.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${inter.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="grain min-h-screen bg-noir text-offwhite antialiased">
        {/* First stop for keyboard users, before the fixed navbar. */}
        <a
          href="#proprietes"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110]
            focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:font-medium
            focus:text-noir"
        >
          Aller au contenu principal
        </a>

        <DeviceProvider>
          <MotionProvider>{children}</MotionProvider>
        </DeviceProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
