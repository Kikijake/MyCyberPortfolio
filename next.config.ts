import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // This enables static export
  images: {
    unoptimized: true, // Disables Image Optimization API
  },
  // Optional: If you're using other image domains
  // images: {
  //   domains: ['example.com'],
  //   unoptimized: true,
  // },
};

export default nextConfig;
