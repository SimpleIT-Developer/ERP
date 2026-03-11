"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/app/components/ui/modal";
import { PlanoContasForm } from "./form";

export default function PlanoContasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Plano de Contas</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nova Conta
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-8 text-center text-slate-500">
          <p>Nenhuma conta cadastrada ainda.</p>
          <p className="text-sm mt-1">Clique no botão acima para cadastrar a primeira conta contábil.</p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nova Conta Contábil"
      >
        <PlanoContasForm 
          onCancel={() => setIsModalOpen(false)} 
          onSuccess={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}
