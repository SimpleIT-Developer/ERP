"use client";

import { Save, Calculator } from "lucide-react";
import { useState, useEffect } from "react";

interface ProdutoFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function ProdutoForm({ onCancel, onSuccess }: ProdutoFormProps) {
  const [loading, setLoading] = useState(false);
  
  // Estado para os campos
  const [formData, setFormData] = useState({
    codigo: "",
    ean: "",
    descricao: "",
    unidade: "UN",
    categoria: "",
    marca: "",
    ncm: "",
    cest: "",
    origem: "0", // 0 - Nacional
    precoCusto: "",
    margemLucro: "",
    precoVenda: "",
    estoqueAtual: "0",
    estoqueMinimo: "0",
    estoqueMaximo: "0",
    pesoBruto: "",
    pesoLiquido: ""
  });

  // Cálculo automático do Preço de Venda ao alterar Custo ou Margem
  const calcularPrecoVenda = (custo: number, margem: number) => {
    if (!custo) return "";
    const valorMargem = custo * (margem / 100);
    return (custo + valorMargem).toFixed(2).replace(".", ",");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    
    setFormData(prev => {
      const newData = { ...prev, [id]: value };

      // Lógica de cálculo de preço
      if (id === "precoCusto" || id === "margemLucro") {
        const custo = parseFloat(newData.precoCusto.replace(",", ".") || "0");
        const margem = parseFloat(newData.margemLucro.replace(",", ".") || "0");
        
        if (custo > 0 && margem >= 0) {
          newData.precoVenda = calcularPrecoVenda(custo, margem);
        }
      }

      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert("Produto cadastrado com sucesso! (Simulação)");
    setLoading(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Identificação */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Identificação</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label htmlFor="codigo" className="block text-sm font-medium text-slate-700">Código (SKU)</label>
            <input
              type="text"
              id="codigo"
              value={formData.codigo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Ex: PROD-001"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="ean" className="block text-sm font-medium text-slate-700">Código de Barras (EAN)</label>
            <input
              type="text"
              id="ean"
              value={formData.ean}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="789..."
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="unidade" className="block text-sm font-medium text-slate-700">Unidade</label>
            <select
              id="unidade"
              value={formData.unidade}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="UN">Unidade (UN)</option>
              <option value="KG">Quilograma (KG)</option>
              <option value="LT">Litro (LT)</option>
              <option value="CX">Caixa (CX)</option>
              <option value="MT">Metro (MT)</option>
              <option value="PC">Peça (PC)</option>
            </select>
          </div>
          <div className="space-y-1 md:col-span-3">
            <label htmlFor="descricao" className="block text-sm font-medium text-slate-700">Descrição do Produto</label>
            <input
              type="text"
              id="descricao"
              value={formData.descricao}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Ex: Caneta Esferográfica Azul"
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
              <option value="MATERIA_PRIMA">Matéria Prima</option>
              <option value="PRODUTO_ACABADO">Produto Acabado</option>
              <option value="EMBALAGEM">Embalagem</option>
              <option value="REVENDA">Mercadoria para Revenda</option>
            </select>
          </div>
          <div className="space-y-1 md:col-span-2">
            <label htmlFor="marca" className="block text-sm font-medium text-slate-700">Marca / Fabricante</label>
            <input
              type="text"
              id="marca"
              value={formData.marca}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            />
          </div>
        </div>
      </div>

      {/* Precificação */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Precificação</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label htmlFor="precoCusto" className="block text-sm font-medium text-slate-700">Preço de Custo (R$)</label>
            <input
              type="text"
              id="precoCusto"
              value={formData.precoCusto}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="0,00"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="margemLucro" className="block text-sm font-medium text-slate-700">Margem de Lucro (%)</label>
            <div className="relative">
              <input
                type="text"
                id="margemLucro"
                value={formData.margemLucro}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white pr-8"
                placeholder="0"
              />
              <div className="absolute right-3 top-2.5 text-slate-400">
                <Calculator className="h-4 w-4" />
              </div>
            </div>
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
            />
          </div>
        </div>
      </div>

      {/* Fiscal e Estoque */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Fiscal e Estoque</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label htmlFor="ncm" className="block text-sm font-medium text-slate-700">NCM</label>
            <input
              type="text"
              id="ncm"
              value={formData.ncm}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="0000.00.00"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="origem" className="block text-sm font-medium text-slate-700">Origem</label>
            <select
              id="origem"
              value={formData.origem}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="0">0 - Nacional</option>
              <option value="1">1 - Estrangeira (Importação direta)</option>
              <option value="2">2 - Estrangeira (Adq. no mercado interno)</option>
            </select>
          </div>
          <div className="space-y-1">
            <label htmlFor="estoqueAtual" className="block text-sm font-medium text-slate-700">Estoque Atual</label>
            <input
              type="number"
              id="estoqueAtual"
              value={formData.estoqueAtual}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            />
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
          {loading ? "Salvando..." : "Salvar Produto"}
        </button>
      </div>
    </form>
  );
}
