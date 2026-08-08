/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
    unoptimized: true,
  },
  // Only set basePath if NEXT_PUBLIC_BASE_PATH is explicitly set or when building in GitHub Actions for GitHub Pages
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || (process.env.GITHUB_ACTIONS ? "/my-portfolio" : ""),
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || (process.env.GITHUB_ACTIONS ? "/my-portfolio/" : ""),
  trailingSlash: true,
};

module.exports = nextConfig;
