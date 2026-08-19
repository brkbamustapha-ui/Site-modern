/**
 * Resolves the public site URL used for SEO metadata, Open Graph tags,
 * robots.txt and the sitemap.
 *
 * This must never throw: `metadataBase: new URL(...)` is evaluated while
 * Next.js builds, so a missing or malformed value fails the whole build
 * rather than degrading a few meta tags.
 *
 * Guards against the three ways the env var actually breaks in practice:
 *   - unset            → `??` alone handles this, the others it does not
 *   - set but empty    → `""` is not nullish, so it slips past `??`
 *   - missing scheme   → pasting a bare `my-app.vercel.app` from a dashboard
 */

/** Last-resort value so the build always has a valid absolute URL. */
const FALLBACK_SITE_URL = "https://example.com";

function normalize(value: string | undefined | null): string | null {
  if (!value) return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  // Vercel's own env vars are host-only ("my-app.vercel.app"), and pasting a
  // bare domain into NEXT_PUBLIC_SITE_URL is an easy mistake. Assume https.
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const url = new URL(withScheme);
    if (!url.hostname) return null;
    // `origin` drops any stray path/query and never has a trailing slash,
    // which keeps `${siteUrl}/sitemap.xml` style concatenation correct.
    return url.origin;
  } catch {
    return null;
  }
}

function resolveSiteUrl(): string {
  const explicit = normalize(process.env.NEXT_PUBLIC_SITE_URL);
  if (explicit) return explicit;

  // Set automatically by Vercel, so a deploy still gets real URLs even if
  // NEXT_PUBLIC_SITE_URL was never configured.
  const vercelProduction = normalize(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  if (vercelProduction) return vercelProduction;

  const vercelDeployment = normalize(process.env.VERCEL_URL);
  if (vercelDeployment) return vercelDeployment;

  console.warn(
    `[site-url] NEXT_PUBLIC_SITE_URL is missing or invalid; falling back to ${FALLBACK_SITE_URL}. ` +
      `Set it to your real domain so SEO and Open Graph tags resolve correctly.`
  );
  return FALLBACK_SITE_URL;
}

/** Absolute origin, e.g. "https://example.com" — no trailing slash. */
export const siteUrl = resolveSiteUrl();

/** Same value as a URL object, safe to hand to `metadataBase`. */
export const siteUrlObject = new URL(siteUrl);
