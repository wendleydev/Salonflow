# SalonFlow Dashboard

Dashboard moderno para gerenciamento de salão de beleza/barbearia, criado como projeto de estudo prático em React, JavaScript e Firebase.

## Sobre o projeto

O SalonFlow Dashboard é uma aplicação SPA desenvolvida para simular o gerenciamento de um salão de beleza ou barbearia. O projeto foi construído como forma de consolidar conhecimentos em React, JavaScript e Firebase por meio de um cenário de negócio real.

A aplicação conta com autenticação, rotas protegidas, layout responsivo e CRUD completo de clientes, serviços e agendamentos usando Firestore.

## Status

Primeira versão funcional concluída.

Implementado:

- [x] Layout responsivo de dashboard.
- [x] Sidebar fixa no desktop e navegação adaptada para telas menores.
- [x] Login e cadastro com layout próprio.
- [x] Firebase Authentication configurado.
- [x] Rotas públicas e rotas protegidas.
- [x] Context API para autenticação.
- [x] Toast global para feedback visual.
- [x] CRUD real de clientes com Firestore.
- [x] CRUD real de serviços com Firestore.
- [x] CRUD real de agendamentos com Firestore.
- [x] Filtros de agendamentos por status e data.
- [x] Marcação de agendamento como concluído.
- [x] Cancelamento e exclusão de agendamentos.
- [x] Imagens otimizadas em WebP.

Melhorias futuras:

- Estados de loading e empty state mais refinados.
- Deploy.
- Screenshots e documentação final de portfólio.

## Tecnologias

### Front-end

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router DOM

### Backend as a Service

- Firebase Authentication
- Firestore

### Ferramentas

- ESLint
- Git
- GitHub

## Funcionalidades

### Autenticação

- [x] Cadastro com e-mail e senha.
- [x] Cadastro limitado por código de acesso.
- [x] Login com e-mail e senha.
- [x] Login com Google.
- [x] Logout.
- [x] Persistência de sessão com Firebase.
- [x] Redirecionamento de usuários autenticados.
- [x] Proteção de rotas privadas.

### Dashboard

- [x] Layout com sidebar, navbar e área principal.
- [x] Cards de ações rápidas.
- [x] Footer responsivo.
- [x] Navegação interna com rotas aninhadas.

### Páginas

- [x] `Login`
- [x] `Register`
- [x] `Dashboard`
- [x] `Clientes`: cadastro, edição, listagem e exclusão.
- [x] `Serviços`: cadastro, edição, listagem e exclusão.
- [x] `Agendamentos`: cadastro, edição, conclusão, cancelamento, exclusão e filtros.

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

## Arquitetura

- `components`: componentes reutilizáveis da interface, como botões, layouts, sidebar, navbar e estados visuais.
- `context`: providers responsáveis por estados globais da aplicação, como autenticação e feedback visual.
- `hooks`: hooks customizados para consumir contextos de forma organizada.
- `firebase`: configuração de conexão com Firebase Authentication e Firestore.
- `pages`: telas principais acessadas pelas rotas da aplicação.
- `routes`: definição das rotas públicas, privadas e aninhadas.
- `services`: funções responsáveis pela comunicação com o Firestore.

## Demonstração

Aplicação: https://salonflow-dashboard.vercel.app

## Screenshots

Em breve:

- Login
- Dashboard
- Clientes
- Agendamentos

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```txt
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_REGISTER_ACCESS_CODE=defina_um_codigo_de_acesso
```

O arquivo `.env` não deve ser enviado para o GitHub.

O `VITE_REGISTER_ACCESS_CODE` é usado como uma barreira simples para limitar cadastros públicos na demonstração. Por ser uma variável exposta no bundle do front-end, ele não substitui regras de segurança do Firebase.

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

## Conceitos Aplicados Durante o Desenvolvimento

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
