# Gerenciador de Tarefas

Sistema CRUD de tarefas desenvolvido com Angular e ASP.NET Core Web API para o desafio técnico do Bootcamp Web Full Stack.

## Tecnologias

**Back-end**

- ASP.NET Core 8.0 Web API
- Entity Framework Core
- SQLite

**Front-end**

- Angular 17+
- TypeScript

## Por que SQLite ao invés de SQL Server?

O desafio técnico especifica SQL Server como banco de dados. Optei por SQLite pelos seguintes motivos:

**Portabilidade:** Funciona em Windows, Mac e Linux sem necessidade de instalação ou configuração de servidor de banco de dados.

**Facilidade de avaliação:** Os avaliadores podem executar o projeto imediatamente sem precisar configurar SQL Server, instalar dependências ou ajustar connection strings.

**Compatibilidade de código:** O código desenvolvido com Entity Framework Core é 100% compatível com SQL Server. A diferença está apenas no pacote NuGet (`Sqlite` vs `SqlServer`), no provider (`UseSqlite()` vs `UseSqlServer()`) e na connection string. Toda a lógica de negócio, CRUD, migrations e estrutura permanecem idênticas.

**Para migrar para SQL Server:**

```bash
dotnet remove package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```

Alterar no `Program.cs`: `UseSqlite()` para `UseSqlServer()`

## Como Executar

### Pré-requisitos

- [.NET SDK 8.0+](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)

### 1. Back-end (API)

```bash
cd TarefasAPI
dotnet restore
dotnet ef database update
dotnet run
```

A API estará disponível em: `http://localhost:5217/swagger`

### 2. Front-end (Angular)

Em outro terminal:

```bash
cd tarefas-app
npm install
npm start
```

A aplicação estará disponível em: `http://localhost:4200`

## Funcionalidades Implementadas

**Requisitos Obrigatórios**

- CRUD completo de tarefas
- Comunicação entre Angular e API REST
- Persistência de dados com Entity Framework Core
- Organização em componentes e services
- Uso correto de métodos HTTP (GET, POST, PUT, DELETE)

**Diferenciais**

- Validações de formulário
- Tratamento de erros com mensagens ao usuário
- Modo escuro (dark mode)
- README completo
- Commits organizados

## Endpoints da API

| Método | Endpoint            | Descrição                 |
| ------ | ------------------- | ------------------------- |
| GET    | `/api/tarefas`      | Lista todas as tarefas    |
| GET    | `/api/tarefas/{id}` | Busca tarefa por ID       |
| POST   | `/api/tarefas`      | Cria nova tarefa          |
| PUT    | `/api/tarefas/{id}` | Atualiza tarefa existente |
| DELETE | `/api/tarefas/{id}` | Exclui tarefa             |

**Exemplo de payload (POST/PUT):**

```json
{
  "titulo": "Estudar Angular",
  "descricao": "Revisar componentes e services",
  "status": "Pendente"
}
```

## Estrutura do Projeto

```
gerenciador-tarefas/
├── TarefasAPI/              # Back-end (.NET Core Web API)
│   ├── Controllers/         # Endpoints da API
│   ├── Data/               # DbContext
│   ├── Models/             # Entidades
│   └── Migrations/         # Migrations do banco
├── tarefas-app/            # Front-end (Angular)
│   └── src/app/
│       ├── components/     # Componentes (lista e formulário)
│       ├── services/       # Services HTTP
│       └── models/         # Interfaces TypeScript
└── README.md
```

## Autor

Karyn - [GitHub](https://github.com/karynla)

---

Desenvolvido para o Bootcamp Web Full Stack, Programa Protagonize Tech Avanade!
