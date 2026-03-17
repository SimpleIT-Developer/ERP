import { cookies, headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, BadgeCheck, FileSignature } from "lucide-react";
import { authenticateTenantAdmin, checkTenantAccess } from "@/lib/assina";

async function doLogin(formData: FormData) {
  "use server";
  const tenant = headers().get("x-tenant");
  if (!tenant || tenant === "public") {
    redirect("/");
  }

  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  const access = await checkTenantAccess(tenant);
  if (!access.ok) {
    if (access.reason === "TENANT_NOT_FOUND") redirect("/empresa-nao-cadastrada");
    if (access.reason === "TRIAL_EXPIRED") redirect("/trial-expirado");
    redirect("/");
  }

  const auth = await authenticateTenantAdmin(tenant, email, password);
  if (!auth.ok) {
    return;
  }

  cookies().set("auth", "1", { httpOnly: true, path: "/", sameSite: "lax" });
  redirect("/dashboard");
}

export default async function LoginPage() {
  const tenant = headers().get("x-tenant");
  if (!tenant || tenant === "public") {
    redirect("/");
  }

  const access = await checkTenantAccess(tenant);
  if (!access.ok) {
    if (access.reason === "TENANT_NOT_FOUND") redirect("/empresa-nao-cadastrada");
    if (access.reason === "TRIAL_EXPIRED") redirect("/trial-expirado");
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#05070f] text-white">
      <div className="relative min-h-screen">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(37,99,235,0.25),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06),transparent_45%)]" />

        <header className="mx-auto max-w-7xl px-6 pt-8">
          <div className="flex items-center justify-center">
            <Link className="inline-flex items-center gap-3" href="/">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm">
                <FileSignature className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Assina</div>
                <div className="text-xs text-slate-400">Aprovação e assinatura eletrônica</div>
              </div>
            </Link>
          </div>
        </header>

        <main className="mx-auto flex min-h-[calc(100vh-120px)] max-w-7xl items-center justify-center px-6 py-16">
          <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur">
            <div className="grid lg:grid-cols-2">
              <div className="relative overflow-hidden bg-gradient-to-b from-primary-600 to-primary-800 p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_45%)]" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/90">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    Acesso ao painel
                  </div>
                  <div className="mt-6 text-3xl font-bold tracking-tight text-white">Bem-vindo de volta</div>
                  <p className="mt-3 max-w-sm text-sm text-white/80">
                    Entre com suas credenciais para acessar documentos, aprovações e assinaturas do seu projeto.
                  </p>

                  <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs text-white/90">
                    Tenant: <span className="font-mono font-semibold text-white">{tenant}</span>
                  </div>

                  <div className="mt-10 grid gap-4 text-sm text-white/90">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                        <BadgeCheck className="h-5 w-5" />
                      </div>
                      <div className="font-semibold">Conformidade e rastreabilidade</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                        <BadgeCheck className="h-5 w-5" />
                      </div>
                      <div className="font-semibold">Fluxos e permissões por etapa</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                        <BadgeCheck className="h-5 w-5" />
                      </div>
                      <div className="font-semibold">Status em tempo real</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex p-10">
                <div className="mx-auto w-full max-w-sm">
                  <div className="text-sm font-semibold text-slate-200">Entrar</div>
                  <div className="mt-2 text-sm text-slate-400">Acesse sua conta para continuar.</div>

                  <form action={doLogin} className="mt-8 grid gap-4">
                    <div className="grid gap-2">
                      <label className="text-xs font-semibold text-slate-400" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        className="h-11 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="admin@empresa.com"
                      />
                    </div>

                    <div className="grid gap-2">
                      <label className="text-xs font-semibold text-slate-400" htmlFor="password">
                        Senha
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        className="h-11 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="********"
                      />
                    </div>

                    <button
                      className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors"
                      type="submit"
                    >
                      Entrar <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
