"use client";

import { useState } from "react";
import { Search, Filter, Download } from "lucide-react";

export default function LivroRazaoPage() {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    conta: "",
    dataInicio: new Date().toISOString().split("T")[0],
    dataFim: new Date().toISOString().split("T")[0],
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <h1 className="text-2xl font-bold text-slate-800">Livro Razão</h1>
        <button className="flex items-center gap-2 px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
          <Download className="h-4 w-4" />
          Exportar PDF/Excel
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-1 md:col-span-2">
            <label htmlFor="conta" className="block text-sm font-medium text-slate-700">
              Conta Contábil
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                id="conta"
                value={filters.conta}
                onChange={handleFilterChange}
                placeholder="Pesquise por código ou nome da conta..."
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

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

          <div className="md:col-span-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              <Filter className="h-4 w-4" />
              {loading ? "Gerando..." : "Gerar Razão"}
            </button>
          </div>
        </form>
      </div>

      {/* Tabela de Resultados */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800">Detalhamento da Conta</h3>
          <span className="text-sm text-slate-500">Saldo Anterior: R$ 0,00</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-3">Data</th>
                <th className="px-6 py-3">Histórico</th>
                <th className="px-6 py-3">Contrapartida</th>
                <th className="px-6 py-3 text-right">Débito</th>
                <th className="px-6 py-3 text-right">Crédito</th>
                <th className="px-6 py-3 text-right">Saldo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {/* Mock Data */}
              <tr className="bg-white hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">01/03/2024</td>
                <td className="px-6 py-4">Venda de Mercadorias NF 123</td>
                <td className="px-6 py-4">1.01.01.02 - Banco Itaú</td>
                <td className="px-6 py-4 text-right text-red-600"></td>
                <td className="px-6 py-4 text-right text-green-600">R$ 1.500,00</td>
                <td className="px-6 py-4 text-right font-medium text-green-600">C R$ 1.500,00</td>
              </tr>
              <tr className="bg-white hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">02/03/2024</td>
                <td className="px-6 py-4">Pagamento Fornecedor XYZ</td>
                <td className="px-6 py-4">2.01.01.01 - Fornecedores</td>
                <td className="px-6 py-4 text-right text-red-600">R$ 500,00</td>
                <td className="px-6 py-4 text-right text-green-600"></td>
                <td className="px-6 py-4 text-right font-medium text-green-600">C R$ 1.000,00</td>
              </tr>
              <tr className="bg-slate-50 font-semibold">
                <td className="px-6 py-4" colSpan={3}>Totais do Período</td>
                <td className="px-6 py-4 text-right text-red-600">R$ 500,00</td>
                <td className="px-6 py-4 text-right text-green-600">R$ 1.500,00</td>
                <td className="px-6 py-4 text-right text-green-600">C R$ 1.000,00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
