"use client";

import { Save } from "lucide-react";
import { useState, useEffect } from "react";

interface NotaEntradaFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function NotaEntradaForm({ onCancel, onSuccess }: NotaEntradaFormProps) {
  const [loading, setLoading] = useState(false);
  const [fornecedores, setFornecedores] = useState<any[]>([]); // Mock list
  const [locaisEstoque, setLocaisEstoque] = useState<any[]>([]); // Mock list
  
  // Estado para os campos
  const [formData, setFormData] = useState({
    tipo: "PRODUTO", // PRODUTO (NFe) ou SERVICO (NFSe)
    numero: "",
    serie: "",
    modelo: "55", // 55 (NFe), 65 (NFCe), SE (Serviço)
    chaveAcesso: "", // Apenas NFe
    dataEmissao: new Date().toISOString().split("T")[0],
    dataEntrada: new Date().toISOString().split("T")[0],
    fornecedorId: "",
    valorTotal: "",
    valorProdutosServicos: "",
    valorFrete: "",
    valorSeguro: "",
    valorDesconto: "",
    valorOutrasDespesas: "",
    // Impostos
    valorICMS: "",
    valorIPI: "",
    valorPIS: "",
    valorCOFINS: "",
    valorISS: "", // Apenas Serviço
    valorIRRF: "", // Retenção Serviço
    valorINSS: "", // Retenção Serviço
    valorCSLL: "", // Retenção Serviço
    // Integração
    localEstoqueId: "", // Apenas Produto
    centroCustoId: "", // Para financeiro
    observacoes: ""
  });

