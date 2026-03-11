"use client";

import { Save } from "lucide-react";
import { useState } from "react";

interface CentroCustoFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function CentroCustoForm({ onCancel, onSuccess }: CentroCustoFormProps) {
  const [loading, setLoading] = useState(false);
  
  // Estado para os campos
  const [formData, setFormData] = useState({
    codigo: "",
    descricao: "",
    tipo: "ANALITICO", // SINTETICO ou ANALITICO
    responsavel: "",
    ativo: true,
    aceitaLancamentos: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    
    setFormData(prev => {
      const newData = { ...prev, [id]: value };
      
      // Regra de negócio: Sintético não aceita lançamentos
      if (id === "tipo" && value === "SINTETICO") {
        newData.aceitaLancamentos = false;
      } else if (id === "tipo" && value === "ANALITICO") {
        newData.aceitaLancamentos = true;
      }
      
      return newData;
    });
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
    alert("Centro de Custo cadastrado com sucesso! (Simulação)");
    setLoading(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Dados do Centro de Custo */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Dados do Centro de Custo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="codigo" className="block text-sm font-medium text-slate-700">Código</label>
            <input
              type="text"
              id="codigo"
              value={formData.codigo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Ex: 01.01"
              required
            />
            <p className="text-xs text-slate-500">Use pontos para separar os níveis hierárquicos.</p>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="tipo" className="block text-sm font-medium text-slate-700">Tipo</label>
            <select
              id="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="ANALITICO">Analítico (Recebe Lançamentos)</option>
              <option value="SINTETICO">Sintético (Totalizador)</option>
            </select>
          </div>

          <div className="space-y-1 md:col-span-2">
            <label htmlFor="descricao" className="block text-sm font-medium text-slate-700">Descrição / Nome</label>
            <input
              type="text"
              id="descricao"
              value={formData.descricao}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Ex: Departamento de Vendas"
              required
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label htmlFor="responsavel" className="block text-sm font-medium text-slate-700">Responsável (Opcional)</label>
            <input
              type="text"
              id="responsavel"
              value={formData.responsavel}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Nome do gerente ou responsável pelo centro de custo"
            />
          </div>

          <div className="flex items-center space-x-6 pt-4 md:col-span-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="ativo"
                checked={formData.ativo}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="ativo" className="text-sm font-medium text-slate-700">
                Ativo
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="aceitaLancamentos"
                checked={formData.aceitaLancamentos}
                onChange={handleCheckboxChange}
                disabled={formData.tipo === "SINTETICO"}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:opacity-50"
              />
              <label htmlFor="aceitaLancamentos" className={`text-sm font-medium ${formData.tipo === "SINTETICO" ? "text-slate-400" : "text-slate-700"}`}>
                Aceita Lançamentos
              </label>
            </div>
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
          {loading ? "Salvando..." : "Salvar Centro de Custo"}
        </button>
      </div>
    </form>
  );
}
