import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  FileSignature,
  LayoutDashboard,
  ShieldCheck,
  Users,
} from "lucide-react";

const FEATURES = [
  {
    title: "Fluxos de aprovação",
    description: "Defina etapas e responsáveis para validar documentos antes da assinatura final.",
    Icon: Users,
  },
  {
    title: "Assinatura por e-mail",
    description: "Convites com link para aprovar e assinar, com status por etapa e rastreabilidade.",
    Icon: FileSignature,
  },
  {
    title: "Lembretes e prazos",
    description: "Defina prazos e dispare lembretes para reduzir atrasos nas aprovações.",
    Icon: Bell,
  },
  {
    title: "Auditoria completa",
    description: "Histórico do processo: quem aprovou/assinou, quando e qual versão do documento.",
    Icon: ShieldCheck,
  },
  {
    title: "Dashboard de gestão",
    description: "Visão clara de documentos pendentes, assinados, rejeitados e em andamento.",
    Icon: LayoutDashboard,
  },
  {
    title: "Conformidade e segurança",
    description: "Mais controle no fluxo com permissões, registros e evidências do processo.",
    Icon: BadgeCheck,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#05070f] text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-260px] h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-primary-600/25 blur-3xl" />
          <div className="absolute left-[-200px] top-20 h-[520px] w-[520px] rounded-full bg-primary-600/20 blur-3xl" />
          <div className="absolute right-[-240px] top-0 h-[620px] w-[620px] rounded-full bg-slate-700/25 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05070f]/30 to-[#05070f]" />
        </div>

        <header className="relative mx-auto max-w-7xl px-6">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm">
                <FileSignature className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-white">Assina</div>
                <div className="text-xs text-slate-400">SimpleIT</div>
              </div>
            </Link>

            <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
              <a className="hover:text-white" href="#inicio">Início</a>
              <a className="hover:text-white" href="#funcionalidades">Funcionalidades</a>
              <a className="hover:text-white" href="#sobre">Sobre</a>
              <a className="hover:text-white" href="#contato">Contato</a>
            </nav>

            <div className="flex items-center gap-2">
              <Link
                className="hidden rounded-full px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5 md:inline-flex"
                href="/login"
              >
                Acessar
              </Link>
              <Link className="inline-flex items-center justify-center rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors" href="#contato">
                Solicitar Demo
              </Link>
            </div>
          </div>
        </header>

        <section id="inicio" className="relative mx-auto max-w-7xl px-6 pb-20 pt-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
              Nova Versão 2.0 Disponível
            </div>
            <h1 className="mt-7 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Aprovação e{" "}
              <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Assinatura Eletrônica
              </span>{" "}
              para Projetos
            </h1>
            <p className="mt-6 text-base text-slate-300 sm:text-lg">
              Controle total de documentos, aprovações e assinaturas. Elimine planilhas e padronize seu fluxo com a plataforma mais completa.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors sm:w-auto" href="/login">
                Começar Agora <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors sm:w-auto" href="/dashboard">
                Ver Demonstração
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <div className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-primary-400" />
                Sem cartão de crédito
              </div>
              <div className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-primary-400" />
                Instalação imediata
              </div>
              <div className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-primary-400" />
                Suporte 24/7
              </div>
            </div>
          </div>

          <div className="relative mx-auto mt-16 max-w-6xl">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-primary-600/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between border-b border-white/10 bg-black/20 px-6 py-4">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="h-2 w-2 rounded-full bg-rose-400" />
                </div>
                <div className="text-xs text-slate-400">🔒 app.assina.simpleit.app.br</div>
                <div className="h-5 w-5" />
              </div>

              <div className="grid gap-6 p-6 lg:grid-cols-[240px_1fr]">
                <div className="hidden rounded-2xl border border-white/10 bg-black/20 p-5 lg:block">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600/20 text-primary-200">
                      <FileSignature className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Assina</div>
                      <div className="text-xs text-slate-400">menu principal</div>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-2 text-sm">
                    <div className="rounded-xl bg-primary-600/20 px-3 py-2 text-primary-100">Dashboard</div>
                    <div className="rounded-xl px-3 py-2 text-slate-300 hover:bg-white/5">Documentos</div>
                    <div className="rounded-xl px-3 py-2 text-slate-300 hover:bg-white/5">Aprovações</div>
                    <div className="rounded-xl px-3 py-2 text-slate-300 hover:bg-white/5">Assinaturas</div>
                  </div>
                </div>

                <div className="relative">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <div className="text-lg font-semibold text-white">Dashboard</div>
                        <div className="mt-1 text-sm text-slate-400">Visão geral do sistema • fevereiro de 2026</div>
                      </div>
                      <div className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                        Fluxos ativos
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-4">
                      <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                        <div className="text-xs font-semibold text-slate-400">Documentos</div>
                        <div className="mt-3 text-2xl font-semibold text-white">94</div>
                        <div className="mt-1 text-xs text-slate-500">em aprovação</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                        <div className="text-xs font-semibold text-slate-400">Projetos</div>
                        <div className="mt-3 text-2xl font-semibold text-white">288</div>
                        <div className="mt-1 text-xs text-slate-500">ativos</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                        <div className="text-xs font-semibold text-slate-400">Pendentes</div>
                        <div className="mt-3 text-2xl font-semibold text-white">56</div>
                        <div className="mt-1 text-xs text-slate-500">aguardando</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                        <div className="text-xs font-semibold text-slate-400">Assinados</div>
                        <div className="mt-3 text-2xl font-semibold text-white">34</div>
                        <div className="mt-1 text-xs text-slate-500">este mês</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -right-6 bottom-8 hidden rounded-2xl border border-white/10 bg-black/30 px-4 py-3 shadow-xl backdrop-blur lg:block">
                    <div className="text-xs font-semibold text-slate-300">Novo Documento</div>
                    <div className="mt-1 text-xs text-slate-400">Aprovado agora</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section id="funcionalidades" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-sm font-semibold text-primary-400">Funcionalidades</div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Tudo o que você precisa para aprovar e assinar
          </h2>
          <p className="mt-5 text-slate-300">
            Centralize toda a operação de aprovação de documentos em uma única plataforma. Simples, eficiente e poderosa.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ title, description, Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/5 p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur hover:bg-white/10 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600/20 text-primary-200">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-5 text-lg font-semibold text-white">{title}</div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{description}</p>
              <a className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-300 hover:text-primary-200" href="#contato">
                Saiba mais <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="sobre" className="border-y bg-white">
        <div className="bg-[#05070f]">
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 via-transparent to-slate-500/10" />
                <div className="relative p-10">
                  <div className="text-sm font-semibold text-slate-200">SimpleIT</div>
                  <div className="mt-3 text-3xl font-bold tracking-tight text-white">Assina</div>
                  <div className="mt-4 max-w-sm text-sm text-slate-300">
                    Feito para equipes que precisam de controle e rastreabilidade no ciclo de aprovação de documentos de projetos.
                  </div>
                  <div className="mt-10 grid gap-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600/20 text-primary-200">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Plataforma 100% em nuvem e segura</div>
                        <div className="mt-1 text-sm text-slate-400">Acesso via navegador com controle de permissões.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600/20 text-primary-200">
                        <LayoutDashboard className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Atualizações contínuas</div>
                        <div className="mt-1 text-sm text-slate-400">Melhorias frequentes e evolução do produto.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600/20 text-primary-200">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Suporte técnico especializado</div>
                        <div className="mt-1 text-sm text-slate-400">Time pronto para ajudar na implantação e no fluxo.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-primary-400">Sobre</div>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Rastreabilidade do início ao fim
                </h2>
                <p className="mt-5 text-slate-300">
                  Tenha visibilidade total do status de cada documento: quem recebeu, quem aprovou, quem assinou e quais etapas ainda estão pendentes.
                </p>

                <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-7">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-white">98%</div>
                    <div className="text-sm text-slate-300">satisfação dos clientes</div>
                  </div>
                  <div className="mt-5 h-2 w-full rounded-full bg-white/10">
                    <div className="h-2 w-[98%] rounded-full bg-primary-600" />
                  </div>
                  <div className="mt-6 grid gap-3 text-sm text-slate-300">
                    <div className="flex items-center gap-3">
                      <BadgeCheck className="h-4 w-4 text-primary-300" />
                      Histórico completo do processo
                    </div>
                    <div className="flex items-center gap-3">
                      <BadgeCheck className="h-4 w-4 text-primary-300" />
                      Controle de acesso por papel
                    </div>
                    <div className="flex items-center gap-3">
                      <BadgeCheck className="h-4 w-4 text-primary-300" />
                      Status em tempo real para destravar aprovações
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="mx-auto max-w-7xl px-6 pt-24 pb-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur">
          <div className="grid lg:grid-cols-2">
            <div className="relative overflow-hidden bg-gradient-to-b from-primary-600 to-primary-800 p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_45%)]" />
              <div className="relative">
                <div className="text-2xl font-bold text-white">Vamos conversar?</div>
                <p className="mt-3 max-w-sm text-sm text-white/80">
                  Solicite uma demonstração gratuita e descubra como o Assina pode transformar a aprovação e assinatura de documentos do seu projeto.
                </p>

                <div className="mt-10 grid gap-5 text-sm text-white/90">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                      <BadgeCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white/70">EMAIL</div>
                      <div className="font-semibold">contato@simpleit.com.br</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                      <BadgeCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white/70">TELEFONE</div>
                      <div className="font-semibold">(11) 94498-7584</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                      <BadgeCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white/70">LOCALIZAÇÃO</div>
                      <div className="font-semibold">Tatuí, SP</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10">
              <div className="text-sm font-semibold text-slate-200">Solicitar Demonstração</div>
              <div className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <div className="text-xs font-semibold text-slate-400">Nome Completo</div>
                    <input className="h-11 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Seu nome" />
                  </div>
                  <div className="grid gap-2">
                    <div className="text-xs font-semibold text-slate-400">Telefone / WhatsApp</div>
                    <input className="h-11 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="(11) 99999-9999" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <div className="text-xs font-semibold text-slate-400">Email Profissional</div>
                  <input className="h-11 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="seu@email.com" />
                </div>

                <div className="grid gap-2">
                  <div className="text-xs font-semibold text-slate-400">Como podemos ajudar?</div>
                  <textarea className="min-h-[120px] resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Gostaria de saber mais sobre..." />
                </div>

                <button className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors">
                  Solicitar Demonstração <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#05070f]">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm">
                  <FileSignature className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-white">Assina</div>
                  <div className="text-xs text-slate-400">Aprovação e assinatura eletrônica</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-slate-400">
                A plataforma completa para aprovação de documentos em projetos. Simples, inteligente e eficiente.
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-white">Navegação</div>
              <div className="mt-4 grid gap-2 text-sm text-slate-400">
                <a className="hover:text-white" href="#inicio">Início</a>
                <a className="hover:text-white" href="#funcionalidades">Funcionalidades</a>
                <a className="hover:text-white" href="#sobre">Sobre</a>
                <a className="hover:text-white" href="#contato">Fale Conosco</a>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-white">Newsletter</div>
              <div className="mt-4 text-sm text-slate-400">Receba novidades e dicas de gestão de documentos.</div>
              <div className="mt-4 flex gap-3">
                <input className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Seu melhor e-mail" />
                <button className="h-11 whitespace-nowrap rounded-xl bg-primary-600 px-5 text-sm font-semibold text-white hover:bg-primary-500 transition-colors">
                  Inscrever-se
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <div>© 2026 Assina SimpleIT. Todos os direitos reservados.</div>
            <div className="flex gap-4">
              <a className="hover:text-slate-300" href="#">Política de Privacidade</a>
              <a className="hover:text-slate-300" href="#">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
