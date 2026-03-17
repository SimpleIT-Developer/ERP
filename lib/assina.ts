import { connectMongo } from "@/lib/mongo";
import { AssinaClient } from "@/lib/models/assina-client";
import { hashPassword, verifyPassword } from "@/lib/password";
import { PlatformAdmin } from "@/lib/models/platform-admin";
import mongoose from "mongoose";

function normalizeTenantKey(input: string): string {
  return input.trim().toLowerCase();
}

function addDays(date: Date, days: number): Date {
  const ms = days * 24 * 60 * 60 * 1000;
  return new Date(date.getTime() + ms);
}

export type TenantAccessResult =
  | { ok: true; tenant: Awaited<ReturnType<typeof getTenantByKey>> }
  | { ok: false; reason: "TENANT_NOT_FOUND" | "TRIAL_EXPIRED" | "TENANT_BLOCKED" | "TENANT_DISABLED" };

export async function getTenantByKey(tenantKey: string) {
  await connectMongo();
  return AssinaClient.findOne({ tenantKey: normalizeTenantKey(tenantKey) }).lean();
}

export async function checkTenantAccess(tenantKey: string): Promise<TenantAccessResult> {
  const tenant = await getTenantByKey(tenantKey);
  if (!tenant) return { ok: false, reason: "TENANT_NOT_FOUND" };

  if (tenant.access?.blocked) return { ok: false, reason: "TENANT_BLOCKED" };
  if (tenant.status !== "trial" && tenant.status !== "active") return { ok: false, reason: "TENANT_DISABLED" };

  if (tenant.status === "trial") {
    const endsAt = tenant.trial?.endsAt ? new Date(tenant.trial.endsAt) : null;
    if (endsAt && !Number.isNaN(endsAt.getTime()) && Date.now() > endsAt.getTime()) {
      return { ok: false, reason: "TRIAL_EXPIRED" };
    }
  }

  return { ok: true, tenant };
}

export type RegisterTenantInput = {
  company: {
    legalName: string;
    tradeName: string;
    cnpj: string;
  };
  admin: {
    email: string;
    password: string;
    name: string;
    phone?: string;
  };
  subdomain: string;
  initialEnvironment?: {
    webserviceBaseUrl: string;
    authMode: "bearer";
  };
};

export async function isSubdomainAvailable(subdominio: string): Promise<boolean> {
  await connectMongo();
  await AssinaClient.init();
  const tenantKey = normalizeTenantKey(subdominio);
  const exists = await AssinaClient.exists({ tenantKey });
  return !exists;
}

export async function registerTenant(input: RegisterTenantInput) {
  await connectMongo();
  await AssinaClient.init();
  await PlatformAdmin.init();

  const tenantKey = normalizeTenantKey(input.subdomain);
  const available = await isSubdomainAvailable(tenantKey);
  if (!available) {
    throw new Error("Subdomínio já cadastrado");
  }

  const existingAdmin = await PlatformAdmin.exists({
    email: input.admin.email.trim().toLowerCase(),
  });
  if (existingAdmin) {
    throw new Error("Já existe um administrador com este email.");
  }

  const now = new Date();
  const trialDays = Number(process.env.TRIAL_DAYS ?? "7") || 7;
  const endsAt = addDays(now, trialDays);
  const pwd = await hashPassword(input.admin.password);
  const passwordHash = `${pwd.salt}:${pwd.hash}`;

  const baseDomain = (process.env.TENANT_BASE_DOMAIN ?? "assina.simpleit.app.br").toLowerCase();
  const tenantHost = `${tenantKey}.${baseDomain}`;
  const environments = input.initialEnvironment?.webserviceBaseUrl
    ? [
        {
          name: "Produção",
          enabled: true,
          webserviceBaseUrl: String(input.initialEnvironment.webserviceBaseUrl ?? "").trim(),
          restBaseUrl: "",
          soapDataServerUrl: "",
          authMode: input.initialEnvironment.authMode ?? "bearer",
          tokenEndpoint: "",
          modules: {},
          menus: {},
          MOVIMENTOS_SOLICITACAO_COMPRAS: [],
          MOVIMENTOS_ORDEM_COMPRA: [],
          MOVIMENTOS_NOTA_FISCAL_PRODUTO: [],
          MOVIMENTOS_NOTA_FISCAL_SERVICO: [],
          MOVIMENTOS_OUTRAS_MOVIMENTACOES: [],
        },
      ]
    : [];

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const createdTenant = await AssinaClient.create(
      [
        {
          tenantKey,
          status: "trial",
          company: {
            legalName: input.company.legalName.trim(),
            tradeName: input.company.tradeName.trim(),
            cnpj: input.company.cnpj.trim(),
          },
          domains: { tenantHost },
          environments,
          trial: {
            startedAt: now,
            endsAt,
            days: trialDays,
          },
          access: {
            blocked: false,
            blockedReason: null,
          },
          audit: {
            createdAt: now,
            createdBy: "self_signup",
          },
        },
      ],
      { session },
    );

    const tenant = createdTenant[0];

    const createdAdmin = await PlatformAdmin.create(
      [
        {
          tenantId: tenant._id,
          email: input.admin.email.trim().toLowerCase(),
          name: input.admin.name.trim(),
          phone: (input.admin.phone ?? "").trim(),
          passwordHash,
          role: "tenant_admin",
          createdAt: now,
        },
      ],
      { session },
    );

    await session.commitTransaction();
    return { tenant: tenant.toObject(), admin: createdAdmin[0].toObject() };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

export async function authenticateTenantAdmin(tenantKey: string, emailOrUsername: string, password: string) {
  await connectMongo();
  const tenant = await AssinaClient.findOne({ tenantKey: normalizeTenantKey(tenantKey) });
  if (!tenant) return { ok: false as const, reason: "TENANT_NOT_FOUND" as const };

  const access = await checkTenantAccess(tenantKey);
  if (!access.ok) return { ok: false as const, reason: access.reason };

  const provided = emailOrUsername.trim().toLowerCase();
  const admin = await PlatformAdmin.findOne({ tenantId: tenant._id, email: provided });
  if (!admin) return { ok: false as const, reason: "INVALID_CREDENTIALS" as const };

  const parts = String(admin.passwordHash ?? "").split(":");
  if (parts.length !== 2) return { ok: false as const, reason: "INVALID_CREDENTIALS" as const };

  const valid = await verifyPassword(password, { salt: parts[0], hash: parts[1] });

  if (!valid) return { ok: false as const, reason: "INVALID_CREDENTIALS" as const };

  return { ok: true as const, tenant: tenant.toObject() };
}
