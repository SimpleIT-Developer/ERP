"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Building2, Check, Globe, Loader2, Lock, Mail, Phone, User, Link as LinkIcon, X } from "lucide-react";

function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

function formatCnpj(value: string): string {
  let v = onlyDigits(value);
  if (v.length > 14) v = v.slice(0, 14);
  v = v.replace(/^(\d{2})(\d)/, "$1.$2");
  v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
  v = v.replace(/(\d{4})(\d)/, "$1-$2");
  return v;
}

function normalizeSubdomain(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9-]/g, "");
}

function isValidSubdomain(value: string): boolean {
  if (value.length < 3 || value.length > 63) return false;
  if (value.startsWith("-") || value.endsWith("-")) return false;
  return /^[a-z0-9-]+$/.test(value);
}

type RegisterState =
  | { ok: false; error?: string }
  | { ok: true; tenantKey: string; url: string };

export default function RegisterForm(props: { baseDomain: string }) {
  const baseDomain = props.baseDomain;

  const [legalName, setLegalName] = useState("");
  const [tradeName, setTradeName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [adminName, setAdminName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [webserviceBaseUrl, setWebserviceBaseUrl] = useState("");

  const [isRegistering, setIsRegistering] = useState(false);
  const [isCheckingSubdomain, setIsCheckingSubdomain] = useState(false);
  const [isSubdomainAvailable, setIsSubdomainAvailable] = useState<boolean | null>(null);
  const [state, setState] = useState<RegisterState>({ ok: false });

  const tenantUrl = useMemo(() => {
    const key = subdomain || "cliente";
    return `https://${key}.${baseDomain}`;
  }, [subdomain, baseDomain]);

  useEffect(() => {
    const current = subdomain;
    if (!current || current.length < 3 || !isValidSubdomain(current)) {
      setIsSubdomainAvailable(null);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsCheckingSubdomain(true);
      try {
        const res = await fetch(`/api/tenant/check-subdomain/${encodeURIComponent(current)}`);
        const data = await res.json();
        setIsSubdomainAvailable(Boolean(data?.available));
      } catch {
        setIsSubdomainAvailable(null);
      } finally {
        setIsCheckingSubdomain(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [subdomain]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState({ ok: false });

    const cnpjDigits = onlyDigits(cnpj);
    const sub = subdomain.trim().toLowerCase();
    const mail = email.trim().toLowerCase();

    if (
      !legalName.trim() ||
      !tradeName.trim() ||
      !cnpjDigits ||
      !sub ||
      !adminName.trim() ||
      !mail ||
      !password
    ) {
      setState({ ok: false, error: "Preencha todos os campos obrigatórios." });
      return;
    }

    if (!isValidSubdomain(sub)) {
      setState({ ok: false, error: "Subdomínio inválido. Use letras minúsculas, números e hífen." });
      return;
    }

    if (cnpjDigits.length !== 14) {
      setState({ ok: false, error: "CNPJ deve ter 14 dígitos." });
      return;
    }

    if (!mail.includes("@")) {
      setState({ ok: false, error: "Email inválido." });
      return;
    }

    if (password.length < 6) {
      setState({ ok: false, error: "Senha deve ter pelo menos 6 caracteres." });
      return;
    }

    if (isSubdomainAvailable === false) {
      setState({ ok: false, error: "Este subdomínio já está em uso." });
      return;
    }

    setIsRegistering(true);
    try {
      const payload: any = {
        company: {
          legalName: legalName.trim(),
          tradeName: tradeName.trim(),
          cnpj: cnpjDigits,
        },
        admin: {
          email: mail,
          password,
          name: adminName.trim(),
          phone: phone.trim(),
        },
        subdomain: sub,
      };

      if (webserviceBaseUrl.trim()) {
        payload.initialEnvironment = {
          webserviceBaseUrl: webserviceBaseUrl.trim(),
          authMode: "bearer",
        };
      }

      const res = await fetch("/api/tenant/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Erro ao realizar cadastro");
      }

      const url = `https://${sub}.${baseDomain}`;
      setState({ ok: true, tenantKey: sub, url });
    } catch (err: any) {
      setState({ ok: false, error: err?.message || "Verifique os dados e tente novamente." });
    } finally {
      setIsRegistering(false);
    }
  }

  if (state.ok) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-6">
          <div className="text-lg font-semibold text-emerald-200">Cadastro realizado com sucesso!</div>
          <div className="mt-2 text-sm text-slate-200">
            Seu acesso: <span className="font-mono font-semibold">{state.tenantKey}</span>
            <span className="text-slate-400">.{baseDomain}</span>
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex h-11 items-center justify-center rounded-xl bg-white/5 px-4 text-sm font-semibold text-slate-200 hover:bg-white/10 transition-colors"
              href={`${state.url}/login`}
            >
              Ir para Login
            </a>
          </div>
        </div>

        <div className="text-center">
          <a className="inline-flex items-center text-sm text-gray-400 hover:text-white" href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para o início
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {state.error ? (
        <div className="rounded-2xl border border-rose-500/25 bg-rose-500/10 p-4 text-sm text-rose-200">
          {state.error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-300">Nome Fantasia</label>
          <div className="relative mt-2">
            <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <input
              className="h-11 w-full rounded-xl border border-gray-800 bg-[#1c1c1f] pl-9 pr-4 text-sm text-white outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              placeholder="Sua Empresa"
              value={tradeName}
              onChange={(e) => setTradeName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300">Razão Social</label>
          <div className="relative mt-2">
            <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <input
              className="h-11 w-full rounded-xl border border-gray-800 bg-[#1c1c1f] pl-9 pr-4 text-sm text-white outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              placeholder="Sua Empresa Ltda"
              value={legalName}
              onChange={(e) => setLegalName(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-300">CNPJ</label>
          <div className="relative mt-2">
            <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <input
              className="h-11 w-full rounded-xl border border-gray-800 bg-[#1c1c1f] pl-9 pr-4 text-sm text-white outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              placeholder="00.000.000/0001-00"
              value={cnpj}
              maxLength={18}
              onChange={(e) => setCnpj(formatCnpj(e.target.value))}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300">Subdomínio</label>
          <div className="relative mt-2">
            <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <input
              className={[
                "h-11 w-full rounded-xl border bg-[#1c1c1f] pl-9 pr-10 text-sm text-white outline-none transition-all",
                "focus:ring-2 focus:ring-primary-500/20",
                isSubdomainAvailable === false ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20" : "",
                isSubdomainAvailable === true ? "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/20" : "",
                isSubdomainAvailable == null ? "border-gray-800 focus:border-primary-500" : "",
              ].join(" ")}
              placeholder="cliente1"
              value={subdomain}
              onChange={(e) => setSubdomain(normalizeSubdomain(e.target.value))}
            />
            <div className="absolute right-3 top-3">
              {isCheckingSubdomain ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary-400" />
              ) : isSubdomainAvailable === true ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : isSubdomainAvailable === false ? (
                <X className="h-4 w-4 text-rose-500" />
              ) : null}
            </div>
          </div>
          {isSubdomainAvailable === false ? (
            <p className="mt-1 text-xs font-medium text-rose-400">Este subdomínio já está em uso.</p>
          ) : null}
          <p className="mt-1 text-xs text-gray-500">Seu acesso será: {tenantUrl.replace("https://", "")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-300">Nome do Administrador</label>
          <div className="relative mt-2">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <input
              className="h-11 w-full rounded-xl border border-gray-800 bg-[#1c1c1f] pl-9 pr-4 text-sm text-white outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              placeholder="Seu Nome"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300">Telefone / WhatsApp</label>
          <div className="relative mt-2">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <input
              className="h-11 w-full rounded-xl border border-gray-800 bg-[#1c1c1f] pl-9 pr-4 text-sm text-white outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              placeholder="(00) 00000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-300">Email do Administrador</label>
          <div className="relative mt-2">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <input
              className="h-11 w-full rounded-xl border border-gray-800 bg-[#1c1c1f] pl-9 pr-4 text-sm text-white outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              placeholder="admin@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputMode="email"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300">Senha</label>
          <div className="relative mt-2">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <input
              className="h-11 w-full rounded-xl border border-gray-800 bg-[#1c1c1f] pl-9 pr-4 text-sm text-white outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              placeholder="******"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-300">URL WebService RM (Opcional)</label>
        <div className="relative mt-2">
          <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <input
            className="h-11 w-full rounded-xl border border-gray-800 bg-[#1c1c1f] pl-9 pr-4 text-sm text-white outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
            placeholder="http://seu-servidor-rm:8051"
            value={webserviceBaseUrl}
            onChange={(e) => setWebserviceBaseUrl(e.target.value)}
          />
        </div>
      </div>

      <button
        className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary-600 text-sm font-bold text-white hover:bg-primary-500 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={isRegistering || isSubdomainAvailable === false}
      >
        {isRegistering ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Finalizar Cadastro
          </>
        ) : (
          "Finalizar Cadastro"
        )}
      </button>

      <div className="text-center">
        <a className="inline-flex items-center text-sm text-gray-400 hover:text-white" href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para o início
        </a>
      </div>
    </form>
  );
}
