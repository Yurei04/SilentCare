/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",              // anything starting with /api
        destination: "http://localhost:5000/:path*", // send it to Express
      },
    ];
  },
};

export default nextConfig;
