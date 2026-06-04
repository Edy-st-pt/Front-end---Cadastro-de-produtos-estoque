# Front-end — Cadastro e Estoque de Produtos

Interface web para gerenciamento de produtos e controle de estoque, desenvolvida com React e Tailwind CSS.

## Tecnologias utilizadas

- React 19
- Vite
- Tailwind CSS
- Axios
- React Hot Toast
- Lucide React

## Pré-requisitos

- Node.js 18+
- npm
- Back-end rodando em `http://localhost:8080`

> Repositório do back-end: https://github.com/Edy-st-pt/Back-end---Cadastro-de-produtos-estoque

## Como executar

### 1. Clonar o repositório

```bash
git clone https://github.com/Edy-st-pt/Front-end---Cadastro-de-produtos-estoque.git
cd Front-end---Cadastro-de-produtos-estoque
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Executar o projeto

```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:5173`

> Certifique-se de que o back-end está rodando antes de usar a aplicação.

## Funcionalidades

- Listagem de produtos em tabela
- Busca por nome em tempo real
- Filtro por categoria e status (ativo/inativo)
- Cadastro de novo produto com validações
- Edição de produto existente
- Remoção de produto com confirmação
- Feedback visual de sucesso e erro em todas as operações
- Indicador de estoque baixo (quantidade ≤ 5)

## Estrutura do projeto

```
src/
├── components/
│   ├── FiltrosBusca.jsx       # Campos de busca e filtros
│   ├── Header.jsx             # Cabeçalho da aplicação
│   ├── ModalConfirmacao.jsx   # Modal de confirmação de exclusão
│   ├── ModalProduto.jsx       # Modal de cadastro e edição
│   └── TabelaProdutos.jsx     # Tabela de listagem de produtos
├── pages/
│   └── ProdutosPage.jsx       # Página principal
├── services/
│   ├── api.js                 # Configuração do Axios
│   └── produtoService.js      # Chamadas à API de produtos
├── App.jsx
├── main.jsx
└── index.css
```
