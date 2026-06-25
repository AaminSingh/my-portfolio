/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
    unoptimized: true,
  },
  // GitHub Pages deploys to /my-portfolio/ subpath
  basePath: isProd ? "/my-portfolio" : "",
  assetPrefix: isProd ? "/my-portfolio/" : "",
  trailingSlash: true,
};

module.exports = nextConfig;
