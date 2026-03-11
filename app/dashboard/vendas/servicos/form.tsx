"use client";

import { Save } from "lucide-react";
import { useState } from "react";

interface ServicoFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function ServicoForm({ onCancel, onSuccess }: ServicoFormProps) {
  const [loading, setLoading] = useState(false);
  
  // Estado para os campos
  const [formData, setFormData] = useState({
    codigo: "",
    descricao: "",
    categoria: "",
    precoVenda: "",
    codigoServico: "", // LC 116/03
    aliquotaIss: "",
    retencaoIss: false,
    aliquotaPis: "",
    aliquotaCofins: "",
    observacoes: ""
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
    alert("Serviço cadastrado com sucesso! (Simulação)");
    setLoading(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Identificação */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Identificação do Serviço</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label htmlFor="codigo" className="block text-sm font-medium text-slate-700">Código Interno</label>
            <input
              type="text"
              id="codigo"
              value={formData.codigo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Ex: SERV-001"
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label htmlFor="descricao" className="block text-sm font-medium text-slate-700">Descrição do Serviço</label>
            <input
              type="text"
              id="descricao"
              value={formData.descricao}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Ex: Consultoria em TI"
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="categoria" className="block text-sm font-medium text-slate-700">Categoria</label>
            <select
              id="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="">Selecione</option>
              <option value="CONSULTORIA">Consultoria</option>
              <option value="MANUTENCAO">Manutenção</option>
              <option value="DESENVOLVIMENTO">Desenvolvimento</option>
              <option value="TREINAMENTO">Treinamento</option>
              <option value="OUTROS">Outros</option>
            </select>
          </div>
          <div className="space-y-1">
            <label htmlFor="precoVenda" className="block text-sm font-medium text-slate-700">Preço de Venda (R$)</label>
            <input
              type="text"
              id="precoVenda"
              value={formData.precoVenda}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-green-50 font-semibold text-green-700"
              placeholder="0,00"
              required
            />
          </div>
        </div>
      </div>

      {/* Fiscal (ISS e Impostos) */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Tributação (ISSQN)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 md:col-span-2">
            <label htmlFor="codigoServico" className="block text-sm font-medium text-slate-700">Código do Serviço (LC 116/03)</label>
            <input
              type="text"
              id="codigoServico"
              value={formData.codigoServico}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Ex: 1.07 - Suporte técnico em informática"
            />
            <p className="text-xs text-slate-500">Informe o código conforme a Lista de Serviços da Lei Complementar 116.</p>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="aliquotaIss" className="block text-sm font-medium text-slate-700">Alíquota ISS (%)</label>
            <input
              type="text"
              id="aliquotaIss"
              value={formData.aliquotaIss}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Ex: 5,00"
            />
          </div>

          <div className="flex items-center space-x-2 pt-6">
            <input
              type="checkbox"
              id="retencaoIss"
              checked={formData.retencaoIss}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="retencaoIss" className="text-sm font-medium text-slate-700">
              ISS Retido na Fonte
            </label>
          </div>

          <div className="space-y-1">
            <label htmlFor="aliquotaPis" className="block text-sm font-medium text-slate-700">Alíquota PIS (%)</label>
            <input
              type="text"
              id="aliquotaPis"
              value={formData.aliquotaPis}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Ex: 0,65"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="aliquotaCofins" className="block text-sm font-medium text-slate-700">Alíquota COFINS (%)</label>
            <input
              type="text"
              id="aliquotaCofins"
              value={formData.aliquotaCofins}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Ex: 3,00"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Observações</h3>
        <textarea
          id="observacoes"
          value={formData.observacoes}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
          placeholder="Informações adicionais sobre o serviço..."
        />
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
          {loading ? "Salvando..." : "Salvar Serviço"}
        </button>
      </div>
    </form>
  );
}
