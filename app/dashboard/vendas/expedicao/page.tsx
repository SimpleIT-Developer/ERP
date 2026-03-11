"use client";

import { useState } from "react";
import { 
  CheckSquare, 
  Truck, 
  Printer, 
  Barcode, 
  Box,
  ArrowRight
} from "lucide-react";

// Mock data for orders
const INITIAL_ORDERS = [
  { 
    id: "PED-001", 
    cliente: "Tech Solutions Ltda", 
    data: "2024-03-01", 
    itens: [
      { produto: "Notebook Dell Latitude", qtd: 2, sku: "DELL-LAT-5420" },
      { produto: "Mouse Logitech MX Master 3", qtd: 2, sku: "LOG-MX-3" }
    ],
    status: "Aguardando Conferência",
    transportadora: "Correios"
  },
  { 
    id: "PED-002", 
    cliente: "Consultoria Silva & Santos", 
    data: "2024-03-02", 
    itens: [
      { produto: "Monitor LG 27'' 4K", qtd: 1, sku: "LG-27-4K" }
    ],
    status: "Conferido",
    transportadora: "Jadlog"
  },
  { 
    id: "PED-003", 
    cliente: "Mercado Local S.A.", 
    data: "2024-03-03", 
    itens: [
      { produto: "Impressora Epson EcoTank", qtd: 1, sku: "EPS-L3150" },
      { produto: "Papel A4 Chamex (Caixa)", qtd: 5, sku: "CHA-A4-CX" }
    ],
    status: "Aguardando Conferência",
    transportadora: "Azul Cargo"
  },
];

const CARRIERS = [
  { id: 1, name: "Correios", status: "Conectado", logo: "📦" },
  { id: 2, name: "Jadlog", status: "Conectado", logo: "🚛" },
  { id: 3, name: "Azul Cargo", status: "Desconectado", logo: "✈️" },
  { id: 4, name: "Loggi", status: "Desconectado", logo: "🛵" },
];

