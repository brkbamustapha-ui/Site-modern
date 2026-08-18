import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Generated at build time. Required for `output: export`, and a no-op
// for the server build.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
