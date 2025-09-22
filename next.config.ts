import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Don’t block production build because of ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
