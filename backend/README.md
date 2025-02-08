# Sistema de Agendamento Simplificado

Este é um sistema de agendamento simplificado desenvolvido com Node.js, Express, PostgreSQL e JWT para autenticação. Ele permite que usuários cadastrem serviços, façam agendamentos e recebam confirmações por e-mail.

## Funcionalidades

- **Cadastro e Autenticação de Usuários**:
  - Registro e login de usuários com JWT.
- **Cadastro de Serviços**:
  - Cadastro de serviços com nome e duração.
- **Agendamento de Serviços**:
  - Agendamento de serviços por usuários autenticados.
  - Validação de conflitos de horários.
- **Notificações por E-mail**:
  - Envio de e-mail de confirmação após o agendamento.

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (v15 ou superior)
- [Git](https://git-scm.com/) (opcional, para clonar o repositório)

## Como Executar o Projeto

### 1. Clone o Repositório

Se você estiver usando Git, clone o repositório:

```bash
git clone https://github.com/Daniel-Souzax/API-SCHEDULING-SYSTEM.git
```

### 2. Configure o Banco de Dados

1. Crie um banco de dados no PostgreSQL:

   ```sql
   CREATE DATABASE scheduling_db;
   ```

2. Execute as queries para criar as tabelas necessárias:

   ```sql
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
    );

    CREATE TABLE services (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL,
        duration INT NOT NULL,
    );

    CREATE TABLE appointments (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        service_id INT REFERENCES services(id) ON DELETE CASCADE,
        date_time TIMESTAMP NOT NULL,
        duration INT NOT NULL
    );
   ```

### 3. Configure as Variáveis de Ambiente

1. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

   ```env
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_DATABASE=agendamento_db
   DB_PORT=5432
   JWT_SECRET=seu_segredo_jwt
   PORT=3000
   EMAIL_HOST=smtp.seu_provedor.com
   EMAIL_PORT=587
   EMAIL_USER=seu_email@example.com
   EMAIL_PASS=sua_senha
   EMAIL_FROM=seu_email@example.com
   ```

   > **Observação**: Substitua os valores pelas suas credenciais.

### 4. Instale as Dependências

No diretório do projeto, execute:

```bash
npm install
```

### 5. Execute o Projeto

Inicie o servidor:

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3333`.

---

## Rotas da API

### Autenticação

- **POST `/api/auth/register`**: Registra um novo usuário.
  - Body:
    ```json
    {
      "name": "João Silva",
      "email": "joao@example.com",
      "password": "123456"
    }
    ```

- **POST `/api/auth/login`**: Faz login e retorna um token JWT.
  - Body:
    ```json
    {
      "email": "joao@example.com",
      "password": "123456"
    }
    ```

### Usuarios
- **GET `/api/users`**: Lista todos os usuarios.

### Serviços

- **POST `/api/services`**: Cria um novo serviço.
  - Body:
    ```json
    {
      "name": "Consulta Médica",
      "duration": 30
    }
    ```

- **GET `/api/services`**: Lista todos os serviços.
- **GET `/api/services/:id`**: Retorna um serviço específico.
- **PUT `/api/services/:id`**: Atualiza um serviço.
- **DELETE `/api/services/:id`**: Deleta um serviço.

### Agendamentos

- **POST `/api/appointments`**: Cria um novo agendamento.
  - Body:
    ```json
    {
      "service_id": 1,
      "date_time": "2023-10-15T10:00:00Z"
    }
    ```

- **GET `/api/appointments`**: Lista todos os agendamentos do usuário autenticado.

---

## Testando a API

Você pode testar as rotas usando ferramentas como:

- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- `curl` (linha de comando)

Exemplo de teste com `curl`:

1. **Registrar um usuário**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
   -H "Content-Type: application/json" \
   -d '{"name": "João Silva", "email": "joao@example.com", "password": "123456"}'
   ```

2. **Fazer login**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/login \
   -H "Content-Type: application/json" \
   -d '{"email": "joao@example.com", "password": "123456"}'
   ```

3. **Criar um serviço**:
   ```bash
   curl -X POST http://localhost:3000/api/services \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer <TOKEN_JWT>" \
   -d '{"name": "Consulta Médica", "duration": 30}'
   ```

4. **Criar um agendamento**:
   ```bash
   curl -X POST http://localhost:3000/api/appointments \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer <TOKEN_JWT>" \
   -d '{"service_id": 1, "date_time": "2023-10-15T10:00:00Z"}'
   ```

