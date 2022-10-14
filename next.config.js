/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
  swSrc: 'service-worker.js',
});

const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({});

module.exports = withCss(withPurgeCss());
module.exports = withPWA(nextConfig);
