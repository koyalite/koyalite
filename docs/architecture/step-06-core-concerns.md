# Step 6: Establish Core Concerns

This step defines the foundational cross-cutting concerns and quality attributes that are consistently enforced across KoyaLite's architecture to ensure security, reliability, observability, and scalability.

--- 

**Security**

- Role-Based Access Control (RBAC): Built-in via Lucia and Arctic, with per-user and per-role permissions.

- Row-Level Security (RLS): Enforced automatically in all REST and GraphQL operations.

- TLS Everywhere: All communication is encrypted, with optional custom cert upload.

- Secure Defaults: All APIs require authentication by default.

- Session Management: Expiry and inactivity enforcement.

- Audit Logging: Tracks access and changes across users and services.

---

**Observability**

- Logging: Centralized with Pino + Loki.

- Metrics: Runtime and service metrics tracked and visualized via Grafana.

- Tracing: Optional OpenTelemetry support for request tracing.

- PostHog Analytics: Built-in usage analytics.

- Admin Dashboard Views: Real-time monitoring of key operations, function deploys, logs, API usage.

---

**Resilience & Reliability**

- Retry Logic: For email delivery, webhooks, and edge function execution.

- Graceful Failures: Error-handling patterns and fallback paths.

- Disaster Recovery: Backup and restore tooling.

- Circuit Breakers (planned): Optional fallback layers for internal services.

- Read Replication Support: LiteFS used for multi-region read replicas.

---

**Testability**

- In-memory SQLite for tests

- Mockable service interfaces

- CLI testing utilities built-in

- Type-safe contracts for API testing

---

**Configurability**

- Environment Support: Dev, staging, prod awareness built in.

- Feature Flags: GDPR, CCPA, HIPAA opt-in behavior switches.

- Custom RLS Policies: Admin dashboard + CLI for fine-grained access control.

---

**Maintainability**

- Monorepo Architecture: Clear folder boundaries by service/app/shared packages.

- Type Safety: TypeScript used across frontend, backend, and CLI.

- Path Aliases: For clean, import-friendly code.

- Code Style: Prettier + ESLint enforced across the repo.