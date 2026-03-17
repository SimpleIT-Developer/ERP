import { redirect } from "next/navigation";
import { FileSignature } from "lucide-react";
import RegisterForm from "./register-form";
import { resolveTenantKey } from "@/lib/tenant";

export default function RegisterPage() {
  const tenant = resolveTenantKey();
  const baseDomain = (process.env.TENANT_BASE_DOMAIN ?? "assina.simpleit.app.br").toLowerCase();

  if (tenant && tenant !== "public") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <div className="p-3 bg-primary-600/10 rounded-2xl border border-primary-600/20 mb-4">
            <FileSignature className="h-10 w-10 text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Crie sua conta</h1>
          <p className="text-gray-400 text-center">
            Preencha os dados abaixo para começar a usar o Assina.
          </p>
        </div>

        <div className="bg-[#121214] border border-white/5 rounded-2xl p-8 shadow-2xl">
          <RegisterForm baseDomain={baseDomain} />
        </div>

        <div className="text-center">
          <a className="text-gray-400 hover:text-white text-sm" href="/">
            Voltar
          </a>
        </div>
      </div>
    </div>
  );
}
