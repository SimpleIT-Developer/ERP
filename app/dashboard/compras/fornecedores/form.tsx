"use client";

import { Save, Loader2 } from "lucide-react";
import { useState } from "react";

interface FornecedorFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function FornecedorForm({ onCancel, onSuccess }: FornecedorFormProps) {
  const [loading, setLoading] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);
  
  // Estados para endereço
  const [endereco, setEndereco] = useState({
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: ""
  });

  const handleCepBlur = async () => {
    const cep = endereco.cep.replace(/\D/g, "");
    if (cep.length !== 8) return;

    setCepLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setEndereco(prev => ({
          ...prev,
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf
        }));
        // Foca no campo número após preencher
        document.getElementById("numero")?.focus();
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setCepLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    if (id in endereco) {
      setEndereco(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert("Dados enviados com sucesso! (Simulação)");
    setLoading(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Dados Básicos */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Dados Básicos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="cnpj" className="block text-sm font-medium text-slate-700">CNPJ / CPF</label>
            <input
              type="text"
              id="cnpj"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="00.000.000/0000-00"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="ie" className="block text-sm font-medium text-slate-700">Inscrição Estadual</label>
            <input
              type="text"
              id="ie"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Isento ou número"
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label htmlFor="razao_social" className="block text-sm font-medium text-slate-700">Razão Social / Nome Completo</label>
            <input
              type="text"
              id="razao_social"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              required
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label htmlFor="nome_fantasia" className="block text-sm font-medium text-slate-700">Nome Fantasia</label>
            <input
              type="text"
              id="nome_fantasia"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            />
          </div>
        </div>
      </div>

      {/* Contato */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Contato</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">E-mail</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="contato@empresa.com.br"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="telefone" className="block text-sm font-medium text-slate-700">Telefone / Celular</label>
            <input
              type="tel"
              id="telefone"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="(00) 00000-0000"
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label htmlFor="contato" className="block text-sm font-medium text-slate-700">Pessoa de Contato</label>
            <input
              type="text"
              id="contato"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Nome do responsável"
            />
          </div>
        </div>
      </div>

      {/* Endereço */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Endereço</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label htmlFor="cep" className="block text-sm font-medium text-slate-700">
              CEP
              {cepLoading && <span className="ml-2 text-xs text-primary-600 animate-pulse">Buscando...</span>}
            </label>
            <div className="relative">
              <input
                type="text"
                id="cep"
                value={endereco.cep}
                onChange={handleChange}
                onBlur={handleCepBlur}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white pr-10"
                placeholder="00000-000"
                maxLength={9}
              />
              {cepLoading && (
                <div className="absolute right-3 top-2.5">
                  <Loader2 className="h-4 w-4 animate-spin text-primary-600" />
                </div>
              )}
            </div>
          </div>
          <div className="space-y-1 md:col-span-2">
            <label htmlFor="logradouro" className="block text-sm font-medium text-slate-700">Logradouro</label>
            <input
              type="text"
              id="logradouro"
              value={endereco.logradouro}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-slate-100"
              placeholder="Rua, Avenida, etc."
              readOnly
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="numero" className="block text-sm font-medium text-slate-700">Número</label>
            <input
              type="text"
              id="numero"
              value={endereco.numero}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="complemento" className="block text-sm font-medium text-slate-700">Complemento</label>
            <input
              type="text"
              id="complemento"
              value={endereco.complemento}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="bairro" className="block text-sm font-medium text-slate-700">Bairro</label>
            <input
              type="text"
              id="bairro"
              value={endereco.bairro}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-slate-100"
              readOnly
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="cidade" className="block text-sm font-medium text-slate-700">Cidade</label>
            <input
              type="text"
              id="cidade"
              value={endereco.cidade}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-slate-100"
              readOnly
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="uf" className="block text-sm font-medium text-slate-700">UF</label>
            <select
              id="uf"
              value={endereco.uf}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-slate-100"
              disabled // UF geralmente vem preenchido e não deve mudar se a cidade for fixa
            >
              <option value="">Selecione</option>
              <option value="SP">SP</option>
              <option value="RJ">RJ</option>
              <option value="MG">MG</option>
              <option value="PR">PR</option>
              <option value="RS">RS</option>
              <option value="SC">SC</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="DF">DF</option>
              <option value="MS">MS</option>
              <option value="MT">MT</option>
              <option value="BA">BA</option>
              <option value="PE">PE</option>
              <option value="CE">CE</option>
              {/* Adicionar outros estados se necessário, ou popular dinamicamente */}
            </select>
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
          {loading ? "Salvando..." : "Salvar Fornecedor"}
        </button>
      </div>
    </form>
  );
}
