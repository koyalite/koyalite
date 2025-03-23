# KoyaLite

**KoyaLite** is a lightweight, open-source backend-as-a-service (BaaS) platform built around [SQLite](https://sqlite.org/). Designed for indie developers, solo founders, and small teams who want a fast, self-hostable backend without the complexity of cloud-native infrastructure.



## 🌱 Vision

Empower developers to build apps with confidence and control — without needing to manage complex infrastructure.



## 🎯 Mission

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



## 🧰 Ideal Use Cases

KoyaLite is perfect for building:

- 📝 Personal blogs with user comments
- 🧠 Note-taking and journaling apps
- 🛠️ Internal tools and dashboards
- 🪪 Developer portfolios with CMS features
- 📦 MVPs and small SaaS tools
- 📲 Mobile app backends with authentication and APIs
- 🧾 Static sites with dynamic sections powered by lightweight APIs

  

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
