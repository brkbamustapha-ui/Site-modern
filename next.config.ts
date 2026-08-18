import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    formats: ["image/avif", "image/webp"],
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
