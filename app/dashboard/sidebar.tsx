"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  CreditCard, 
  Calculator, 
  FileText, 
  Package, 
  BarChart3, 
  ChevronDown, 
  ChevronRight,
  LogOut
} from "lucide-react";

type MenuItem = {
  title: string;
  icon: React.ElementType;
  href?: string;
  submenu?: { title: string; href: string }[];
};

const MENU_ITEMS: MenuItem[] = [
  {
    title: "Visão Geral",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Gestão Financeira",
    icon: CreditCard,
    submenu: [
      { title: "Contas a Pagar", href: "/dashboard/financeiro/pagar" },
      { title: "Contas a Receber", href: "/dashboard/financeiro/receber" },
      { title: "Fluxo de Caixa", href: "/dashboard/financeiro/fluxo" },
      { title: "Conciliação Bancária", href: "/dashboard/financeiro/conciliacao" },
      { title: "Bancos e Caixas", href: "/dashboard/financeiro/bancos" },
      { title: "Centros de Custo", href: "/dashboard/financeiro/centros-custo" },
      { title: "Naturezas Financeiras", href: "/dashboard/financeiro/naturezas" },
    ],
  },
  {
    title: "Gestão de Compras",
    icon: ShoppingCart,
    submenu: [
      { title: "Cotações", href: "/dashboard/compras/cotacoes" },
      { title: "Fornecedores", href: "/dashboard/compras/fornecedores" },
      { title: "Notas de Entrada", href: "/dashboard/compras/notas-entrada" },
      { title: "Pedidos de Compra", href: "/dashboard/compras/pedidos" },
    ],
  },
  {
    title: "Gestão de Faturamento",
    icon: FileText,
    submenu: [
      { title: "Pedidos de Venda", href: "/dashboard/vendas/pedidos" },
      { title: "Clientes", href: "/dashboard/vendas/clientes" },
      { title: "Serviços", href: "/dashboard/vendas/servicos" },
      { title: "Notas Fiscais", href: "/dashboard/vendas/notas-fiscais" },
      { title: "Expedição", href: "/dashboard/vendas/expedicao" }
    ],
  },
  {
    title: "Gestão Contábil",
    icon: Calculator,
    submenu: [
      { title: "Plano de Contas", href: "/dashboard/contabil/plano" },
      { title: "Livro Razão", href: "/dashboard/contabil/razao" },
      { title: "Balancete", href: "/dashboard/contabil/balancete" },
      { title: "Lançamentos Contábeis", href: "/dashboard/contabil/lancamentos" },
      { title: "DRE", href: "/dashboard/contabil/dre" },
      { title: "Balanço Patrimonial", href: "/dashboard/contabil/balanco" },
    ],
  },
  {
    title: "Gestão Fiscal",
    icon: FileText, // Reusing icon for simplicity, or could use another
    submenu: [
      { title: "Livros Fiscais", href: "/dashboard/fiscal/livros" },
      { title: "Apuração de Impostos", href: "/dashboard/fiscal/apuracao" },
      { title: "SPED", href: "/dashboard/fiscal/sped" },
    ],
  },
  {
    title: "Gestão de Estoque",
    icon: Package,
    submenu: [
      { title: "Produtos", href: "/dashboard/estoque/produtos" },
      { title: "Locais de Estoque", href: "/dashboard/estoque/locais" },
      { title: "Movimentações", href: "/dashboard/estoque/movimentacoes" },
      { title: "Inventário", href: "/dashboard/estoque/inventario" },
    ],
  },
  {
    title: "Relatórios",
    icon: BarChart3,
    href: "/dashboard/relatorios",
  },
];

export function Sidebar() {
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <aside className="w-64 bg-white border-r min-h-screen flex flex-col">
      <div className="p-4 border-b flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-primary-600 text-white flex items-center justify-center font-bold">E</div>
        <span className="font-semibold text-lg">ERP SaaS</span>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {MENU_ITEMS.map((item) => (
          <div key={item.title}>
            {item.submenu ? (
              <div>
                <button
                  onClick={() => toggleMenu(item.title)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </div>
                  {openMenus.includes(item.title) ? (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  )}
                </button>
                {openMenus.includes(item.title) && (
                  <div className="ml-9 mt-1 space-y-1 border-l-2 border-slate-100 pl-2">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block px-3 py-1.5 text-sm text-slate-500 rounded-md hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href!}
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            )}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t">
        <form action="/api/logout" method="post">
          <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors">
            <LogOut className="h-4 w-4" />
            Sair do Sistema
          </button>
        </form>
      </div>
    </aside>
  );
}
