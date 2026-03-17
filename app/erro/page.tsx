import Link from "next/link";

export default function ErroPage() {
  return (
    <div className="min-h-screen bg-[#05070f] text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="text-sm font-semibold text-primary-400">Erro</div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Serviço temporariamente indisponível
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-slate-300 sm:text-base">
          O servidor não conseguiu carregar as informações necessárias. Tente novamente em alguns minutos.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors"
            href="/login"
          >
            Voltar para o login
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            href="/"
          >
            Ir para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
