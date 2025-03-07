import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  // Ensure CSS processing is enabled
  webpack: (config) => {
    return config
  },
  cssModules: true
};

export default nextConfig;
