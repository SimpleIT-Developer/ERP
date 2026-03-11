#!/bin/bash

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Tenta carregar o NVM (Node Version Manager) se existir
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
    . "$NVM_DIR/nvm.sh"
elif [ -s "/usr/local/opt/nvm/nvm.sh" ]; then
    . "/usr/local/opt/nvm/nvm.sh"
elif [ -s "/opt/homebrew/opt/nvm/nvm.sh" ]; then
    . "/opt/homebrew/opt/nvm/nvm.sh"
fi

# Verifica se o node e npm estão disponíveis
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Erro: Node.js e npm não encontrados.${NC}"
    echo -e "Você precisa instalar o Node.js para rodar este projeto."
    
    if command -v brew &> /dev/null; then
        echo -e "${BLUE}Dica: Parece que você tem o Homebrew instalado.${NC}"
        echo -e "Tente rodar: ${GREEN}brew install node${NC}"
    else
        echo -e "Baixe e instale em: ${GREEN}https://nodejs.org/${NC}"
    fi
    exit 1
fi

echo -e "${BLUE}=== Iniciando Ambiente de Desenvolvimento ERP ===${NC}"

# Verifica se o diretório node_modules existe
if [ ! -d "node_modules" ]; then
    echo -e "${GREEN}Dependências não encontradas. Instalando...${NC}"
    
    # Tenta usar npm, yarn ou pnpm
    if command -v pnpm &> /dev/null; then
        pnpm install
    elif command -v yarn &> /dev/null; then
        yarn
    else
        npm install
    fi
else
    echo -e "${GREEN}Dependências já instaladas.${NC}"
fi

echo -e "${BLUE}Iniciando servidor Next.js na porta 5000...${NC}"
echo -e "${GREEN}Acesse:${NC}"
echo -e "  - Cliente 1: http://localhost:5000/login?tenant=cliente1"
echo -e "  - Cliente 2: http://localhost:5000/login?tenant=cliente2"

# Roda o servidor dev
if command -v pnpm &> /dev/null; then
    pnpm dev
elif command -v yarn &> /dev/null; then
    yarn dev
else
    npm run dev
fi
