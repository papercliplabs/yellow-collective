const IPFS_GATEWAY =
  process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://gateway.pinata.cloud";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.zora.co",
        pathname: "/renderer/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/token/:tokenid",
        destination: "/?tokenid=:tokenid",
      },
    ];
  },
  logging: {
    fetches: {
      fullUrl: true,
      level: "verbose",
    },
  },
};

module.exports = nextConfig;
