# Gerenciador de Tarefas - Bootcamp Web Full Stack

Sistema completo de gerenciamento de tarefas (CRUD) desenvolvido com Angular e ASP.NET Core Web API.

## 🛠️ Tecnologias Utilizadas

### Back-end

- **ASP.NET Core 8.0** - Framework Web API
- **Entity Framework Core** - ORM
- **SQLite** - Banco de dados
- **Swagger** - Documentação da API

### Front-end

- **Angular 17+** - Framework JavaScript
- **TypeScript** - Linguagem
- **RxJS** - Programação reativa
- **HttpClient** - Comunicação com API

## 💡 Observação sobre o Banco de Dados

### Por que SQLite ao invés de SQL Server?

O desafio técnico especifica **SQL Server** como banco de dados. Porém, este projeto utiliza **SQLite** pelos seguintes motivos:

#### ✅ Vantagens técnicas:

- **Portabilidade total** - Funciona em Windows, Mac e Linux sem configuração adicional
- **Zero configuração** - Não requer instalação de servidor de banco de dados
- **Facilidade para avaliação** - Os avaliadores podem executar o projeto imediatamente
- **Banco em arquivo** - Todo o banco fica em um único arquivo `.db` no projeto

#### 🔄 Compatibilidade com SQL Server:

**O código desenvolvido com Entity Framework Core é 100% compatível com SQL Server.** A arquitetura e lógica permanecem idênticas. A diferença está apenas em:

1. **Pacote NuGet**: `Microsoft.EntityFrameworkCore.Sqlite` vs `Microsoft.EntityFrameworkCore.SqlServer`
2. **Provider**: `UseSqlite()` vs `UseSqlServer()` no `Program.cs`
3. **Connection String**: Caminho do arquivo vs string de conexão SQL Server

**Toda a estrutura de CRUD, migrations, models, controllers e lógica de negócio permanecem exatamente as mesmas.**

#### 📝 Como migrar para SQL Server (se necessário):

<details>
<summary>Clique para ver instruções de migração</summary>

```bash
# 1. Remover SQLite
dotnet remove package Microsoft.EntityFrameworkCore.Sqlite

# 2. Instalar SQL Server
dotnet add package Microsoft.EntityFrameworkCore.SqlServer

# 3. Editar Program.cs
# Trocar: options.UseSqlite(...)
# Por: options.UseSqlServer(...)

# 4. Editar appsettings.json
# Trocar: "Data Source=tarefas.db"
# Por: "Server=localhost;Database=TarefasDB;Trusted_Connection=true;"

# 5. Recriar migrations
dotnet ef migrations remove
dotnet ef migrations add InitialCreate
dotnet ef database update
```

</details>

## 📋 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- [.NET SDK 8.0+](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- [Git](https://git-scm.com/)

> **Nota:** Não é necessário instalar banco de dados. O SQLite cria automaticamente um arquivo `tarefas.db` na primeira execução.

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/gerenciador-tarefas.git
cd gerenciador-tarefas
```

### 2. Executar o Back-end (API)

```bash
# Navegar para a pasta da API
cd TarefasAPI

# Restaurar dependências
dotnet restore

# Aplicar migrations (cria o banco de dados SQLite)
dotnet ef database update

# Executar a API
dotnet run
```

A API estará disponível em:

- **HTTP:** http://localhost:5000
- **HTTPS:** https://localhost:5001
- **Swagger:** http://localhost:5000/swagger

> **Importante:** Anote a porta HTTP em que a API está rodando (geralmente 5000).

### 3. Executar o Front-end (Angular)

**Em outro terminal**, execute:

```bash
# Navegar para a pasta do Angular (a partir da raiz)
cd tarefas-app

# Instalar dependências
npm install

