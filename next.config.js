const { VANA_API_URL } = require("./config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: rewritesApi,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/create",
        permanent: true,
      },
    ];
  },
};

function rewritesApi() {
  return [
    {
      source: "/api/v0/:path*",
      destination: `${VANA_API_URL}/:path*`,
    },
  ];
}

module.exports = nextConfig;
