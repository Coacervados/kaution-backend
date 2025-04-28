# Kaution Backend

Este é o backend da aplicação **Kaution**, desenvolvido com **Node.js**, **TypeScript**, **Express** e **Prisma**. Ele fornece uma API RESTful para autenticação, gerenciamento de usuários, categorias, produtos, inventários e geração de PDFs.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Express**
- **Prisma ORM**
- **PostgreSQL**
- **JWT (JSON Web Token)**
- **dotenv**

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/Coacervados/kaution-backend.git

# Acesse o diretório
cd kaution-backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Gere o banco de dados e aplique as migrações
npx prisma migrate dev

# Rode o servidor em modo desenvolvimento
npm run dev
```

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` com base no `.env.example` contendo:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
JWT_SECRET=sua_chave_jwt_secreta
PORT=3000
```

---

## 📁 Estrutura do Projeto

```
src/
├── controllers/     
├── middlewares/     
├── modules/
│   └── routers/     # Rotas da aplicação
├── services/        
├── utils/           
└── index.ts         
```

---

## 📌 Rotas da API

### 🧑‍💻 Autenticação (`/auth`)

- `POST /auth/register`  
  Registra um novo usuário.  
  ```json
  {
    "email": "usuario@exemplo.com",
    "password": "senha123"
  }
  ```

- `POST /auth/login`  
  Autentica o usuário e retorna um token JWT.  
  ```json
  {
    "email": "usuario@exemplo.com",
    "password": "senha123"
  }
  ```

---

### 👤 Usuários (`/users`)

> **Token JWT necessário**

- `GET /users`  
  Lista todos os usuários.

- `GET /users/:id`  
  Retorna os dados de um usuário específico.

- `PUT /users/:id`  
  Atualiza os dados de um usuário.

- `DELETE /users/:id`  
  Remove um usuário.

---

### 🗂️ Categorias (`/categories`)

> **Token JWT necessário**

- `POST /categories`  
  Cria uma nova categoria.  
  ```json
  {
    "name": "Eletrônicos"
  }
  ```

- `GET /categories/:id`  
  Retorna os dados de uma categoria.

- `GET /categories/:id/products`  
  Lista os produtos da categoria.

- `GET /categories/:categoryId/:orderBy/:order/products/pdf`  
  Gera um PDF com os produtos da categoria ordenados.  
  Exemplo: `/categories/1/name/asc/products/pdf`

- `PUT /categories/:id`  
  Atualiza uma categoria.

- `DELETE /categories/:id`  
  Deleta uma categoria.

---

### 📦 Produtos (`/products`)

> **Token JWT necessário**

- `POST /products`  
  Cria um novo produto.  
  ```json
  {
    "name": "Notebook",
    "quantity": 10,
    "categoryId": 1
  }
  ```

- `GET /products`  
  Lista todos os produtos do usuário autenticado.

- `GET /products/:id`  
  Retorna os dados de um produto específico.

- `PUT /products/:id`  
  Atualiza um produto.

- `DELETE /products/:id`  
  Deleta um produto.

---

### 🧾 Inventário (`/inventory`)

> **Token JWT necessário**

- `POST /inventory`  
  Cria um novo inventário.  
  ```json
  {
    "name": "Estoque Principal"
  }
  ```

- `GET /inventory`  
  Lista todos os inventários do usuário.

- `GET /inventory/:id`  
  Retorna um inventário específico.

- `GET /inventory/:id/products`  
  Lista os produtos dentro de um inventário.

- `GET /inventory/:id/categories`  
  Lista as categorias do inventário.

- `PUT /inventory/:id`  
  Atualiza os dados de um inventário.

- `DELETE /inventory/:id`  
  Deleta um inventário.

---

## 🔐 Autenticação

Rotas protegidas exigem autenticação via token JWT no cabeçalho da requisição:

```
Authorization: Bearer <seu_token_jwt>
```

---

## 🛠️ Scripts Disponíveis

- `npm run dev` — Inicia o servidor em modo desenvolvimento
- `npm run build` — Compila o código TypeScript
- `npm start` — Executa o servidor com código compilado
- `npx prisma migrate dev` — Executa migrações do banco de dados

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue, relatar bugs ou sugerir melhorias.
```

---

{
  "info": {
    "name": "Kaution API",
    "description": "Cole\u00e7\u00e3o de requisi\u00e7\u00f5es para a API do Kaution",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "url": {
          "raw": "{{base_url}}/auth/login",
          "host": [
            "{{base_url}}"
          ],
          "path": [
            "auth",
            "login"
          ]
        },
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"usuario@exemplo.com\",\n  \"password\": \"senha123\"\n}"
        }
      }
    },
    {
      "name": "Registro",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "url": {
          "raw": "{{base_url}}/auth/register",
          "host": [
            "{{base_url}}"
          ],
          "path": [
            "auth",
            "register"
          ]
        },
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"usuario@exemplo.com\",\n  \"password\": \"senha123\"\n}"
        }
      }
    },
    {
      "name": "Listar Usu\u00e1rios",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "url": {
          "raw": "{{base_url}}/users",
          "host": [
            "{{base_url}}"
          ],
          "path": [
            "users"
          ]
        }
      }
    },
    {
      "name": "Listar Produtos",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "url": {
          "raw": "{{base_url}}/products",
          "host": [
            "{{base_url}}"
          ],
          "path": [
            "products"
          ]
        }
      }
    },
    {
      "name": "Listar Categorias",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "url": {
          "raw": "{{base_url}}/categories/1",
          "host": [
            "{{base_url}}"
          ],
          "path": [
            "categories",
            "1"
          ]
        }
      }
    },
    {
      "name": "Listar Invent\u00e1rios",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "url": {
          "raw": "{{base_url}}/inventory",
          "host": [
            "{{base_url}}"
          ],
          "path": [
            "inventory"
          ]
        }
      }
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:3000"
    },
    {
      "key": "token",
      "value": "SEU_TOKEN_JWT"
    }
  ]
}
