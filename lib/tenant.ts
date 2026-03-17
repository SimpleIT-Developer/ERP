import { cookies, headers } from "next/headers";

function normalizeTenant(input: string): string | null {
  const t = input.trim().toLowerCase();
  if (!t || t === "public" || t === "www") return null;
  return t;
}

function extractTenantFromHost(host: string, baseDomain: string): string | null {
  const hostname = host.split(":")[0].toLowerCase();
  if (hostname === baseDomain) return null;

  const suffix = "." + baseDomain;
  if (!hostname.endsWith(suffix)) return null;

  const subdomainPart = hostname.slice(0, -suffix.length);
  const tenant = subdomainPart.split(".")[0];
  return normalizeTenant(tenant);
}

export function resolveTenantKey(): string | null {
  const baseDomain = (process.env.TENANT_BASE_DOMAIN ?? "assina.simpleit.app.br").toLowerCase();
  const h = headers();

  const candidates = [
    h.get("x-forwarded-host"),
    h.get("x-original-host"),
    h.get("host"),
  ]
    .filter(Boolean)
    .flatMap((v) => String(v).split(","))
    .map((v) => v.trim())
    .filter(Boolean);

  for (const candidate of candidates) {
    const tenant = extractTenantFromHost(candidate, baseDomain);
    if (tenant) return tenant;
  }

  const cookieTenant = normalizeTenant(cookies().get("tenant")?.value ?? "");
  return cookieTenant;
}

