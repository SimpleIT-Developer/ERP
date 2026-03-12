import { NextResponse, NextRequest } from "next/server";

// Extract tenant from subdomain or ?tenant= param
function extractTenant(req: NextRequest): string | null {
  const url = req.nextUrl;
  const qpTenant = url.searchParams.get("tenant");
  if (qpTenant) return qpTenant.toLowerCase();

  const host = req.headers.get("host") || "";
  const hostname = host.split(":")[0].toLowerCase();
  const baseDomain =
    (process.env.TENANT_BASE_DOMAIN ||
      process.env.NEXT_PUBLIC_TENANT_BASE_DOMAIN ||
      "assina.simpleit.app.br").toLowerCase();

  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0" ||
    hostname === "::1"
  ) {
    return null;
  }

  if (hostname === baseDomain || hostname === `www.${baseDomain}`) {
    return null;
  }

  if (hostname.endsWith(`.${baseDomain}`)) {
    const prefix = hostname.slice(0, -(baseDomain.length + 1));
    const tenant = prefix.split(".")[0];
    return tenant && tenant !== "www" ? tenant : null;
  }

  if (hostname.endsWith(".localhost")) {
    const tenant = hostname.split(".")[0];
    return tenant || null;
  }

  const parts = hostname.split(".");
  if (parts.length > 2 && parts[0] !== "www") return parts[0];
  return null;
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const qpTenant = url.searchParams.get("tenant");

  // 1. Tenta pegar da URL ou subdomínio
  const tenantFromRequest = extractTenant(req);
  let tenant = tenantFromRequest;
  
  // 2. Se não achou na URL/subdomínio, tenta pegar do cookie existente
  if (!tenant) {
    const cookieTenant = req.cookies.get("tenant")?.value;
    if (cookieTenant) {
      tenant = cookieTenant;
    }
  }

  // 3. Fallback para "public" se realmente não tiver nada
  tenant = tenant || "public";

  if (url.pathname === "/" && (qpTenant || tenantFromRequest)) {
    const redirectUrl = url.clone();
    redirectUrl.pathname = "/login";

    const res = NextResponse.redirect(redirectUrl);
    res.headers.set("x-tenant", tenant);
    res.cookies.set("tenant", tenant, { path: "/" });
    return res;
  }

  // Prepara a resposta e define headers/cookies
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-tenant", tenant);
  const res = NextResponse.next({ request: { headers: requestHeaders } });
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
