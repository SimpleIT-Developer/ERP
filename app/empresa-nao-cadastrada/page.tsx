import Link from "next/link";
import { Building2, FileSignature } from "lucide-react";
import { headers } from "next/headers";
import { resolveTenantKey } from "@/lib/tenant";

export default function EmpresaNaoCadastradaPage() {
  const tenant = resolveTenantKey();
  const baseDomain = (process.env.TENANT_BASE_DOMAIN ?? "assina.simpleit.app.br").toLowerCase();
  const proto = headers().get("x-forwarded-proto") ?? (process.env.NODE_ENV === "development" ? "http" : "https");
  const landingUrl = `${proto}://${baseDomain}`;
  const registerUrl = `${landingUrl}/register`;

  return (
    <div className="min-h-screen bg-[#05070f] text-white">
      <header className="mx-auto max-w-5xl px-6 pt-8">
        <div className="flex items-center justify-between">
          <Link className="inline-flex items-center gap-3" href={landingUrl}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm">
              <FileSignature className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Assina</div>
              <div className="text-xs text-slate-400">Empresa não cadastrada</div>
            </div>
          </Link>
          <Link
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10 transition-colors"
            href={landingUrl}
          >
            Ir para Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-14">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-xs font-semibold text-sky-200">
            <Building2 className="h-4 w-4" />
            Empresa não cadastrada
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-white">Essa empresa não está cadastrada</h1>
          <p className="mt-3 text-sm text-slate-300">
            Não encontramos o subdomínio informado na base. Use o botão abaixo para solicitar acesso no período trial.
          </p>

          {tenant ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-200">
              Subdomínio: <span className="font-mono font-semibold text-white">{tenant}</span>
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary-600 px-5 text-sm font-semibold text-white hover:bg-primary-500 transition-colors"
              href={registerUrl}
            >
              Solicitar acesso
            </Link>
            <Link
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              href={landingUrl}
            >
              Voltar para Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
