import { NextResponse } from "next/server";
import { registerTenant } from "@/lib/assina";

function normalizeSubdomain(input: string): string {
  return input.trim().toLowerCase();
}

function isValidSubdomain(subdomain: string): boolean {
  if (subdomain.length < 3 || subdomain.length > 63) return false;
  if (subdomain.startsWith("-") || subdomain.endsWith("-")) return false;
  return /^[a-z0-9-]+$/.test(subdomain);
}

function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const company = body?.company ?? {};
    const admin = body?.admin ?? {};

    const subdomain = normalizeSubdomain(String(body?.subdomain ?? ""));
    const legalName = String(company?.legalName ?? "").trim();
    const tradeName = String(company?.tradeName ?? "").trim();
    const cnpjDigits = onlyDigits(String(company?.cnpj ?? ""));

    const adminName = String(admin?.name ?? "").trim();
    const adminEmail = String(admin?.email ?? "").trim().toLowerCase();
    const adminPhone = String(admin?.phone ?? "").trim();
    const adminPassword = String(admin?.password ?? "");

    if (!legalName || !tradeName || !cnpjDigits || !subdomain || !adminName || !adminEmail || !adminPassword) {
      return NextResponse.json({ error: "Preencha todos os campos obrigatórios." }, { status: 400 });
    }

    if (!isValidSubdomain(subdomain)) {
      return NextResponse.json(
        { error: "Subdomínio inválido. Use letras minúsculas, números e hífen." },
        { status: 400 },
      );
    }

    if (cnpjDigits.length !== 14) {
      return NextResponse.json({ error: "CNPJ deve ter 14 dígitos." }, { status: 400 });
    }

    if (!adminEmail.includes("@")) {
      return NextResponse.json({ error: "Email inválido." }, { status: 400 });
    }

    if (adminPassword.length < 6) {
      return NextResponse.json({ error: "Senha deve ter pelo menos 6 caracteres." }, { status: 400 });
    }

    const created = await registerTenant({
      company: {
        legalName,
        tradeName,
        cnpj: cnpjDigits,
      },
      admin: {
        email: adminEmail,
        password: adminPassword,
        name: adminName,
        phone: adminPhone || undefined,
      },
      subdomain,
      initialEnvironment: body?.initialEnvironment,
    });

    return NextResponse.json(
      {
        tenant: {
          tenantKey: created.tenant.tenantKey,
          status: created.tenant.status,
          trial: created.tenant.trial,
        },
        admin: {
          email: created.admin.email,
          name: created.admin.name,
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? "Erro desconhecido ao criar conta." },
      { status: 400 },
    );
  }
}
