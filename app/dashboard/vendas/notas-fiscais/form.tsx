"use client";

import { Save, Plus, Trash } from "lucide-react";
import { useState, useEffect } from "react";

interface NotaFiscalFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

interface ItemNota {
  id: string;
  produtoServicoId: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

export function NotaFiscalForm({ onCancel, onSuccess }: NotaFiscalFormProps) {
  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState<any[]>([]); // Mock
  const [produtos, setProdutos] = useState<any[]>([]); // Mock
  const [servicos, setServicos] = useState<any[]>([]); // Mock

  // Estado para os campos da nota
  const [formData, setFormData] = useState({
    tipo: "NFE", // NFE (Produto) ou NFSE (Serviço)
    numero: "", // Será gerado automaticamente
    serie: "1",
    dataEmissao: new Date().toISOString().split("T")[0],
    clienteId: "",
    observacoes: "",
    condicaoPagamento: "A_VISTA",
    naturezaOperacao: "VENDA", // VENDA, DEVOLUCAO, REMESSA
  });

  // Estado para os itens da nota
  const [itens, setItens] = useState<ItemNota[]>([]);
  
  // Estado para adicionar novo item
  const [novoItem, setNovoItem] = useState({
    produtoServicoId: "",
    quantidade: 1,
    valorUnitario: 0,
  });

  // Mock data fetching
  useEffect(() => {
    setClientes([
      { id: "1", nome: "Cliente Exemplo Ltda" },
      { id: "2", nome: "Consumidor Final" }
    ]);
    setProdutos([
      { id: "1", nome: "Produto A", preco: 100.00 },
      { id: "2", nome: "Produto B", preco: 50.00 }
    ]);
    setServicos([
      { id: "1", nome: "Consultoria Técnica", preco: 200.00 },
      { id: "2", nome: "Manutenção", preco: 150.00 }
    ]);
  }, []);

  // Handlers para o cabeçalho
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Limpar itens ao trocar de tipo
    if (id === "tipo") {
      setItens([]);
      setNovoItem({ produtoServicoId: "", quantidade: 1, valorUnitario: 0 });
    }
  };

