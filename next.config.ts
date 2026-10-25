
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Menghilangkan logo N Next.js
  devIndicators: false,

  // Konfigurasi asli tetap dipertahankan
  experimental: {
    agentFeedback: true,
  },

  cacheComponents: true,
  partialPrefetching: true,

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