  // Mock fetch de fornecedores e locais
  useEffect(() => {
    // Aqui buscaria da API real
    setFornecedores([
      { id: "1", nome: "Fornecedor A Ltda" },
      { id: "2", nome: "Distribuidora XYZ" }
    ]);
    setLocaisEstoque([
      { id: "1", nome: "Almoxarifado Principal" },
      { id: "2", nome: "Depósito Filial 1" }
    ]);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    setFormData(prev => {
      const newData = { ...prev, [id]: value };
      
      // Auto-ajuste de modelo base no tipo
      if (id === "tipo") {
        if (value === "PRODUTO") {
          newData.modelo = "55";
          newData.valorISS = "";
          newData.valorIRRF = "";
          newData.valorINSS = "";
          newData.valorCSLL = "";
        } else {
          newData.modelo = "SE";
          newData.chaveAcesso = "";
          newData.valorICMS = "";
          newData.valorIPI = "";
          newData.localEstoqueId = "";
        }
      }
      
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert("Nota de Entrada registrada com sucesso! Estoque e Financeiro atualizados (Simulação).");
    setLoading(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto px-1">
      {/* Cabeçalho da Nota */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Dados da Nota Fiscal</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-1 md:col-span-1">
            <label htmlFor="tipo" className="block text-sm font-medium text-slate-700">Tipo de Nota</label>
            <select
              id="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="PRODUTO">Produto (NF-e)</option>
              <option value="SERVICO">Serviço (NFS-e)</option>
            </select>
          </div>

          <div className="space-y-1 md:col-span-1">
            <label htmlFor="modelo" className="block text-sm font-medium text-slate-700">Modelo</label>
            <input
              type="text"
              id="modelo"
              value={formData.modelo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-slate-100"
              readOnly
            />
          </div>

          <div className="space-y-1 md:col-span-1">
            <label htmlFor="numero" className="block text-sm font-medium text-slate-700">Número</label>
            <input
              type="text"
              id="numero"
              value={formData.numero}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Ex: 123456"
              required
            />
          </div>

          <div className="space-y-1 md:col-span-1">
            <label htmlFor="serie" className="block text-sm font-medium text-slate-700">Série</label>
            <input
              type="text"
              id="serie"
              value={formData.serie}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Ex: 1"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label htmlFor="fornecedorId" className="block text-sm font-medium text-slate-700">Fornecedor</label>
            <select
              id="fornecedorId"
              value={formData.fornecedorId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              required
            >
              <option value="">Selecione um fornecedor...</option>
              {fornecedores.map(f => (
                <option key={f.id} value={f.id}>{f.nome}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1 md:col-span-1">
            <label htmlFor="dataEmissao" className="block text-sm font-medium text-slate-700">Emissão</label>
            <input
              type="date"
              id="dataEmissao"
              value={formData.dataEmissao}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              required
            />
          </div>

          <div className="space-y-1 md:col-span-1">
            <label htmlFor="dataEntrada" className="block text-sm font-medium text-slate-700">Entrada/Recebimento</label>
            <input
              type="date"
              id="dataEntrada"
              value={formData.dataEntrada}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              required
            />
          </div>

          {formData.tipo === "PRODUTO" && (
            <div className="space-y-1 md:col-span-4">
              <label htmlFor="chaveAcesso" className="block text-sm font-medium text-slate-700">Chave de Acesso (44 dígitos)</label>
              <input
                type="text"
                id="chaveAcesso"
                value={formData.chaveAcesso}
                onChange={handleChange}
                maxLength={44}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white font-mono text-sm"
                placeholder="0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000"
              />
            </div>
          )}
        </div>
      </div>

      {/* Valores e Impostos */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Totais e Impostos</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label htmlFor="valorProdutosServicos" className="block text-sm font-medium text-slate-700">Valor Prod/Serv</label>
            <input
              type="text"
              id="valorProdutosServicos"
              value={formData.valorProdutosServicos}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="0,00"
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="valorFrete" className="block text-sm font-medium text-slate-700">Frete</label>
            <input
              type="text"
              id="valorFrete"
              value={formData.valorFrete}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="0,00"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="valorSeguro" className="block text-sm font-medium text-slate-700">Seguro</label>
            <input
              type="text"
              id="valorSeguro"
              value={formData.valorSeguro}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="0,00"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="valorOutrasDespesas" className="block text-sm font-medium text-slate-700">Outras Desp.</label>
            <input
              type="text"
              id="valorOutrasDespesas"
              value={formData.valorOutrasDespesas}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="0,00"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="valorDesconto" className="block text-sm font-medium text-slate-700">Desconto (-)</label>
            <input
              type="text"
              id="valorDesconto"
              value={formData.valorDesconto}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-red-600"
              placeholder="0,00"
            />
          </div>

          <div className="space-y-1 md:col-start-4">
             <label htmlFor="valorTotal" className="block text-sm font-bold text-slate-800">Valor Total da Nota</label>
            <input
              type="text"
              id="valorTotal"
              value={formData.valorTotal}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white font-bold text-lg text-primary-700"
              placeholder="0,00"
              required
            />
          </div>

          {/* Impostos Condicionais */}
          {formData.tipo === "PRODUTO" ? (
            <>
              <div className="space-y-1">
                <label htmlFor="valorICMS" className="block text-sm font-medium text-slate-500">ICMS</label>
                <input type="text" id="valorICMS" value={formData.valorICMS} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50" placeholder="0,00" />
              </div>
              <div className="space-y-1">
                <label htmlFor="valorIPI" className="block text-sm font-medium text-slate-500">IPI</label>
                <input type="text" id="valorIPI" value={formData.valorIPI} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50" placeholder="0,00" />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1">
                <label htmlFor="valorISS" className="block text-sm font-medium text-slate-500">ISS</label>
                <input type="text" id="valorISS" value={formData.valorISS} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50" placeholder="0,00" />
              </div>
              <div className="space-y-1">
                <label htmlFor="valorIRRF" className="block text-sm font-medium text-slate-500">IRRF (Retido)</label>
                <input type="text" id="valorIRRF" value={formData.valorIRRF} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50" placeholder="0,00" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Integração */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Integração e Destino</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.tipo === "PRODUTO" && (
            <div className="space-y-1">
              <label htmlFor="localEstoqueId" className="block text-sm font-medium text-slate-700">Local de Estoque (Entrada Física)</label>
              <select
                id="localEstoqueId"
                value={formData.localEstoqueId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                <option value="">Selecione o local de armazenamento...</option>
                {locaisEstoque.map(l => (
                  <option key={l.id} value={l.id}>{l.nome}</option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-1">
            <label htmlFor="centroCustoId" className="block text-sm font-medium text-slate-700">Centro de Custo (Financeiro)</label>
            <select
              id="centroCustoId"
              value={formData.centroCustoId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="">Selecione o centro de custo...</option>
              <option value="1">1.01 - Administrativo</option>
              <option value="2">2.01 - Produção</option>
            </select>
          </div>
          
          <div className="space-y-1 md:col-span-2">
            <label htmlFor="observacoes" className="block text-sm font-medium text-slate-700">Observações</label>
            <textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              placeholder="Informações adicionais..."
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t sticky bottom-0 bg-white py-2">
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
          {loading ? "Processando..." : "Registrar Nota"}
        </button>
      </div>
    </form>
  );
}
