"use client";

import { Plus, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/app/components/ui/modal";
import { NotaFiscalForm } from "./form";

export default function NotasFiscaisListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"TODOS" | "NFE" | "NFSE">("TODOS");

  // Mock de notas emitidas
  const [notas, setNotas] = useState([
    {
      id: "1",
      numero: "001",
      serie: "1",
      tipo: "NFE",
      cliente: "Cliente Exemplo Ltda",
      dataEmissao: "2024-03-01",
      status: "AUTORIZADA",
      valor: 1500.00
    },
    {
      id: "2",
      numero: "2024001",
      serie: "U",
      tipo: "NFSE",
      cliente: "Consumidor Final",
      dataEmissao: "2024-03-02",
      status: "PROCESSANDO",
      valor: 350.00
    }
  ]);

  const filteredNotas = activeTab === "TODOS" 
    ? notas 
    : notas.filter(n => n.tipo === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Emissão de Notas Fiscais</h1>
          <p className="text-slate-500 text-sm">Gerencie a emissão de NF-e (Produtos) e NFS-e (Serviços)</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Nova Nota Fiscal
        </button>
      </div>

      {/* Tabs de Filtro */}
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("TODOS")}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
              ${activeTab === "TODOS"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"}
            `}
          >
            Todas
          </button>
          <button
            onClick={() => setActiveTab("NFE")}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
              ${activeTab === "NFE"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"}
            `}
          >
            NF-e (Produtos)
          </button>
          <button
            onClick={() => setActiveTab("NFSE")}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
              ${activeTab === "NFSE"
                ? "border-purple-500 text-purple-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"}
            `}
          >
            NFS-e (Serviços)
          </button>
        </nav>
      </div>

      {/* Lista de Notas */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {filteredNotas.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <p>Nenhuma nota fiscal encontrada.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3">Número/Série</th>
                  <th className="px-6 py-3">Tipo</th>
                  <th className="px-6 py-3">Cliente</th>
                  <th className="px-6 py-3">Emissão</th>
                  <th className="px-6 py-3 text-center">Status</th>
                  <th className="px-6 py-3 text-right">Valor Total</th>
                  <th className="px-6 py-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredNotas.map((nota) => (
                  <tr key={nota.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {nota.numero} <span className="text-slate-400">/ {nota.serie}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        nota.tipo === 'NFE' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {nota.tipo === 'NFE' ? 'NF-e' : 'NFS-e'}
                      </span>
                    </td>
                    <td className="px-6 py-4">{nota.cliente}</td>
                    <td className="px-6 py-4">{nota.dataEmissao.split('-').reverse().join('/')}</td>
                    <td className="px-6 py-4 text-center">
                      {nota.status === 'AUTORIZADA' ? (
                        <span className="inline-flex items-center gap-1 text-green-700 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
                          <CheckCircle className="h-3 w-3" /> Autorizada
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-700 text-xs font-medium bg-amber-50 px-2 py-1 rounded-full">
                          <AlertCircle className="h-3 w-3" /> Processando
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-slate-900">
                      R$ {nota.valor.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-primary-600 hover:text-primary-900 font-medium text-xs">
                        Ver PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Emitir Nova Nota Fiscal"
      >
        <NotaFiscalForm 
          onCancel={() => setIsModalOpen(false)} 
          onSuccess={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}