  // Handlers para adição de itens
  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    
    if (id === "produtoServicoId") {
      const lista = formData.tipo === "NFE" ? produtos : servicos;
      const selecionado = lista.find(p => p.id === value);
      
      setNovoItem(prev => ({
        ...prev,
        produtoServicoId: value,
        valorUnitario: selecionado ? selecionado.preco : 0
      }));
    } else {
      setNovoItem(prev => ({ ...prev, [id]: parseFloat(value) || 0 }));
    }
  };

  const adicionarItem = () => {
    if (!novoItem.produtoServicoId || novoItem.quantidade <= 0) return;

    const lista = formData.tipo === "NFE" ? produtos : servicos;
    const itemInfo = lista.find(p => p.id === novoItem.produtoServicoId);

    const novoItemCompleto: ItemNota = {
      id: Math.random().toString(36).substr(2, 9),
      produtoServicoId: novoItem.produtoServicoId,
      descricao: itemInfo ? itemInfo.nome : "Item Desconhecido",
      quantidade: novoItem.quantidade,
      valorUnitario: novoItem.valorUnitario,
      valorTotal: novoItem.quantidade * novoItem.valorUnitario
    };

    setItens(prev => [...prev, novoItemCompleto]);
    
    // Resetar campos de adição
    setNovoItem({
      produtoServicoId: "",
      quantidade: 1,
      valorUnitario: 0
    });
  };

  const removerItem = (id: string) => {
    setItens(prev => prev.filter(item => item.id !== id));
  };

  // Cálculos de Totais
  const totalNota = itens.reduce((acc, item) => acc + item.valorTotal, 0);
  const totalImpostosEstimados = totalNota * (formData.tipo === "NFE" ? 0.18 : 0.05); // Mock: 18% ICMS ou 5% ISS

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (itens.length === 0) {
      alert("Adicione pelo menos um item à nota fiscal.");
      return;
    }

    setLoading(true);
    // Simulação de emissão
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert("Nota Fiscal emitida e enviada para a SEFAZ/Prefeitura com sucesso! (Simulação)");
    setLoading(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto px-1">
      {/* Cabeçalho */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Dados da Emissão</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label htmlFor="tipo" className="block text-sm font-medium text-slate-700">Tipo de Nota</label>
            <select
              id="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="NFE">NF-e (Produto)</option>
              <option value="NFSE">NFS-e (Serviço)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="naturezaOperacao" className="block text-sm font-medium text-slate-700">Natureza da Operação</label>
            <select
              id="naturezaOperacao"
              value={formData.naturezaOperacao}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="VENDA">Venda</option>
              <option value="REMESSA">Remessa</option>
              <option value="DEVOLUCAO">Devolução</option>
            </select>
          </div>

          <div className="space-y-1 md:col-span-2">
            <label htmlFor="clienteId" className="block text-sm font-medium text-slate-700">Destinatário / Cliente</label>
            <select
              id="clienteId"
              value={formData.clienteId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              required
            >
              <option value="">Selecione um cliente...</option>
              {clientes.map(c => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="dataEmissao" className="block text-sm font-medium text-slate-700">Data de Emissão</label>
            <input
              type="date"
              id="dataEmissao"
              value={formData.dataEmissao}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="condicaoPagamento" className="block text-sm font-medium text-slate-700">Condição de Pagamento</label>
            <select
              id="condicaoPagamento"
              value={formData.condicaoPagamento}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="A_VISTA">À Vista</option>
              <option value="A_PRAZO">À Prazo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Itens da Nota */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Itens da Nota</h3>
          <span className="text-xs text-slate-500">{formData.tipo === "NFE" ? "Produtos" : "Serviços"}</span>
        </div>
        
        {/* Formulário de Adição de Item */}
        <div className="p-4 bg-slate-50/50 border-b border-slate-200 grid grid-cols-12 gap-3 items-end">
          <div className="col-span-12 md:col-span-5">
            <label className="block text-xs font-medium text-slate-700 mb-1">Descrição</label>
            <select
              id="produtoServicoId"
              value={novoItem.produtoServicoId}
              onChange={handleItemChange}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Selecione...</option>
              {(formData.tipo === "NFE" ? produtos : servicos).map(item => (
                <option key={item.id} value={item.id}>{item.nome}</option>
              ))}
            </select>
          </div>
          <div className="col-span-4 md:col-span-2">
            <label className="block text-xs font-medium text-slate-700 mb-1">Qtd</label>
            <input
              type="number"
              id="quantidade"
              value={novoItem.quantidade}
              onChange={handleItemChange}
              min="1"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="col-span-4 md:col-span-3">
            <label className="block text-xs font-medium text-slate-700 mb-1">Valor Unit.</label>
            <input
              type="number"
              id="valorUnitario"
              value={novoItem.valorUnitario}
              onChange={handleItemChange}
              step="0.01"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="col-span-4 md:col-span-2">
            <button
              type="button"
              onClick={adicionarItem}
              className="w-full flex items-center justify-center gap-1 bg-white border border-primary-600 text-primary-600 px-3 py-2 rounded-md hover:bg-primary-50 transition-colors text-sm font-medium"
            >
              <Plus className="h-4 w-4" />
              Adicionar
            </button>
          </div>
        </div>

        {/* Lista de Itens */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b">
              <tr>
                <th className="px-4 py-2">Descrição</th>
                <th className="px-4 py-2 text-right">Qtd</th>
                <th className="px-4 py-2 text-right">Vl. Unit.</th>
                <th className="px-4 py-2 text-right">Total</th>
                <th className="px-4 py-2 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {itens.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500 italic">
                    Nenhum item adicionado ainda.
                  </td>
                </tr>
              ) : (
                itens.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2 font-medium text-slate-900">{item.descricao}</td>
                    <td className="px-4 py-2 text-right">{item.quantidade}</td>
                    <td className="px-4 py-2 text-right">R$ {item.valorUnitario.toFixed(2)}</td>
                    <td className="px-4 py-2 text-right font-medium">R$ {item.valorTotal.toFixed(2)}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => removerItem(item.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot className="bg-slate-50 font-semibold text-slate-900 border-t">
              <tr>
                <td colSpan={3} className="px-4 py-3 text-right">Total dos Itens:</td>
                <td className="px-4 py-3 text-right">R$ {totalNota.toFixed(2)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Rodapé Totais */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-500">
            <p>Impostos Estimados ({formData.tipo === "NFE" ? "ICMS/IPI" : "ISS"}): <span className="font-medium text-slate-700">R$ {totalImpostosEstimados.toFixed(2)}</span></p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-slate-500">Valor Total da Nota</p>
              <p className="text-2xl font-bold text-primary-700">R$ {totalNota.toFixed(2)}</p>
            </div>
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
          disabled={loading || itens.length === 0}
          className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 shadow-md"
        >
          <Save className="h-4 w-4" />
          {loading ? "Emitindo..." : "Emitir Nota Fiscal"}
        </button>
      </div>
    </form>
  );
}
