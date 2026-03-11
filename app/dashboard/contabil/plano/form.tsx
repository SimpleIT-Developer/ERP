"use client";

import { Save } from "lucide-react";
import { useState } from "react";

interface PlanoContasFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function PlanoContasForm({ onCancel, onSuccess }: PlanoContasFormProps) {
  const [loading, setLoading] = useState(false);
  
  // Estado para os campos
  const [formData, setFormData] = useState({
    codigo: "",
    descricao: "",
    tipo: "ANALITICA", // SINTETICA ou ANALITICA
    natureza: "DEVEDORA", // DEVEDORA ou CREDORA
    grupo: "ATIVO", // ATIVO, PASSIVO, RECEITA, DESPESA, CUSTO
    contaPai: "",
    aceitaLancamentos: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    
    // Tratamento especial para checkbox se houver, mas aqui estamos usando select/input
    // Se fosse checkbox: const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    
    setFormData(prev => {
      const newData = { ...prev, [id]: value };
      
      // Regra de negócio simples: Sintética não aceita lançamentos
      if (id === "tipo" && value === "SINTETICA") {
        newData.aceitaLancamentos = false;
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
    alert("Conta cadastrada com sucesso! (Simulação)");
    setLoading(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Dados da Conta */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Dados da Conta</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="codigo" className="block text-sm font-medium text-slate-700">Código Classificador</label>
            <input
              type="text"
              id="codigo"
              value={formData.codigo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Ex: 1.1.01.001"
              required
            />
            <p className="text-xs text-slate-500">Use pontos para separar os níveis.</p>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="contaPai" className="block text-sm font-medium text-slate-700">Conta Pai (Superior)</label>
            <input
              type="text"
              id="contaPai"
              value={formData.contaPai}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Ex: 1.1.01"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label htmlFor="descricao" className="block text-sm font-medium text-slate-700">Descrição da Conta</label>
            <input
              type="text"
              id="descricao"
              value={formData.descricao}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Ex: Caixa Geral"
              required
            />
          </div>
        </div>
      </div>

      {/* Classificação */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Classificação</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="grupo" className="block text-sm font-medium text-slate-700">Grupo Contábil</label>
            <select
              id="grupo"
              value={formData.grupo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="ATIVO">1 - ATIVO</option>
              <option value="PASSIVO">2 - PASSIVO</option>
              <option value="RECEITA">3 - RECEITA</option>
              <option value="DESPESA">4 - DESPESA</option>
              <option value="CUSTO">5 - CUSTOS</option>
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="natureza" className="block text-sm font-medium text-slate-700">Natureza do Saldo</label>
            <select
              id="natureza"
              value={formData.natureza}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="DEVEDORA">Devedora</option>
              <option value="CREDORA">Credora</option>
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="tipo" className="block text-sm font-medium text-slate-700">Tipo da Conta</label>
            <select
              id="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="ANALITICA">Analítica (Recebe Lançamentos)</option>
              <option value="SINTETICA">Sintética (Totalizadora)</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 pt-6">
            <input
              type="checkbox"
              id="aceitaLancamentos"
              checked={formData.aceitaLancamentos}
              onChange={handleCheckboxChange}
              disabled={formData.tipo === "SINTETICA"}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="aceitaLancamentos" className="text-sm font-medium text-slate-700">
              Aceita Lançamentos
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
          {loading ? "Salvando..." : "Salvar Conta"}
        </button>
      </div>
    </form>
  );
}
