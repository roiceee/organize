/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    return config;
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
});

const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({});

module.exports = withCss(withPurgeCss());

module.exports = withPWA(nextConfig);
