"use client";

import { Plus, FileText, Package, Wrench } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/app/components/ui/modal";
import { NotaEntradaForm } from "./form";

export default function NotasEntradaListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"TODOS" | "PRODUTO" | "SERVICO">("TODOS");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Notas de Entrada</h1>
          <p className="text-slate-500 text-sm">Gerencie o recebimento de Notas Fiscais (NF-e) e Serviços (NFS-e)</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Registrar Nota
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
            <FileText className="h-4 w-4" />
            Todas
          </button>
          <button
            onClick={() => setActiveTab("PRODUTO")}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
              ${activeTab === "PRODUTO"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"}
            `}
          >
            <Package className="h-4 w-4" />
            Produtos (NF-e)
          </button>
          <button
            onClick={() => setActiveTab("SERVICO")}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
              ${activeTab === "SERVICO"
                ? "border-purple-500 text-purple-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"}
            `}
          >
            <Wrench className="h-4 w-4" />
            Serviços (NFS-e)
          </button>
        </nav>
      </div>

      {/* Lista Vazia (Placeholder) */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden min-h-[300px] flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-slate-50 p-4 rounded-full mb-4">
          <FileText className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-1">Nenhuma nota registrada</h3>
        <p className="text-slate-500 max-w-sm mx-auto mb-6">
          Comece registrando a entrada de notas fiscais de fornecedores para alimentar o estoque e o financeiro.
        </p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="text-primary-600 font-medium hover:text-primary-700 hover:underline"
        >
          Registrar primeira nota agora
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nova Nota de Entrada"
      >
        <NotaEntradaForm 
          onCancel={() => setIsModalOpen(false)} 
          onSuccess={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}
