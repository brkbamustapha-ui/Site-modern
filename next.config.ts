import type { NextConfig } from "next";

/**
 * Two build modes:
 *
 *  - default: a normal Next.js server build (Vercel, Node, Docker…).
 *  - STATIC_EXPORT=1: a fully static export for hosts that only serve files,
 *    such as GitHub Pages. `BASE_PATH` handles being served from a
 *    subdirectory, and the image optimiser is switched off because it needs a
 *    running server.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  turbopack: {},
  ...(isStaticExport
    ? {
        output: "export" as const,
        // Pages serves /path/ as /path/index.html, so emit directories.
        trailingSlash: true,
      }
    : {}),
  ...(basePath ? { basePath } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    // No server means no on-demand optimisation.
    unoptimized: isStaticExport,
    // Add BMS Agency's real image host here once photography is available;
    // data/properties.ts falls back to generated artwork until then.
    remotePatterns: [],
  },
  // three.js and drei ship large barrel files — this keeps the client bundle
  // to the modules actually imported.
  experimental: {
    optimizePackageImports: ["lucide-react", "@react-three/drei", "framer-motion"],
  },
};

export default nextConfig;
