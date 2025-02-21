import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    emotion: true
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: 'assets.pokemon.com'
      }
    ]
  }
};

export default nextConfig;
