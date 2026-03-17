/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["*.replit.dev", "*.replit.app", "*.picard.replit.dev"],
  async redirects() {
    const baseDomain = process.env.TENANT_BASE_DOMAIN ?? "assina.simpleit.app.br";
    const escapeRegex = (input) => input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const baseDomainHostRegex = `^${escapeRegex(baseDomain)}$`;
    return [
      {
        source: "/login",
        has: [{ type: "host", value: baseDomainHostRegex }],
        missing: [{ type: "query", key: "tenant" }],
        destination: "/",
        permanent: false,
      },
      {
        source: "/dashboard/:path*",
        has: [{ type: "host", value: baseDomainHostRegex }],
        missing: [{ type: "query", key: "tenant" }],
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
