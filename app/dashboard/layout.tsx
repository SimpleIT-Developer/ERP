import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Sidebar } from "./sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const auth = cookies().get("auth")?.value;
  if (!auth) {
    redirect("/login");
  }
  const tenant = headers().get("x-tenant") ?? cookies().get("tenant")?.value ?? "public";

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
             {/* Placeholder for breadcrumbs or title if needed later */}
             <div className="text-sm text-slate-500">
               ERP SaaS
             </div>
          </div>
          <div className="text-sm text-slate-600 px-3 py-1 bg-slate-100 rounded-full border">
            Tenant: <span className="font-mono font-medium text-slate-900">{tenant}</span>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
