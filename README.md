# 🌿 KoyaLite – Open Source Backend-as-a-Service (BaaS)

KoyaLite is a self-hostable, SQLite-first backend-as-a-service designed for indie developers, small teams, and local-first applications. It gives you the power of Postgres-level APIs, row-level security, edge functions, and more — all with the simplicity of SQLite.

## 🚀 Key Features

- 🗂️ **Monorepo architecture** with clean separation of services, apps, and shared packages
- ⚡ **SQLite with FTS5** for fast, full-text local search
- 🔐 **Lucia + Arctic Auth** with RBAC and Row-Level Security (RLS)
- 🧠 **Self-hosted analytics** via PostHog (optional)
- 🔎 **Weaviate integration** for vector/hybrid semantic search
- 📊 **Admin dashboard** (Studio) for DB + API management
- 📧 **Send Emails** using Resend
- 🌍 **Edge functions** (Bun or Deno runtime)
- 🔐 **Secrets encryption** + management CLI
- 🧪 **CLI project generator** (`create-koyalite-app`)
- 🧩 **Row-Level Security** (RLS) with policy editor
- 📦 **Auto-generated REST + GraphQL APIs**
- 🗂️ **S3-compatible file storage** via MinIO
- 🧰 **CLI Tool (`koyalite`)** to manage functions, DB, studio, and more
- 🧪 **In-memory SQLite** support for blazing-fast tests
- 🧾 **Documentation powered by Docusaurus**
- 🔧 **Developer-friendly setup** with TypeScript, path aliases, and workspace tooling

## 🧰 Ideal Use Cases

KoyaLite is perfect for building:

- 📝 Personal blogs with user comments
- 🧠 Note-taking and journaling apps
- 🛠️ Internal tools and dashboards
- 🪪 Developer portfolios with CMS features
- 📦 MVPs and small SaaS tools
- 📲 Mobile app backends with authentication and APIs
- 🧾 Static sites with dynamic sections powered by lightweight APIs

## 📜 Philosophy: Open-Source & Affordable Tools

KoyaLite is built on the principle that powerful backend infrastructure **should be accessible to everyone**. By using best-in-class open-source tools and avoiding costly vendor lock-in, KoyaLite enables:

- 💸 **Affordability** – Run everything yourself at minimal or no cost
- 🧠 **Transparency** – Understand exactly how the system works
- 🔧 **Customizability** – Extend or modify components as needed
- 🤝 **Community ownership** – Built to be contributed to, not just consumed

Open tools used include:

- [SQLite](https://sqlite.org/) for the database
- [Lucia](https://lucia-auth.com/) + [Arctic](https://arcticjs.dev/) for OAuth authentication
- [MinIO](https://min.io/) for file storage
- [Pino](https://github.com/pinojs/pino) for logging
- [Grafana + Loki](https://grafana.com/oss/loki/) for observability
- [Docusaurus](https://docusaurus.io/) for documentation
- [Swagger/OpenAPI](https://swagger.io/) for auto API docs
- [React.email](https://react.email/) for styling emails
- [Posthog](https://posthog.com/) for analytics

## 🧠 Developer Experience Enhancements

KoyaLite is built with DX-first principles:

- ⚡ Hot reloading dev server
- 🧪 CLI testing tools for auth, functions, APIs
- 🧱 Project scaffolding CLI (`npx create-koyalite-app`)
- 🧩 Shared types with path aliases (`@services/*`, `@koyalite/*`)
- 🖥️ Admin dashboard for roles, RLS, data viewing
- 🧾 Code snippet generator in docs (REST, GraphQL, SDK)
- 🔒 Audit logging support
- 🔐 CLI secrets encryption
- 📊 Schema visualizer / ERD support
- 🧪 Type-safe `tsconfig.json` across services

## 🧱 Project Structure

```
koyalite/
├── apps/
│   ├── cli/
│   ├── dashboard/
│   └── studio/
│
├── services/
│   ├── api/
│   ├── auth/
│   ├── email/
│   ├── rls/
│   ├── analytics/
│   ├── search/
│   └── storage/
│
├── packages/
│   ├── db/
│   ├── auth/
│   ├── sdk/
│   ├── logger/
│   └── utils/
│
├── functions/
│   ├── hello-world.ts
│   ├── user-signed-up.ts
│   └── tsconfig.json
│
├── tests/
│   └── api.test.ts
│
├── docker/
│   ├── posthog/
│   ├── weaviate/
│   └── compose.yml
│
├── docs/                    # Docusaurus site for documentation
│
├── .env
├── .env.test
├── .gitignore
├── package.json
├── tsconfig.json
├── .eslintrc.js
├── .prettierrc
└── README.md
```

## 📦 Monorepo with Workspaces

```jsonc
{
    "workspaces": ["apps/*", "services/*", "packages/*", "functions"],
}
```

## 🧠 Path Aliases with TypeScript

```jsonc
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@koyalite/db": ["packages/db/src"],
            "@koyalite/auth": ["packages/auth/src"],
            "@koyalite/sdk": ["packages/sdk/src"],
            "@koyalite/logger": ["packages/logger/src"],
            "@koyalite/utils": ["packages/utils/src"],
            "@koyalite/api": ["services/api/src"],
            "@koyalite/email": ["services/email/src"],
            "@koyalite/auth-service": ["services/auth/src"],
            "@koyalite/search": ["services/search/src"],
            "@koyalite/storage": ["services/storage/src"],
            "@koyalite/analytics": ["services/analytics/src"],
            "@koyalite/rls": ["services/rls/src"],
            "@koyalite/functions": ["functions"],
            "@koyalite/functions/*": ["functions/*"],
        },
    },
}
```

## 📚 Documentation (Docusaurus)

KoyaLite's official documentation lives in the `docs/` folder and is powered by [Docusaurus](https://docusaurus.io/).

### To start the docs locally:

```bash
cd docs
pnpm install
pnpm start
```

You can write guides, API reference, CLI usage, and architecture breakdowns in Markdown and Docusaurus will handle the rest.

## 🐳 Docker Compose

```bash
cd docker
docker-compose -f compose.yml up -d
```

Includes:

- `api`, `auth`, `dashboard`, `studio`, `storage`
- Optional: `posthog`, `weaviate`, `minio`

## 🧰 CLI Usage

```bash
npx koyalite init
npx koyalite start
npx koyalite studio
npx koyalite functions deploy
npx koyalite auth login
```

## ⚡ Edge Functions

```ts
// functions/hello-world.ts
import { defineFunction } from "koyalite/runtime";

export default defineFunction(async (ctx) => {
    return new Response(`Hello ${ctx.auth?.user?.email ?? "World"}!`);
});
```

Deploy with:

```bash
koyalite functions deploy
```

## 🧪 Testing

```bash
pnpm test
```

Runs tests using in-memory SQLite. Configured via `.env.test`.

## 📈 Analytics with PostHog

```env
POSTHOG_API_KEY=phc_...
POSTHOG_HOST=http://localhost:8000
```

## 🔍 Vector Search with Weaviate

```bash
docker-compose up weaviate
```

## 📋 Logging & Monitoring

KoyaLite includes a full-featured logging system:

- 🧾 **Pino** for fast, structured logs per service
- 📈 **Grafana + Loki** for centralized log aggregation
- 📂 Logs from all services are written to the `logs/` directory
- 🧩 Easily view, search, and visualize logs in Grafana

## 🧪 Status

🧱 Currently in early development — working on the core stack, CLI tooling, and initial service integration.  
Star the repo and follow along — contributions and ideas welcome!

## 📄 License

MIT © Greedless Tech
