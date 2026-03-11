import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">ERP SaaS multi-tenant</h1>
          <p className="mt-4 text-slate-600">
            Use subdomínios em produção e, localmente, passe o parâmetro
            <span className="font-mono bg-slate-100 border rounded px-1 py-0.5 mx-1">?tenant=cliente1</span>
            para simular o tenant.
          </p>
          <div className="mt-6 flex gap-3">
            <Link className="btn-primary" href="/login">Ir para Login</Link>
            <Link className="inline-flex items-center rounded-lg border px-4 py-2 hover:bg-slate-100" href="/dashboard">Ver Dashboard</Link>
          </div>
        </div>
        <div className="card p-6">
          <div className="text-sm text-slate-600">Acesso rápido</div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Link className="card p-4 hover:ring-slate-300" href="/login?tenant=cliente1">Login cliente1</Link>
            <Link className="card p-4 hover:ring-slate-300" href="/login?tenant=cliente2">Login cliente2</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
