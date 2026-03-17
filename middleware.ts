import { NextResponse, NextRequest } from "next/server";

function extractTenantFromHost(host: string): string | null {
  const hostname = host.split(":")[0].toLowerCase();
  const baseDomain = (process.env.TENANT_BASE_DOMAIN ?? "assina.simpleit.app.br").toLowerCase();

  if (hostname === baseDomain) return null;

  const suffix = "." + baseDomain;
  if (hostname.endsWith(suffix)) {
    const subdomainPart = hostname.slice(0, -suffix.length);
    const tenant = subdomainPart.split(".")[0];
    if (!tenant || tenant === "www" || tenant === "public") return null;
    return tenant;
  }

  return null;
}

function getRequestHost(req: NextRequest): string | null {
  const baseDomain = (process.env.TENANT_BASE_DOMAIN ?? "assina.simpleit.app.br").toLowerCase();
  const candidates = [
    req.headers.get("x-forwarded-host"),
    req.headers.get("x-original-host"),
    req.headers.get("host"),
    req.nextUrl.hostname,
  ]
    .filter(Boolean)
    .flatMap((v) => String(v).split(","))
    .map((v) => v.trim())
    .filter(Boolean);

  if (candidates.length === 0) return null;

  const preferred = candidates.find((c) => c.split(":")[0].toLowerCase() !== baseDomain);
  return (preferred ?? candidates[0]).split(":")[0].toLowerCase();
}

function extractTenantFromRequest(req: NextRequest): string | null {
  const candidates = [
    req.headers.get("x-forwarded-host"),
    req.headers.get("x-original-host"),
    req.headers.get("host"),
    req.nextUrl.hostname,
  ]
    .filter(Boolean)
    .flatMap((v) => String(v).split(","))
    .map((v) => v.trim())
    .filter(Boolean);

  for (const candidate of candidates) {
    const tenant = extractTenantFromHost(candidate);
    if (tenant) return tenant;
  }

  return null;
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const baseDomain = (process.env.TENANT_BASE_DOMAIN ?? "assina.simpleit.app.br").toLowerCase();
  const requestHost = getRequestHost(req);
  const isBaseDomain = requestHost === baseDomain;
  const hostTenant = extractTenantFromRequest(req);
  const qpTenantRaw = url.searchParams.get("tenant")?.toLowerCase();
  const qpTenant = qpTenantRaw && qpTenantRaw !== "public" ? qpTenantRaw : null;
  const cookieTenantRaw = req.cookies.get("tenant")?.value?.toLowerCase() ?? null;
  const cookieTenant = cookieTenantRaw && cookieTenantRaw !== "public" ? cookieTenantRaw : null;

  const isPublicFlow =
    url.pathname === "/register" ||
    url.pathname === "/solicitar-acesso" ||
    url.pathname.startsWith("/register/");

  const tenant = isPublicFlow ? hostTenant ?? qpTenant ?? null : hostTenant ?? qpTenant ?? (isBaseDomain ? null : cookieTenant) ?? null;

  if (isBaseDomain && (url.pathname === "/login" || url.pathname.startsWith("/dashboard")) && !qpTenant) {
    const redirectUrl = url.clone();
    redirectUrl.pathname = "/";
    redirectUrl.searchParams.delete("tenant");
    const res = NextResponse.redirect(redirectUrl);
    res.cookies.delete("tenant");
    return res;
  }

  if ((url.pathname === "/login" || url.pathname.startsWith("/dashboard")) && !tenant) {
    const redirectUrl = url.clone();
    redirectUrl.pathname = "/";
    redirectUrl.searchParams.delete("tenant");
    return NextResponse.redirect(redirectUrl);
  }

  if ((hostTenant || qpTenant) && url.pathname === "/") {
    const redirectUrl = url.clone();
    redirectUrl.pathname = "/login";

    const res = NextResponse.redirect(redirectUrl);
    if (tenant) {
      res.cookies.set("tenant", tenant, { path: "/" });
    }
    return res;
  }

  // Prepara a resposta e define headers/cookies
  const requestHeaders = new Headers(req.headers);
  if (tenant && !isPublicFlow) {
    requestHeaders.set("x-tenant", tenant);
  }

  const res = NextResponse.next({
    request: { headers: requestHeaders },
  });
  if (tenant && !isPublicFlow) {
    res.cookies.set("tenant", tenant, { path: "/" });
  }
  
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
