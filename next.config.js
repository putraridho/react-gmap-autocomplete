/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    gmapApi: process.env.GMAP_API || "",
  },
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/map",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
