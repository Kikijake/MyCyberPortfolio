import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // removed to allow serverless functions
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
