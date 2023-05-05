/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["source.unsplash.com", "images.microcms-assets.io"],
  },
}

module.exports = nextConfig
