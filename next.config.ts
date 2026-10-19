import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/sanush-accessories",
  images: { unoptimized: true },
};

export default nextConfig;
