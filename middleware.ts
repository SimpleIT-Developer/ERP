import { NextResponse, NextRequest } from "next/server";

// Extract tenant from subdomain or ?tenant= param
function extractTenant(req: NextRequest): string | null {
  const url = req.nextUrl;
  const qpTenant = url.searchParams.get("tenant");
  if (qpTenant) return qpTenant.toLowerCase();

  const host = req.headers.get("host") || "";
  // e.g., cliente1.dominio.com.br -> cliente1
  const parts = host.split(":")[0].split(".");
  if (parts.length > 2) {
    return parts[0].toLowerCase();
  }
  return null;
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const qpTenant = url.searchParams.get("tenant");

  // 1. Tenta pegar da URL ou subdomínio
  let tenant = extractTenant(req);
  
  // 2. Se não achou na URL/subdomínio, tenta pegar do cookie existente
  if (!tenant) {
    const cookieTenant = req.cookies.get("tenant")?.value;
    if (cookieTenant) {
      tenant = cookieTenant;
    }
  }

  // 3. Fallback para "public" se realmente não tiver nada
  tenant = tenant || "public";

  if (qpTenant && url.pathname === "/") {
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
