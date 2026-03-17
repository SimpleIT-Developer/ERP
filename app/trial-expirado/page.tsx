import Link from "next/link";
import { AlertTriangle, FileSignature } from "lucide-react";
import { resolveTenantKey } from "@/lib/tenant";

export default function TrialExpiradoPage() {
  const tenant = resolveTenantKey();

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
              <div className="text-xs text-slate-400">Período trial expirado</div>
            </div>
          </Link>
          <Link
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10 transition-colors"
            href="/"
          >
            Ir para Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-14">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-200">
            <AlertTriangle className="h-4 w-4" />
            Período de avaliação expirado
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-white">Seu acesso está indisponível</h1>
          <p className="mt-3 text-sm text-slate-300">
            O trial desta empresa expirou. Se precisar reativar, entre em contato com a SimpleIT.
          </p>

          {tenant ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-200">
              Tenant: <span className="font-mono font-semibold text-white">{tenant}</span>
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary-600 px-5 text-sm font-semibold text-white hover:bg-primary-500 transition-colors"
              href="/solicitar-acesso"
            >
              Solicitar novo acesso
            </Link>
            <Link
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              href="/"
            >
              Voltar para Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
