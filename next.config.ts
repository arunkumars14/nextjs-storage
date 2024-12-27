import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "100MB",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "st3.depositphotos.com"
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io"
      },
    ]
  }
};

export default nextConfig;
