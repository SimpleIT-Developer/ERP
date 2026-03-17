"use client";

import { useFormState, useFormStatus } from "react-dom";

export type SolicitarAcessoState =
  | { ok: false; error?: string }
  | { ok: true; tenantKey: string; trialEndsAt: string; baseDomain: string };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary-600 px-6 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors disabled:opacity-60"
      disabled={pending}
      type="submit"
    >
      {pending ? "Enviando..." : "Solicitar acesso"}
    </button>
  );
}

export default function SolicitarAcessoForm(props: {
  action: (prevState: SolicitarAcessoState, formData: FormData) => Promise<SolicitarAcessoState>;
  initialState: SolicitarAcessoState;
}) {
  const [state, formAction] = useFormState(props.action, props.initialState);

  if (state.ok) {
    const url = `https://${state.tenantKey}.${state.baseDomain}`;
    const trialEnd = new Date(state.trialEndsAt).toLocaleDateString("pt-BR");
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
        <div className="text-lg font-semibold text-emerald-200">Acesso criado com sucesso</div>
        <div className="mt-2 text-sm text-slate-200">
          Subdomínio: <span className="font-mono font-semibold">{state.tenantKey}</span>
        </div>
        <div className="mt-1 text-sm text-slate-200">Trial até: {trialEnd}</div>
        <div className="mt-4">
          <a
            className="inline-flex items-center justify-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
            href={url}
          >
            Acessar agora
          </a>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-4">
      {state.error ? (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">
          {state.error}
        </div>
      ) : null}

      <div className="grid gap-2">
        <label className="text-xs font-semibold text-slate-400" htmlFor="email">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          className="h-11 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="contato@empresa.com.br"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-xs font-semibold text-slate-400" htmlFor="subdominio">
          Subdomínio
        </label>
        <input
          id="subdominio"
          name="subdominio"
          className="h-11 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="minhaempresa"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-xs font-semibold text-slate-400" htmlFor="telefone">
          Telefone
        </label>
        <input
          id="telefone"
          name="telefone"
          className="h-11 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="(11) 99999-9999"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-xs font-semibold text-slate-400" htmlFor="nome">
          Nome
        </label>
        <input
          id="nome"
          name="nome"
          className="h-11 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Seu nome"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-xs font-semibold text-slate-400" htmlFor="empresa">
          Empresa
        </label>
        <input
          id="empresa"
          name="empresa"
          className="h-11 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Razão social / Nome fantasia"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-xs font-semibold text-slate-400" htmlFor="cnpj">
          CNPJ
        </label>
        <input
          id="cnpj"
          name="cnpj"
          className="h-11 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="00.000.000/0000-00"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-xs font-semibold text-slate-400" htmlFor="adminUsuario">
          Usuário admin
        </label>
        <input
          id="adminUsuario"
          name="adminUsuario"
          className="h-11 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="admin"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-xs font-semibold text-slate-400" htmlFor="adminSenha">
          Senha
        </label>
        <input
          id="adminSenha"
          name="adminSenha"
          type="password"
          className="h-11 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="********"
        />
      </div>

      <SubmitButton />
    </form>
  );
}

