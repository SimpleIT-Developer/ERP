# SaaS ERP Multi-Tenant

Este é um projeto base para um SaaS ERP com suporte a multi-tenancy via subdomínio e query parameters.

## Pré-requisitos

- **Node.js 18+ instalado.**
  - **Mac (Homebrew):** `brew install node`
  - **Mac/Linux (NVM - Recomendado):** [Instalar NVM](https://github.com/nvm-sh/nvm) e rodar `nvm install 20`.
  - **Windows/Mac (Instalador):** Baixe em [nodejs.org](https://nodejs.org/).
- npm, yarn ou pnpm.

## Como rodar

1. **Instale o Node.js** (caso não tenha):
   - Verifique se instalou com: `node -v`

2. **Execute o script de desenvolvimento:**
   ```bash
   ./dev.sh
   ```
   *Este script instalará as dependências automaticamente e iniciará o servidor.*

3. **Acesse no navegador:**
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

3. Acesse no navegador:
   - **Login (Tenant 1):** [http://localhost:5000/login?tenant=cliente1](http://localhost:5000/login?tenant=cliente1)
   - **Dashboard (Tenant 1):** [http://localhost:5000/dashboard?tenant=cliente1](http://localhost:5000/dashboard?tenant=cliente1)
   - **Login (Tenant 2):** [http://localhost:5000/login?tenant=cliente2](http://localhost:5000/login?tenant=cliente2)

## Estrutura

- `middleware.ts`: Detecta o tenant via subdomínio ou query param.
- `app/login/page.tsx`: Tela de login com Server Action.
- `app/dashboard/page.tsx`: Dashboard protegido com menu lateral.

## Notas

- O login aceita qualquer usuário/senha não vazios para fins de teste.
- O tenant é persistido via cookie `tenant` após o primeiro acesso com `?tenant=...` ou subdomínio.
