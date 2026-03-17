import { connectMongo } from "@/lib/mongo";
import { AssinaClient } from "@/lib/models/assina-client";
import { hashPassword, verifyPassword } from "@/lib/password";

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
  email: string;
  subdominio: string;
  telefone: string;
  nome: string;
  empresa: string;
  cnpj: string;
  adminUsuario: string;
  adminSenha: string;
};

export async function isSubdomainAvailable(subdominio: string): Promise<boolean> {
  await connectMongo();
  const tenantKey = normalizeTenantKey(subdominio);
  const exists = await AssinaClient.exists({ tenantKey });
  return !exists;
}

export async function registerTenant(input: RegisterTenantInput) {
  await connectMongo();

  const tenantKey = normalizeTenantKey(input.subdominio);
  const available = await isSubdomainAvailable(tenantKey);
  if (!available) {
    throw new Error("Subdomínio já cadastrado");
  }

  const now = new Date();
  const trialDays = Number(process.env.TRIAL_DAYS ?? "7") || 7;
  const endsAt = addDays(now, trialDays);
  const pwd = await hashPassword(input.adminSenha);

  const doc = await AssinaClient.create({
    tenantKey,
    email: input.email.trim().toLowerCase(),
    telefone: input.telefone.trim(),
    nome: input.nome.trim(),
    empresa: input.empresa.trim(),
    cnpj: input.cnpj.trim(),
    admin: {
      username: input.adminUsuario.trim(),
      passwordSalt: pwd.salt,
      passwordHash: pwd.hash,
    },
    status: "trial",
    access: {
      blocked: false,
      blockedReason: null,
    },
    trial: {
      startedAt: now,
      endsAt,
      days: trialDays,
    },
  });

  return doc.toObject();
}

export async function authenticateTenantAdmin(tenantKey: string, username: string, password: string) {
  await connectMongo();
  const tenant = await AssinaClient.findOne({ tenantKey: normalizeTenantKey(tenantKey) });
  if (!tenant) return { ok: false as const, reason: "TENANT_NOT_FOUND" as const };

  const access = await checkTenantAccess(tenantKey);
  if (!access.ok) return { ok: false as const, reason: access.reason };

  if (tenant.admin.username !== username) {
    return { ok: false as const, reason: "INVALID_CREDENTIALS" as const };
  }

  const valid = await verifyPassword(password, {
    salt: tenant.admin.passwordSalt,
    hash: tenant.admin.passwordHash,
  });

  if (!valid) return { ok: false as const, reason: "INVALID_CREDENTIALS" as const };

  return { ok: true as const, tenant: tenant.toObject() };
}

