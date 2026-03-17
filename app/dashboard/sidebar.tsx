"use client";

import Link from "next/link";
import { 
  LayoutDashboard, 
  Users,
  Settings,
  LogOut
} from "lucide-react";

type MenuItem = {
  title: string;
  icon: React.ElementType;
  href?: string;
};

const MENU_ITEMS: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Usuários",
    icon: Users,
    href: "/dashboard/usuarios",
  },
  {
    title: "Configurações",
    icon: Settings,
    href: "/dashboard/configuracoes",
  },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen flex flex-col">
      <div className="p-4 border-b flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-primary-600 text-white flex items-center justify-center font-bold">A</div>
        <span className="font-semibold text-lg">Assina</span>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {MENU_ITEMS.map((item) => (
          <div key={item.title}>
            <Link
              href={item.href!}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
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
