This step defines how internal services, APIs, and modules within KoyaLite communicate with each other and with external consumers like frontend apps, CLI tools, or SDKs.

Interfaces help enforce modularity, testability, and clarity across system boundaries.

---

## Public API Contracts

KoyaLite auto-generates REST and GraphQL APIs based on database schema. These APIs expose CRUD operations and respect RLS policies.

**REST API**

- Path structure: /rest/:table

- Methods: GET, POST, PATCH, DELETE

- Auth: Required (via bearer token/session cookie)

- Enforced RLS: yes

- OpenAPI Spec: /docs/openapi.json

**GraphQL API**

- Path: /graphql

- Auto-generated types and resolvers

- Auth and RLS-aware resolvers

- GraphQL Playground enabled in dev

**SDK (TypeScript)**

- Thin wrapper over REST/GraphQL APIs

- Type-safe response mapping

- Built-in error and auth handling

---

## CLI Contracts

The CLI interacts with backend services, manages secrets, deploys functions, and scaffolds projects.

Examples:

- koyalite init → sets up project config

- koyalite db push → syncs schema

- koyalite auth whoami → validates session/token

- koyalite functions deploy → deploys edge function via API

These commands call internal service APIs or read from a .koyalite/config.json.

---

## Internal Service Interfaces

Each service exposes clear contracts via TypeScript interfaces or REST endpoints. Examples:

**ProjectService**

    interface ProjectService {
        createProject(input: CreateProjectInput): Promise<Project>
        deleteProject(id: string): Promise<void>
        updateProject(id: string, changes: Partial<ProjectSettings>): Promise<Project>
        getProjectById(id: string): Promise<Project | null>
    }

**FunctionService**

    interface FunctionService {
        deploy(name: string, source: string): Promise<FunctionDeployment>
        rollback(id: string): Promise<void>
        scheduleCron(id: string, cron: string): Promise<void>
    }

**AuthService**

    
    interface AuthService {
        login(email: string, password: string): Promise<Session>
        logout(sessionId: string): Promise<void>
        impersonate(adminId: string, userId: string): Promise<Session>
    }
    

---

## Testing & Mocks

- All internal services support mockable contracts for testing

- CLI commands are testable via fixtures and in-memory SQLite

- SDK includes mock mode for frontend unit tests
