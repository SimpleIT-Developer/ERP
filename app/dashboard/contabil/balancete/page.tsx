"use client";

import { useState } from "react";
import { Download, Filter, Search } from "lucide-react";

export default function BalancetePage() {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    dataInicio: new Date().getFullYear() + "-01-01",
    dataFim: new Date().toISOString().split("T")[0],
    grau: "5", // Nível de detalhamento
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de busca
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Balancete de Verificação</h1>
        <button className="flex items-center gap-2 px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
          <Download className="h-4 w-4" />
          Exportar PDF/Excel
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-1">
            <label htmlFor="dataInicio" className="block text-sm font-medium text-slate-700">
              Data Início
            </label>
            <input
              type="date"
              id="dataInicio"
              value={filters.dataInicio}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="dataFim" className="block text-sm font-medium text-slate-700">
              Data Fim
            </label>
            <input
              type="date"
              id="dataFim"
              value={filters.dataFim}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="grau" className="block text-sm font-medium text-slate-700">
              Grau de Detalhe
            </label>
            <select
              id="grau"
              value={filters.grau}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="1">Grau 1 (Grupo)</option>
              <option value="2">Grau 2 (Subgrupo)</option>
              <option value="3">Grau 3 (Conta)</option>
              <option value="4">Grau 4 (Subconta)</option>
              <option value="5">Grau 5 (Analítica)</option>
            </select>
          </div>

          <div className="md:col-span-1 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 w-full justify-center"
            >
              <Filter className="h-4 w-4" />
              {loading ? "Gerando..." : "Gerar Balancete"}
            </button>
          </div>
        </form>
      </div>

      {/* Tabela de Resultados */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-3 w-32">Conta</th>
                <th className="px-6 py-3">Descrição</th>
                <th className="px-6 py-3 text-right">Saldo Anterior</th>
                <th className="px-6 py-3 text-right">Débito</th>
                <th className="px-6 py-3 text-right">Crédito</th>
                <th className="px-6 py-3 text-right">Saldo Atual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {/* Mock Data - Ativo */}
              <tr className="bg-slate-50 font-bold text-slate-900">
                <td className="px-6 py-3">1</td>
                <td className="px-6 py-3">ATIVO</td>
                <td className="px-6 py-3 text-right">R$ 100.000,00 D</td>
                <td className="px-6 py-3 text-right">R$ 50.000,00</td>
                <td className="px-6 py-3 text-right">R$ 20.000,00</td>
                <td className="px-6 py-3 text-right">R$ 130.000,00 D</td>
              </tr>
              <tr className="bg-white hover:bg-slate-50 font-semibold">
                <td className="px-6 py-3 pl-10">1.1</td>
                <td className="px-6 py-3">CIRCULANTE</td>
                <td className="px-6 py-3 text-right">R$ 80.000,00 D</td>
                <td className="px-6 py-3 text-right">R$ 40.000,00</td>
                <td className="px-6 py-3 text-right">R$ 15.000,00</td>
                <td className="px-6 py-3 text-right">R$ 105.000,00 D</td>
              </tr>
              <tr className="bg-white hover:bg-slate-50">
                <td className="px-6 py-3 pl-14">1.1.1</td>
                <td className="px-6 py-3">CAIXA E EQUIVALENTES</td>
                <td className="px-6 py-3 text-right">R$ 30.000,00 D</td>
                <td className="px-6 py-3 text-right">R$ 20.000,00</td>
                <td className="px-6 py-3 text-right">R$ 10.000,00</td>
                <td className="px-6 py-3 text-right">R$ 40.000,00 D</td>
              </tr>
              <tr className="bg-white hover:bg-slate-50 text-slate-600">
                <td className="px-6 py-3 pl-20">1.1.1.01</td>
                <td className="px-6 py-3">Caixa Geral</td>
                <td className="px-6 py-3 text-right">R$ 5.000,00 D</td>
                <td className="px-6 py-3 text-right">R$ 2.000,00</td>
                <td className="px-6 py-3 text-right">R$ 1.000,00</td>
                <td className="px-6 py-3 text-right">R$ 6.000,00 D</td>
              </tr>
              <tr className="bg-white hover:bg-slate-50 text-slate-600">
                <td className="px-6 py-3 pl-20">1.1.1.02</td>
                <td className="px-6 py-3">Bancos Conta Movimento</td>
                <td className="px-6 py-3 text-right">R$ 25.000,00 D</td>
                <td className="px-6 py-3 text-right">R$ 18.000,00</td>
                <td className="px-6 py-3 text-right">R$ 9.000,00</td>
                <td className="px-6 py-3 text-right">R$ 34.000,00 D</td>
              </tr>
              
              {/* Mock Data - Passivo */}
              <tr className="bg-slate-50 font-bold text-slate-900">
                <td className="px-6 py-3">2</td>
                <td className="px-6 py-3">PASSIVO</td>
                <td className="px-6 py-3 text-right">R$ 60.000,00 C</td>
                <td className="px-6 py-3 text-right">R$ 10.000,00</td>
                <td className="px-6 py-3 text-right">R$ 30.000,00</td>
                <td className="px-6 py-3 text-right">R$ 80.000,00 C</td>
              </tr>
              <tr className="bg-white hover:bg-slate-50 font-semibold">
                <td className="px-6 py-3 pl-10">2.1</td>
                <td className="px-6 py-3">CIRCULANTE</td>
                <td className="px-6 py-3 text-right">R$ 40.000,00 C</td>
                <td className="px-6 py-3 text-right">R$ 10.000,00</td>
                <td className="px-6 py-3 text-right">R$ 20.000,00</td>
                <td className="px-6 py-3 text-right">R$ 50.000,00 C</td>
              </tr>
            </tbody>
            <tfoot className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
               <tr>
                <td className="px-6 py-4" colSpan={2}>TOTAIS</td>
                <td className="px-6 py-4 text-right">R$ 0,00</td>
                <td className="px-6 py-4 text-right">R$ 60.000,00</td>
                <td className="px-6 py-4 text-right">R$ 60.000,00</td>
                <td className="px-6 py-4 text-right">R$ 0,00</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
