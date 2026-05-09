import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Hides the default floating dev indicator (often shown as “N”) in development. */
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
