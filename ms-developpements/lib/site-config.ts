const FALLBACK_SITE_URL = "https://msdeveloppements.example";

function resolveSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (raw) {
    try {
      return new URL(raw);
    } catch {
      // Invalid value (empty string, missing protocol, etc.) — fall through to the safe default
      // so metadataBase never throws during the build.
    }
  }
  return new URL(FALLBACK_SITE_URL);
}

export const siteUrl = resolveSiteUrl();
export const siteUrlString = siteUrl.toString().replace(/\/$/, "");

export const SITE_NAME = "MS Développements";
export const SITE_TAGLINE = "Transformons votre activité en expérience digitale.";

/**
 * Real contact / social links for the agency — edit these to your actual handles.
 * Kept in one place so they're easy to find and update.
 */
export const CONTACT = {
  email: "contact@msdeveloppements.example",
  tiktok: "https://www.tiktok.com/@ms.developpements",
  instagram: "https://www.instagram.com/ms.developpements",
};
