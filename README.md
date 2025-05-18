
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

## 👩‍💻 Desenvolvido por

**Ana Clara Ribeiro**  
[🔗 LinkedIn](https://www.linkedin.com/in/seu-perfil) • `Boskov Back-end @ IFTM`
