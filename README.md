# SalonFlow Dashboard

Dashboard moderno para gerenciamento de salão de beleza/barbearia, criado como projeto de estudo prático em React e JavaScript.

O objetivo do SalonFlow é simular uma aplicação real de portfólio, com autenticação, rotas protegidas, layout responsivo e base preparada para CRUD de clientes, serviços e agendamentos.

## Status

Projeto em desenvolvimento.

Implementado até aqui:

- Layout responsivo de dashboard.
- Sidebar fixa no desktop e navegação adaptada para telas menores.
- Login e cadastro com layout próprio.
- Firebase Authentication configurado.
- Rotas públicas e rotas protegidas.
- Context API para autenticação.
- Toast global para feedback visual.
- CRUD real de clientes com Firestore.
- CRUD real de serviços com Firestore.
- CRUD real de agendamentos com Firestore.
- Filtros de agendamentos por status e data.
- Marcação de agendamento como concluído.
- Cancelamento e exclusão de agendamentos.
- Imagens otimizadas em WebP.

Ainda planejado:

- Estados de loading e empty state mais refinados.
- Deploy.
- Screenshots e documentação final de portfólio.

## Tecnologias

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router DOM
- Firebase Authentication
- Firestore
- ESLint

## Funcionalidades

### Autenticação

- Cadastro com e-mail e senha.
- Login com e-mail e senha.
- Login com Google.
- Logout.
- Persistência de sessão com Firebase.
- Redirecionamento de usuários autenticados.
- Proteção de rotas privadas.

### Dashboard

- Layout com sidebar, navbar e área principal.
- Cards de ações rápidas.
- Footer responsivo.
- Navegação interna com rotas aninhadas.

### Páginas

- `Login`
- `Register`
- `Dashboard`
- `Clientes`: cadastro, edição, listagem e exclusão.
- `Serviços`: cadastro, edição, listagem e exclusão.
- `Agendamentos`: cadastro, edição, conclusão, cancelamento, exclusão e filtros.

## Estrutura

```txt
src/
├── assets/
├── components/
├── context/
├── firebase/
├── hooks/
├── pages/
├── routes/
└── services/
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```txt
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

O arquivo `.env` não deve ser enviado para o GitHub.

## Como Rodar

Clone o repositório:

```bash
git clone https://github.com/wendleydev/Salonflow.git
```

Entre na pasta:

```bash
cd Salonflow
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` com suas credenciais do Firebase.

Rode o projeto:

```bash
npm run dev
```

Acesse:

```txt
http://localhost:5173
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Aprendizados Praticados

- Componentização.
- Props e `children`.
- Renderização condicional.
- `map` para listas.
- Formulários controlados.
- `useState`.
- Context API.
- React Router.
- Rotas aninhadas.
- Rotas protegidas.
- Integração inicial com Firebase.
- Organização de projeto React.

## Autor

Desenvolvido por [wendley.dev](https://wendley.dev).