# Executar aplicação
npm start
```

A aplicação estará disponível em: **http://localhost:4200**

### 4. Acessar a aplicação

Abra seu navegador e acesse: **http://localhost:4200**

## 📁 Estrutura do Projeto

```
gerenciador-tarefas/
│
├── TarefasAPI/                    # Back-end (.NET Core Web API)
│   ├── Controllers/               # Endpoints da API
│   │   └── TarefasController.cs  # CRUD de tarefas
│   ├── Data/                      # Contexto do banco
│   │   └── AppDbContext.cs       # DbContext do EF Core
│   ├── Models/                    # Entidades
│   │   └── Tarefa.cs             # Modelo da tarefa
│   ├── Migrations/                # Migrations do banco
│   ├── Program.cs                 # Configuração da aplicação
│   ├── appsettings.json          # Configurações (connection string)
│   ├── tarefas.db                # Banco de dados SQLite (gerado automaticamente)
│   └── TarefasAPI.csproj         # Arquivo do projeto
│
├── tarefas-app/                   # Front-end (Angular)
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/       # Componentes da aplicação
│   │   │   │   ├── lista-tarefas/     # Lista de tarefas
│   │   │   │   └── form-tarefa/       # Formulário criar/editar
│   │   │   ├── models/           # Interfaces TypeScript
│   │   │   │   └── tarefa.model.ts    # Interface Tarefa
│   │   │   ├── services/         # Serviços HTTP
│   │   │   │   └── tarefa.service.ts  # Service para API
│   │   │   └── app.routes.ts     # Rotas da aplicação
│   │   └── index.html
│   ├── package.json              # Dependências Node
│   └── angular.json              # Configuração Angular
│
└── README.md                      # Este arquivo
```

## 🔗 Endpoints da API

| Método | Endpoint            | Descrição                  |
| ------ | ------------------- | -------------------------- |
| GET    | `/api/tarefas`      | Listar todas as tarefas    |
| GET    | `/api/tarefas/{id}` | Buscar tarefa por ID       |
| POST   | `/api/tarefas`      | Criar nova tarefa          |
| PUT    | `/api/tarefas/{id}` | Atualizar tarefa existente |
| DELETE | `/api/tarefas/{id}` | Excluir tarefa             |

### Exemplo de Payload (POST/PUT)

```json
{
  "titulo": "Estudar Angular",
  "descricao": "Revisar componentes e serviços",
  "status": "Pendente"
}
```

### Resposta de Sucesso

```json
{
  "id": 1,
  "titulo": "Estudar Angular",
  "descricao": "Revisar componentes e serviços",
  "status": "Pendente",
  "dataCriacao": "2026-04-10T19:00:00"
}
```

## ⚙️ Configuração

### Banco de Dados

O projeto usa SQLite com o arquivo de banco criado automaticamente em `TarefasAPI/tarefas.db`.

**Connection String (appsettings.json):**

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=tarefas.db"
  }
}
```

### Porta da API

Se a API rodar em uma porta diferente de 5000, atualize o front-end:

**Arquivo:** `tarefas-app/src/app/services/tarefa.service.ts`

```typescript
private apiUrl = 'http://localhost:5000/api/tarefas'; // Alterar porta aqui
```

## 🧪 Testando a API

### Usando Swagger

1. Com a API rodando, acesse: http://localhost:5000/swagger
2. Teste os endpoints diretamente pela interface
3. Experimente criar, listar, editar e excluir tarefas

### Usando cURL

```bash
# Criar tarefa
curl -X POST http://localhost:5000/api/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Teste","descricao":"Descrição teste","status":"Pendente"}'

# Listar tarefas
curl http://localhost:5000/api/tarefas

# Buscar tarefa específica
curl http://localhost:5000/api/tarefas/1

# Atualizar tarefa
curl -X PUT http://localhost:5000/api/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{"id":1,"titulo":"Teste Atualizado","descricao":"Nova descrição","status":"Concluída"}'

# Deletar tarefa
curl -X DELETE http://localhost:5000/api/tarefas/1
```

## 🎯 Funcionalidades Implementadas

### Requisitos Obrigatórios

- ✅ **CRUD completo** - Create, Read, Update, Delete
- ✅ **API RESTful** - Endpoints seguindo padrões REST
- ✅ **Persistência de dados** - Entity Framework Core
- ✅ **Integração Front-Back** - Angular consumindo API
- ✅ **Organização do código** - Components, Services, Models
- ✅ **CORS configurado** - Comunicação entre portas diferentes

