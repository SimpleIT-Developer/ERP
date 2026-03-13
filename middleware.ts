import { NextResponse, NextRequest } from "next/server";

function extractTenantFromHost(host: string): string | null {
  const hostname = host.split(":")[0].toLowerCase();
  const baseDomain = (process.env.TENANT_BASE_DOMAIN ?? "assina.simpleit.app.br").toLowerCase();

  if (hostname === baseDomain) return null;

  const suffix = "." + baseDomain;
  if (hostname.endsWith(suffix)) {
    const subdomainPart = hostname.slice(0, -suffix.length);
    const tenant = subdomainPart.split(".")[0];
    if (!tenant || tenant === "www") return null;
    return tenant;
  }

  return null;
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const forwardedHost = req.headers.get("x-forwarded-host");
  const rawHost = (forwardedHost ?? req.headers.get("host") ?? "").split(",")[0].trim();
  const host = rawHost;
  const hostTenant = extractTenantFromHost(host);
  const qpTenant = url.searchParams.get("tenant")?.toLowerCase();

  let tenant = hostTenant ?? qpTenant ?? null;

  if (!tenant) {
    tenant = req.cookies.get("tenant")?.value ?? null;
  }

  tenant = tenant || "public";

  if ((hostTenant || qpTenant) && url.pathname === "/") {
    const redirectUrl = url.clone();
    redirectUrl.pathname = "/login";

    const res = NextResponse.redirect(redirectUrl);
    res.headers.set("x-tenant", tenant);
    res.cookies.set("tenant", tenant, { path: "/" });
    return res;
  }

  // Prepara a resposta e define headers/cookies
  const res = NextResponse.next();
  res.headers.set("x-tenant", tenant);
  res.cookies.set("tenant", tenant, { path: "/" });
  
  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes (handled separately)
     * - _next static files
     * - favicon
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
