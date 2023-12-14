/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "www.vstech.co.ke" }],
  },
};

module.exports = nextConfig;
