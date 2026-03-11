"use client";

import { Save, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface BancoFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

interface Banco {
  ispb: string;
  name: string;
  code: number | null;
  fullName: string;
}

export function BancoForm({ onCancel, onSuccess }: BancoFormProps) {
  const [loading, setLoading] = useState(false);
  const [bancosList, setBancosList] = useState<Banco[]>([]);
  const [loadingBancos, setLoadingBancos] = useState(true);

  // Estado para os campos
  const [formData, setFormData] = useState({
    banco: "",
    agencia: "",
    agenciaDigito: "",
    conta: "",
    contaDigito: "",
    tipo: "CORRENTE", // CORRENTE, POUPANCA, INVESTIMENTO
    descricao: "",
    saldoInicial: "0,00",
    dataSaldo: new Date().toISOString().split("T")[0]
  });

  useEffect(() => {
    async function fetchBancos() {
      try {
        const response = await fetch("https://brasilapi.com.br/api/banks/v1");
        const data = await response.json();
        // Ordenar por código (se existir) ou nome
        const sortedData = data.sort((a: Banco, b: Banco) => {
          if (a.code && b.code) return a.code - b.code;
          return a.name.localeCompare(b.name);
        });
        setBancosList(sortedData);
      } catch (error) {
        console.error("Erro ao buscar bancos:", error);
      } finally {
        setLoadingBancos(false);
      }
    }
    fetchBancos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert("Conta Bancária cadastrada com sucesso! (Simulação)");
    setLoading(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Dados da Conta */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Dados da Conta Bancária</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 md:col-span-2">
            <label htmlFor="banco" className="block text-sm font-medium text-slate-700">
              Instituição Financeira
              {loadingBancos && <span className="ml-2 text-xs text-primary-600 animate-pulse">Carregando lista...</span>}
            </label>
            <select
              id="banco"
              value={formData.banco}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              required
            >
              <option value="">Selecione um banco</option>
              {bancosList.map((banco) => (
                <option key={banco.ispb} value={banco.code ? `${banco.code} - ${banco.name}` : banco.name}>
                  {banco.code ? `${String(banco.code).padStart(3, '0')} - ${banco.name}` : banco.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1 md:col-span-2">
            <label htmlFor="descricao" className="block text-sm font-medium text-slate-700">Descrição / Apelido</label>
            <input
              type="text"
              id="descricao"
              value={formData.descricao}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Ex: Conta Principal Itaú"
              required
            />
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1 col-span-2">
              <label htmlFor="agencia" className="block text-sm font-medium text-slate-700">Agência</label>
              <input
                type="text"
                id="agencia"
                value={formData.agencia}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                placeholder="0000"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="agenciaDigito" className="block text-sm font-medium text-slate-700">Dígito</label>
              <input
                type="text"
                id="agenciaDigito"
                value={formData.agenciaDigito}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                placeholder="X"
                maxLength={2}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1 col-span-2">
              <label htmlFor="conta" className="block text-sm font-medium text-slate-700">Conta</label>
              <input
                type="text"
                id="conta"
                value={formData.conta}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                placeholder="00000"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="contaDigito" className="block text-sm font-medium text-slate-700">Dígito</label>
              <input
                type="text"
                id="contaDigito"
                value={formData.contaDigito}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                placeholder="X"
                maxLength={2}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="tipo" className="block text-sm font-medium text-slate-700">Tipo de Conta</label>
            <select
              id="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="CORRENTE">Conta Corrente</option>
              <option value="POUPANCA">Conta Poupança</option>
              <option value="INVESTIMENTO">Conta Investimento</option>
              <option value="CAIXA">Caixa Físico</option>
            </select>
          </div>
        </div>
      </div>

      {/* Saldo Inicial */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Saldo Inicial</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="saldoInicial" className="block text-sm font-medium text-slate-700">Valor Inicial (R$)</label>
            <input
              type="text"
              id="saldoInicial"
              value={formData.saldoInicial}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="0,00"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="dataSaldo" className="block text-sm font-medium text-slate-700">Data do Saldo</label>
            <input
              type="date"
              id="dataSaldo"
              value={formData.dataSaldo}
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
          {loading ? "Salvando..." : "Salvar Conta Bancária"}
        </button>
      </div>
    </form>
  );
}