### Diferenciais Implementados

- ✅ **Validações básicas** - Campos obrigatórios no formulário
- ✅ **Tratamento de erros** - Mensagens de sucesso/erro
- ✅ **README completo** - Documentação detalhada
- ✅ **Código limpo** - Padrões de organização
- ✅ **Commits organizados** - Histórico Git estruturado

## 🐛 Solução de Problemas

### Erro: "porta já em uso"

**API (.NET):**

```bash
# Linux/Mac
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Angular:**

```bash
# Linux/Mac
lsof -ti:4200 | xargs kill -9

# Windows
netstat -ano | findstr :4200
taskkill /PID <PID> /F
```

### Erro: "dotnet ef não encontrado"

```bash
# Instalar ferramenta global
dotnet tool install --global dotnet-ef

# Adicionar ao PATH (Linux/Mac)
export PATH="$PATH:$HOME/.dotnet/tools"

# Tornar permanente
echo 'export PATH="$PATH:$HOME/.dotnet/tools"' >> ~/.bashrc
source ~/.bashrc
```

### Erro: "Cannot find module" (Angular)

```bash
cd tarefas-app
rm -rf node_modules package-lock.json
npm install
```

### Banco de dados não cria

```bash
cd TarefasAPI

# Verificar se migrations existem
ls Migrations

# Se não existir, criar
dotnet ef migrations add InitialCreate

# Aplicar ao banco
dotnet ef database update

# Verificar se arquivo foi criado
ls tarefas.db
```

### Erro de CORS

Certifique-se que:

1. A API está rodando em http://localhost:5000
2. O Angular está rodando em http://localhost:4200
3. O CORS no `Program.cs` permite a origem correta
4. Não há bloqueio de firewall

## 📚 Conceitos e Aprendizados

### Back-end

- **REST API** - Arquitetura de serviços web
- **Entity Framework Core** - ORM para .NET
- **Migrations** - Versionamento de banco de dados
- **Dependency Injection** - Injeção de dependências
- **Async/Await** - Programação assíncrona em C#
- **CORS** - Cross-Origin Resource Sharing

### Front-end

- **Observables** - Programação reativa com RxJS
- **Services** - Comunicação com API
- **Components** - Arquitetura baseada em componentes
- **Routing** - Navegação entre páginas
- **Two-way binding** - Binding bidirecional de dados
- **HttpClient** - Cliente HTTP do Angular

### Boas Práticas

- **Separação de responsabilidades** - Models, Services, Controllers
- **Nomenclatura clara** - Variáveis e métodos descritivos
- **Tratamento de erros** - Try-catch e validações
- **Documentação** - README e comentários quando necessário

## 🔧 Comandos Úteis

### Back-end (.NET)

```bash
# Compilar
dotnet build

# Executar testes (se houver)
dotnet test

# Criar migration
dotnet ef migrations add NomeDaMigration

# Reverter última migration
dotnet ef migrations remove

# Listar migrations
dotnet ef migrations list

# Atualizar banco para migration específica
dotnet ef database update NomeDaMigration
```

### Front-end (Angular)

```bash
# Criar componente
ng generate component nome-componente

# Criar service
ng generate service services/nome-service

# Build de produção
ng build --configuration production

# Executar com porta customizada
ng serve --port 4201

# Executar testes
ng test
```

### Git

```bash
# Ver status
git status

# Adicionar arquivos
git add .

# Commit
git commit -m "Mensagem descritiva"

# Ver histórico
git log --oneline

# Criar branch
git checkout -b feature/nova-funcionalidade
```

## 👤 Autor

**Karyn**

- LinkedIn: [seu-linkedin]
- GitHub: [seu-github]
- Email: [seu-email]

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico para processo seletivo do Bootcamp Web Full Stack.

## 🙏 Agradecimentos

Agradecimentos especiais aos organizadores do bootcamp pela oportunidade de demonstrar conhecimentos práticos em desenvolvimento full stack.

---

**Desenvolvido com ❤️ para o Bootcamp Web Full Stack**