export default function ExpedicaoPage() {
  const [activeTab, setActiveTab] = useState<'conferencia' | 'etiquetas' | 'transportadoras'>('conferencia');
  const [pedidos, setPedidos] = useState(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<typeof INITIAL_ORDERS[0] | null>(null);
  const [conferenciaItems, setConferenciaItems] = useState<Record<string, number>>({});

  // Conferência Logic
  const handleStartConferencia = (order: typeof INITIAL_ORDERS[0]) => {
    setSelectedOrder(order);
    // Initialize check count for each item to 0
    const initialCheck: Record<string, number> = {};
    order.itens.forEach(item => {
      initialCheck[item.sku] = 0;
    });
    setConferenciaItems(initialCheck);
  };

  const handleCheckItem = (sku: string) => {
    setConferenciaItems(prev => ({
      ...prev,
      [sku]: (prev[sku] || 0) + 1
    }));
  };

  const handleFinishConferencia = () => {
    if (!selectedOrder) return;
    
    // Check if all items are fully checked
    const allChecked = selectedOrder.itens.every(item => 
      (conferenciaItems[item.sku] || 0) >= item.qtd
    );

    if (allChecked) {
      setPedidos(prev => prev.map(p => 
        p.id === selectedOrder.id ? { ...p, status: "Conferido" } : p
      ));
      setSelectedOrder(null);
      alert("Conferência concluída com sucesso!");
    } else {
      alert("Ainda há itens pendentes de conferência.");
    }
  };

  // Etiquetas Logic
  const handleGenerateLabel = (orderId: string) => {
    setPedidos(prev => prev.map(p => 
      p.id === orderId ? { ...p, status: "Etiqueta Gerada" } : p
    ));
    alert(`Etiqueta gerada para o pedido ${orderId}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Expedição</h1>
          <p className="text-slate-500">Gerencie conferência, etiquetas e envios.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('conferencia')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'conferencia' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50 border'}`}
          >
            <CheckSquare className="w-4 h-4 inline-block mr-2" />
            Conferência
          </button>
          <button 
            onClick={() => setActiveTab('etiquetas')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'etiquetas' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50 border'}`}
          >
            <Printer className="w-4 h-4 inline-block mr-2" />
            Etiquetas
          </button>
          <button 
            onClick={() => setActiveTab('transportadoras')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'transportadoras' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50 border'}`}
          >
            <Truck className="w-4 h-4 inline-block mr-2" />
            Transportadoras
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[500px]">
        
        {/* TAB: CONFERÊNCIA */}
        {activeTab === 'conferencia' && (
          <div className="p-6">
            {!selectedOrder ? (
              // List of orders to check
              <div>
                <h2 className="text-lg font-semibold mb-4">Pedidos Aguardando Conferência</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-600 border-b">
                      <tr>
                        <th className="px-4 py-3">Pedido</th>
                        <th className="px-4 py-3">Cliente</th>
                        <th className="px-4 py-3">Data</th>
                        <th className="px-4 py-3">Itens</th>
                        <th className="px-4 py-3">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {pedidos.filter(p => p.status === "Aguardando Conferência").map(pedido => (
                        <tr key={pedido.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-medium">{pedido.id}</td>
                          <td className="px-4 py-3">{pedido.cliente}</td>
                          <td className="px-4 py-3">{pedido.data}</td>
                          <td className="px-4 py-3">{pedido.itens.length} itens</td>
                          <td className="px-4 py-3">
                            <button 
                              onClick={() => handleStartConferencia(pedido)}
                              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                            >
                              Iniciar <ArrowRight className="w-3 h-3" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {pedidos.filter(p => p.status === "Aguardando Conferência").length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                            Nenhum pedido aguardando conferência.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              // Active Conference View
              <div>
                <div className="flex items-center justify-between mb-6 border-b pb-4">
                  <div>
                    <button 
                      onClick={() => setSelectedOrder(null)}
                      className="text-sm text-slate-500 hover:text-slate-800 mb-1"
                    >
                      ← Voltar
                    </button>
                    <h2 className="text-xl font-bold">Conferência: {selectedOrder.id}</h2>
                    <p className="text-slate-500 text-sm">Cliente: {selectedOrder.cliente}</p>
                  </div>
                  <button 
                    onClick={handleFinishConferencia}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Finalizar Conferência
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Scanner Simulation */}
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center">
                    <Barcode className="w-16 h-16 text-slate-300 mb-4" />
                    <h3 className="text-lg font-medium text-slate-700 mb-2">Simular Leitura de Código de Barras</h3>
                    <p className="text-sm text-slate-500 mb-4">Clique nos itens abaixo para simular a leitura do scanner.</p>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3">
                    {selectedOrder.itens.map((item) => {
                      const checkedQty = conferenciaItems[item.sku] || 0;
                      const isComplete = checkedQty >= item.qtd;
                      
                      return (
                        <div 
                          key={item.sku}
                          onClick={() => !isComplete && handleCheckItem(item.sku)}
                          className={`p-4 rounded-lg border transition-all cursor-pointer ${
                            isComplete 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-slate-900">{item.produto}</p>
                              <p className="text-xs text-slate-500">SKU: {item.sku}</p>
                            </div>
                            <div className="text-right">
                              <span className={`text-lg font-bold ${isComplete ? 'text-green-600' : 'text-slate-700'}`}>
                                {checkedQty} / {item.qtd}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-300 ${isComplete ? 'bg-green-500' : 'bg-blue-500'}`} 
                              style={{ width: `${Math.min((checkedQty / item.qtd) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: ETIQUETAS */}
        {activeTab === 'etiquetas' && (
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Gerar Etiquetas de Envio</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 border-b">
                  <tr>
                    <th className="px-4 py-3">Pedido</th>
                    <th className="px-4 py-3">Cliente</th>
                    <th className="px-4 py-3">Transportadora</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pedidos.filter(p => p.status === "Conferido" || p.status === "Etiqueta Gerada").map(pedido => (
                    <tr key={pedido.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium">{pedido.id}</td>
                      <td className="px-4 py-3">{pedido.cliente}</td>
                      <td className="px-4 py-3 flex items-center gap-2">
                        <Truck className="w-4 h-4 text-slate-400" />
                        {pedido.transportadora}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          pedido.status === "Etiqueta Gerada" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {pedido.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {pedido.status === "Conferido" ? (
                          <button 
                            onClick={() => handleGenerateLabel(pedido.id)}
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                          >
                            <Printer className="w-4 h-4" /> Gerar Etiqueta
                          </button>
                        ) : (
                          <button className="text-slate-400 cursor-not-allowed flex items-center gap-1">
                            <CheckSquare className="w-4 h-4" /> Pronta
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {pedidos.filter(p => p.status === "Conferido" || p.status === "Etiqueta Gerada").length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                        Nenhum pedido pronto para geração de etiqueta.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: TRANSPORTADORAS */}
        {activeTab === 'transportadoras' && (
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-6">Integrações com Transportadoras</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CARRIERS.map(carrier => (
                <div key={carrier.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{carrier.logo}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      carrier.status === "Conectado" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      {carrier.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{carrier.name}</h3>
                  <p className="text-sm text-slate-500 mb-6">
                    Integração para cálculo de frete e geração de etiquetas automática.
                  </p>
                  <button className={`w-full py-2 rounded-lg font-medium transition-colors ${
                    carrier.status === "Conectado"
                      ? "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}>
                    {carrier.status === "Conectado" ? "Configurar" : "Conectar"}
                  </button>
                </div>
              ))}
              
              {/* Add Custom Carrier */}
              <div className="border border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Box className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="font-medium text-slate-900">Adicionar Outra</h3>
                <p className="text-sm text-slate-500 mt-1">Configurar integração manual ou API personalizada</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
