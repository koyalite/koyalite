# KoyaLite

**KoyaLite** is a lightweight, open-source backend-as-a-service (BaaS) platform built around [SQLite](https://sqlite.org/). Designed for indie developers, solo founders, and small teams who want a fast, self-hostable backend without the complexity of cloud-native infrastructure.



## Vision

Empower developers to build apps with confidence and control — without needing to manage complex infrastructure.



## Mission

KoyaLite delivers essential backend services — authentication, APIs, file storage, edge functions, and admin tools — in a modular stack you can run locally, self-host, or scale when you're ready.



## ⚙️ Core Features

- ⚡️ SQLite-first backend with zero config
- 🔐 Authentication with [Lucia](https://lucia-auth.com/) + Arctic
- 🔄 Auto-generated REST + GraphQL APIs
- 🗂️ S3-compatible file storage via MinIO
- 🌍 Edge function support (Deno or Bun)
- 🧩 Row-Level Security (RLS) with visual policy editor
- 🛠️ Developer CLI (`koyalite`) with project scaffolding
- 📊 Optional admin dashboard and DB studio
- 🔧 Extendable with plugins (e.g., Strapi, MongoDB)
- 📦 Optional typed client SDK via `@koyalite/client`
- 📄 Swagger/OpenAPI + GraphQL Playground for exploring APIs
- 📚 Documentation powered by [Docusaurus](https://docusaurus.io/)



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
- [Lucia](https://lucia-auth.com/) + Arctic for authentication
- [MinIO](https://min.io/) for file storage
- [Pino](https://github.com/pinojs/pino) for logging
- [Grafana + Loki](https://grafana.com/oss/loki/) for observability
- [Docusaurus](https://docusaurus.io/) for documentation
- [Swagger/OpenAPI](https://swagger.io/) for auto API docs



## 🧠 Developer Experience Enhancements (DX)

KoyaLite is being designed with a developer-first mindset, featuring tools that make backend work intuitive and fast:

- ⚡ **Hot reloading dev server** — Iterate rapidly while editing edge functions, routes, or schemas
- 🧪 **CLI test utilities** — Run local tests for auth flows, edge functions, and database logic
- 🖥️ **Visual Studio** — A clean admin dashboard for managing DB content, roles, RLS, and API traffic
- 📄 **Code snippet generator** — Copy-paste REST, GraphQL, or SDK usage directly from the docs
- 🧱 **Project scaffolding CLI** — Create new apps via `npx create-koyalite-app` with framework/auth/add-on choices
- 📊 **Schema visualizer** — Auto-generate ERDs to visualize your SQLite relationships
- 🧩 **Plugin & hook system** — Add custom logic to events like auth, storage, or post-processing
- 🔐 **Audit logging** — Track key system events such as logins, data edits, and role changes
- 🔒 **Secrets helper CLI** — Encrypt `.env` files for safer sharing in deployment pipelines



## 📁 Project Structure

```
koyalite/
├── apps/
│   ├── api/
│   ├── auth/
│   ├── functions/
│   └── studio/
├── cli/
├── docker/
├── docs/                  # Docusaurus documentation site
├── logs/
├── services/
│   ├── email/
│   ├── rls/
│   └── storage/
└── README.md
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



## 📜 License

KoyaLite is open-source under the **MIT License**. See [LICENSE](./LICENSE) for details.
