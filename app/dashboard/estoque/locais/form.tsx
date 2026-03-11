"use client";

import { Save } from "lucide-react";
import { useState } from "react";

interface LocalEstoqueFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function LocalEstoqueForm({ onCancel, onSuccess }: LocalEstoqueFormProps) {
  const [loading, setLoading] = useState(false);
  
  // Estado para os campos
  const [formData, setFormData] = useState({
    nome: "",
    tipo: "FISICO", // FISICO, TERCEIROS, TRANSITO, VIRTUAL
    responsavel: "",
    descricao: "",
    ativo: true,
    endereco: "",
    capacidade: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData(prev => ({ ...prev, [id]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert("Local de Estoque cadastrado com sucesso! (Simulação)");
    setLoading(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Dados do Local */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Dados do Local de Estoque</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 md:col-span-2">
            <label htmlFor="nome" className="block text-sm font-medium text-slate-700">Nome do Local</label>
            <input
              type="text"
              id="nome"
              value={formData.nome}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Ex: Almoxarifado Principal, Depósito Filial 1"
              required
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="tipo" className="block text-sm font-medium text-slate-700">Tipo de Local</label>
            <select
              id="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="FISICO">Físico (Interno)</option>
              <option value="TERCEIROS">Em Terceiros (Externo)</option>
              <option value="TRANSITO">Em Trânsito</option>
              <option value="VIRTUAL">Virtual (Lógico)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="responsavel" className="block text-sm font-medium text-slate-700">Responsável</label>
            <input
              type="text"
              id="responsavel"
              value={formData.responsavel}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Nome do responsável pelo local"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label htmlFor="descricao" className="block text-sm font-medium text-slate-700">Descrição / Observações</label>
            <textarea
              id="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Detalhes adicionais sobre o local..."
            />
          </div>
        </div>
      </div>

      {/* Endereço e Capacidade */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Localização e Capacidade</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 md:col-span-2">
            <label htmlFor="endereco" className="block text-sm font-medium text-slate-700">Endereço / Localização Física</label>
            <input
              type="text"
              id="endereco"
              value={formData.endereco}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Ex: Rua A, Galpão 3, Corredor B"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="capacidade" className="block text-sm font-medium text-slate-700">Capacidade Estimada (m³ ou Qtd)</label>
            <input
              type="text"
              id="capacidade"
              value={formData.capacidade}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Opcional"
            />
          </div>

          <div className="flex items-center space-x-2 pt-6">
            <input
              type="checkbox"
              id="ativo"
              checked={formData.ativo}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="ativo" className="text-sm font-medium text-slate-700">
              Local Ativo
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {loading ? "Salvando..." : "Salvar Local"}
        </button>
      </div>
    </form>
  );
}
