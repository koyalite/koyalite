# Step 7: Choose Tech Stack

This step outlines the technologies used to implement KoyaLite, including languages, frameworks, libraries, services, and tooling decisions. Each choice is made based on simplicity, DX (developer experience), performance, and maintainability.

---

## Core Language & Environment

- TypeScript: Universal language used across backend, frontend, and CLI for type safety and maintainability.

- Node.js (18+): Runtime for API, CLI, and utility services.

- Deno: Runtime for edge functions (with isolation and built-in permissions).

- Deno Deploy: Optional multi-region edge deployment.

---

## Backend Frameworks & Libraries

- Express.js: REST and GraphQL API layer.

- GraphQL Yoga or Mercurius: Lightweight, plugin-friendly GraphQL server.

- Lucia + Arctic: Simple, extensible authentication system with RBAC and session handling.

- Zod: Schema validation for requests and configs.

- Pino: Fast, structured logging.

- OpenTelemetry: Optional observability instrumentation.

---

## Data & Storage

- SQLite: Default embedded database using WAL mode.

- SQLCipher (optional): For encrypted-at-rest support.

- LiteFS (optional): For multi-region read replication.

- Weaviate: Vector and hybrid semantic search engine.

- SeaweedFS: S3-compatible object storage.

---

## Email & Communication

- React.email: Component-based email templates.

- Resend: Email delivery and logging.

---

## Infrastructure & Deployment

- Docker Compose: Local development and self-hosted deployment.

- NGINX: API gateway, TLS termination, reverse proxy, and rate limiting.

- Certbot (Let’s Encrypt): Automatic TLS certificate provisioning.

- Infisical: Optional secrets management.

---

## Observability & Monitoring

- Grafana: Metrics visualization.

- Loki: Log aggregation.

- PostHog: Product analytics.

- SigNoz / HyperDX / OpenTelemetry: Optional APM and tracing.

---

## Developer Tooling

- npm: Package manager with monorepo support.

- ESLint + Prettier: Code quality and formatting.

- Vitest: Unit testing with native TS support.

- tsup: Fast TypeScript bundling for CLI and packages.

- tsx: Fast dev runner with hot reload.

- Docusaurus: Markdown-based documentation site.

---

## Documentation & API Introspection

- Swagger/OpenAPI: REST API documentation.

- GraphQL Playground: In-browser interactive query tool.

- KoyaLite Studio: Visual schema editing, ERD viewer, RLS management.