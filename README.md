
# 🎬 Boskov Back-end

API RESTful para avaliação de filmes, com autenticação baseada em JWT, permissões por papéis (`user`, `admin`) e operações completas para usuários, filmes, gêneros e avaliações.

---

## 🧩 Objetivo

Desenvolver o backend de um serviço de **avaliação de filmes**, permitindo:
- Cadastro de usuários (com controle de acesso)
- Criação e listagem de filmes e gêneros
- Avaliação de filmes por usuários autenticados
- Controle de permissões (admin pode tudo, user pode avaliar e gerenciar sua conta)

---

## 🚀 Tecnologias e Bibliotecas

| Tipo           | Nome                                  |
|----------------|---------------------------------------|
| **Linguagem**  | JavaScript (Node.js)                  |
| **Framework**  | Express                               |
| **ORM**        | Prisma                                |
| **Banco**      | PostgreSQL                            |
| **Validação**  | Zod                                   |
| **Auth**       | JSON Web Token (JWT) + Redis          |
| **Hash**       | Bcrypt                                |
| **Doc API**    | Swagger (via `swagger-jsdoc`, `swagger-ui-express`) |
| **Utilitários**| dotenv, http-status-codes             |

---

## 📁 Organização de Pastas

```bash
src/
│
├── avaliacoes/          # CRUD de avaliações de filmes
│   ├── avaliacao.schema.js
│   ├── controller.js
│   └── routes.js
│
├── filmes/              # CRUD de filmes
│   ├── filmes.schema.js
│   ├── controller.js
│   └── routes.js
│
├── generos/             # CRUD de gêneros
│   ├── genero.schema.js
│   ├── controller.js
│   └── routes.js
│
├── generosFilmes/       # Relação N:N entre filmes e gêneros
│   ├── genero_filme.schema.js
│   ├── controller.js
│   └── routes.js
│
├── users/               # Autenticação, login, usuários
│   ├── user.schema.js
│   ├── controller.js
│   ├── routes.js
│   ├── redisClient.js
│   └── jwtConfig.js
│
├── middlewares/         # Autenticação e autorização
│   ├── autenticarToken.js
│   └── authorizeAdmin.js
│
├── configs/             # Configurações auxiliares
│   ├── jwtConfig.js
│   └── SwaggerConfig.js
│
├── server.js            # Ponto de entrada da aplicação
```

---

## 🔒 Autenticação & Permissões

- JWT: geração e verificação de tokens
- Redis: gerenciamento de tokens invalidado (logout)
- Papel de usuário:
  - `user`: pode se cadastrar, logar, avaliar filmes, gerenciar seus dados e avaliações
  - `admin`: acesso total, inclusive CRUD de filmes, gêneros, usuários e avaliações

---

## 📌 Instalação e Execução

```bash
# Clone o projeto
git clone https://github.com/seu-usuario/Boskov-Back-end.git
cd Boskov-Back-end

# Instale as dependências
npm install

# Configure o .env
cp .env.example .env
# Edite com suas variáveis, ex: SECRET_JWT, DATABASE_URL etc

# Rode as migrações
npx prisma migrate dev

# Inicie o servidor
npm run start
```

---

## 📚 Documentação da API

Após rodar o projeto, acesse:

```
http://localhost:3000/api-docs
```

Documentação Swagger interativa com todos os endpoints disponíveis.

---

# 🎬 Boskov Front-end

Interface web para o sistema de **avaliação de filmes**, que permite usuários cadastrados avaliarem obras e administradores gerenciarem o catálogo. Consome a [API Boskov Back-end](https://github.com/seu-usuario/Boskov-Back-end) e conta com autenticação JWT, rotas protegidas e controle de permissões.

---

## 🧩 Funcionalidades

- Login e Cadastro de usuários
- Visualização de filmes disponíveis
- Avaliação de filmes com notas e comentários
- Edição e exclusão de avaliações
- Área de perfil do usuário
- Painel de administração:
  - Cadastro de novos filmes
  - Cadastro de gêneros
  - Visualização das avaliações

---

## 🚀 Tecnologias Utilizadas

| Categoria         | Tecnologias / Bibliotecas                      |
|-------------------|------------------------------------------------|
| **Linguagem**     | TypeScript                                     |
| **Framework**     | React                                          |
| **Gerenciador**   | Vite                                           |
| **Estilização**   | CSS                                            |
| **Rotas**         | React Router DOM                               |
| **Autenticação**  | JWT (armazenado localmente)                    |
| **Controle Global** | React Context API                            |
| **Mensagens**     | Componente de erro personalizado (`mensagem-erro.tsx`) |

---

## 📁 Estrutura de Pastas

```bash
src/
├── assets/                  # Imagens e recursos estáticos
├── components/              # Componentes reutilizáveis
│   ├── mensagem-erro.tsx    # Exibição de mensagens de erro
│   └── private-route.tsx    # Rota protegida para usuários autenticados
├── context/
│   └── error-context.tsx    # Contexto global para mensagens de erro
├── pages/
│   ├── Avaliação/           # Tela de avaliação de filmes
│   ├── Cadastro/            # Tela de cadastro de usuário
│   ├── Filmes/              # Listagem e criação de filmes
│   ├── Genero/              # Cadastro de gêneros
│   ├── Login/               # Tela de login
│   └── Perfil/              # Área do usuário
├── App.tsx                  # Arquivo principal de rotas
├── main.tsx                 # Inicialização da aplicação
└── vite-env.d.ts            # Tipagens do Vite
```

---

## 🔒 Proteção de Rotas

As rotas são protegidas com um componente `PrivateRoute` que verifica se o token JWT está presente no `localStorage`. Caso contrário, o usuário é redirecionado para o login e recebe uma mensagem de erro via contexto global.

Rotas públicas:
- `/` (Login)
- `/cadastro`

Rotas protegidas:
- `/filmes`
- `/avaliar/:idFilme`
- `/criar-filme`
- `/criar-genero`
- `/perfil`
- `/avaliacoes`

---

## 📌 Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/Boskov-Frontend.git
cd Boskov-Frontend

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

---

## 🌐 Integração com o Backend

O frontend se comunica com a API Boskov Back-end via chamadas HTTP (axios/fetch). Certifique-se de que o backend esteja rodando em `http://localhost:3000` ou atualize o endpoint base conforme necessário.

---

## ⚙️ Variáveis de Ambiente

Você pode configurar variáveis em um `.env` se desejar gerenciar URLs da API, como:

```
VITE_API_URL=http://localhost:3000
```

E utilizar no código com `import.meta.env.VITE_API_URL`.

---

## 👩‍💻 Desenvolvido por

**Ana Clara Ribeiro**  
[🔗 LinkedIn](https://www.linkedin.com/in/ana-clara-ribeiro-rodrigues-da-cunha-61665825b/)