/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "apis.providusbank.com",
        protocol: "https",
        port: "",
        pathname: "/ThinkSaveApi/**",
      },
    ],
  },
};

module.exports = nextConfig;
