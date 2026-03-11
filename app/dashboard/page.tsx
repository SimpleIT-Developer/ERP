export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Visão Geral</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card p-6 bg-white shadow-sm rounded-lg border">
          <div className="text-sm text-slate-500 font-medium">Faturamento (30d)</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">R$ 124.540</div>
          <div className="mt-1 text-xs text-green-600 font-medium">+12% vs mês anterior</div>
        </div>
        <div className="card p-6 bg-white shadow-sm rounded-lg border">
          <div className="text-sm text-slate-500 font-medium">Pedidos</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">1.283</div>
          <div className="mt-1 text-xs text-green-600 font-medium">+5% vs mês anterior</div>
        </div>
        <div className="card p-6 bg-white shadow-sm rounded-lg border">
          <div className="text-sm text-slate-500 font-medium">Clientes ativos</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">612</div>
          <div className="mt-1 text-xs text-slate-400 font-medium">Estável</div>
        </div>
      </div>

      <div className="mt-8 p-8 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400">
        <div className="text-center">
          <p>Selecione um módulo no menu lateral para começar.</p>
        </div>
      </div>
    </div>
  );
}
