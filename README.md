# Espiritus Project

## Visão Geral

O Espiritus é uma plataforma para cadastro, gerenciamento e busca de terreiros de matriz africana. O sistema permite que líderes religiosos cadastrem seus terreiros, gerenciem participantes e compartilhem informações importantes como localização, horários e infraestrutura, enquanto usuários podem buscar e encontrar esses espaços.

## Estrutura do Projeto

O projeto é dividido em duas partes principais:

### Backend (FastAPI)

- Desenvolvido em Python com FastAPI
- Banco de dados relacional com SQLAlchemy e Alembic para migrações
- Autenticação de usuários com diferentes níveis de acesso
- API RESTful para gerenciamento de terreiros, usuários e funções

### Frontend (React + TypeScript)

- Desenvolvido com React 19 e TypeScript
- Interface moderna com Tailwind CSS e componentes Radix UI
- Roteamento com React Router
- Formulários com React Hook Form e validação com Zod

## Funcionalidades Principais

- Cadastro e autenticação de usuários
- Criação e gerenciamento de terreiros
- Atribuição de papéis/funções dentro dos terreiros
- Busca de terreiros por localização e características
- Visualização detalhada das informações dos terreiros
- Diferentes planos de usuário (Basic, Premium, Professional)

## Tecnologias Utilizadas

- **Backend**: Python, FastAPI, SQLAlchemy, Alembic, PostgreSQL
- **Frontend**: TypeScript, React, Tailwind CSS, Radix UI, React Router
- **Integração**: Axios para comunicação entre frontend e backend

## Como Executar

### Backend

```bash
cd backend
# Criar e ativar ambiente virtual
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
# Instalar dependências
pip install -r requiriments.txt
# Executar o servidor de desenvolvimento
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
# Instalar dependências
npm install
# Executar em modo de desenvolvimento
npm run dev
```
