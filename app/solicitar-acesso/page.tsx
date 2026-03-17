import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FileSignature } from "lucide-react";
import { registerTenant } from "@/lib/assina";
import SolicitarAcessoForm, { type SolicitarAcessoState } from "./solicitar-acesso-form";

const initialState: SolicitarAcessoState = { ok: false };

function normalizeSubdomain(input: string): string {
  return input.trim().toLowerCase();
}

function isValidSubdomain(subdomain: string): boolean {
  if (subdomain.length < 3 || subdomain.length > 63) return false;
  if (subdomain.startsWith("-") || subdomain.endsWith("-")) return false;
  return /^[a-z0-9-]+$/.test(subdomain);
}

export default function SolicitarAcessoPage() {
  const tenant = headers().get("x-tenant");
  const baseDomain = (process.env.TENANT_BASE_DOMAIN ?? "assina.simpleit.app.br").toLowerCase();

  if (tenant && tenant !== "public") {
    redirect("/");
  }

  async function action(_: SolicitarAcessoState, formData: FormData): Promise<SolicitarAcessoState> {
    "use server";

    const email = String(formData.get("email") ?? "").trim();
    const subdominioRaw = String(formData.get("subdominio") ?? "");
    const telefone = String(formData.get("telefone") ?? "").trim();
    const nome = String(formData.get("nome") ?? "").trim();
    const empresa = String(formData.get("empresa") ?? "").trim();
    const cnpj = String(formData.get("cnpj") ?? "").trim();
    const adminUsuario = String(formData.get("adminUsuario") ?? "").trim();
    const adminSenha = String(formData.get("adminSenha") ?? "");

    const subdominio = normalizeSubdomain(subdominioRaw);

    if (!email || !subdominio || !telefone || !nome || !empresa || !cnpj || !adminUsuario || !adminSenha) {
      return { ok: false, error: "Preencha todos os campos." };
    }

    if (!isValidSubdomain(subdominio)) {
      return { ok: false, error: "Subdomínio inválido. Use letras, números e hífen." };
    }

    try {
      const created = await registerTenant({
        email,
        subdominio,
        telefone,
        nome,
        empresa,
        cnpj,
        adminUsuario,
        adminSenha,
      });

      return {
        ok: true,
        tenantKey: created.tenantKey,
        trialEndsAt: new Date(created.trial.endsAt).toISOString(),
        baseDomain,
      };
    } catch (err: any) {
      const message = typeof err?.message === "string" ? err.message : "Erro ao solicitar acesso.";
      return { ok: false, error: message };
    }
  }

  return (
    <div className="min-h-screen bg-[#05070f] text-white">
      <header className="mx-auto max-w-5xl px-6 pt-8">
        <div className="flex items-center justify-between">
          <Link className="inline-flex items-center gap-3" href="/">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm">
              <FileSignature className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Assina</div>
              <div className="text-xs text-slate-400">Solicitar acesso (trial)</div>
            </div>
          </Link>
          <Link
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10 transition-colors"
            href="/"
          >
            Voltar
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-14">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-white">Cadastrar empresa</h1>
            <p className="mt-3 text-sm text-slate-300">
              Preencha os dados para liberar o acesso de avaliação. Ao finalizar, seu subdomínio fica disponível até o
              fim do período trial.
            </p>
          </div>

          <div className="mt-10">
            <SolicitarAcessoForm action={action} initialState={initialState} />
          </div>
        </div>
      </main>
    </div>
  );
}

