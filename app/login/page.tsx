import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

async function doLogin(formData: FormData) {
  "use server";
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");
  // Validação simples de credenciais
  if (username !== "admin" || password !== "admin") {
    // Em uma aplicação real, retornaríamos um erro para o formulário
    return;
  }
  
  cookies().set("auth", "1", { httpOnly: true, path: "/" });
  redirect("/dashboard");
}

export default function LoginPage() {
  const tenant = headers().get("x-tenant") ?? cookies().get("tenant")?.value ?? "public";
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="card w-full max-w-md p-8 bg-white shadow-xl rounded-xl">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-lg bg-primary-600 text-white flex items-center justify-center font-bold">E</div>
          <h1 className="mt-4 text-xl font-semibold">Entrar no ERP</h1>
          <p className="mt-1 text-sm text-slate-600">Tenant atual: <span className="font-mono">{tenant}</span></p>
        </div>
        <form action={doLogin} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Usuário</label>
            <input
              name="username"
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ring-primary-200"
              placeholder="seu@email"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Senha</label>
            <input
              name="password"
              type="password"
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ring-primary-200"
              placeholder="********"
            />
          </div>
          <button className="btn-primary w-full" type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
