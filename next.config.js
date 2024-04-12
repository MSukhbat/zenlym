/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_API_URL: process.env.MONGO_API_URL,
    MONGO_API_KEY: process.env.MONGO_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
