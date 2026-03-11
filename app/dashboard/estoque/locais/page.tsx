"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/app/components/ui/modal";
import { LocalEstoqueForm } from "./form";

export default function LocaisEstoqueListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Locais de Estoque</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Novo Local
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-8 text-center text-slate-500">
          <p>Nenhum local de estoque cadastrado ainda.</p>
          <p className="text-sm mt-1">Clique no botão acima para cadastrar o primeiro local de armazenamento.</p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Novo Local de Estoque"
      >
        <LocalEstoqueForm 
          onCancel={() => setIsModalOpen(false)} 
          onSuccess={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}
