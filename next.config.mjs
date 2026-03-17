/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["*.replit.dev", "*.replit.app", "*.picard.replit.dev"],
  async redirects() {
    const baseDomain = process.env.TENANT_BASE_DOMAIN ?? "assina.simpleit.app.br";
    return [
      {
        source: "/login",
        has: [{ type: "host", value: baseDomain }],
        destination: "/",
        permanent: false,
      },
      {
        source: "/dashboard/:path*",
        has: [{ type: "host", value: baseDomain }],
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
