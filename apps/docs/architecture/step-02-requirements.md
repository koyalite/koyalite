# Define Requirements (Functional and Non-Functional)

## ✅ Functional Requirements

KoyaLite aims to offer a streamlined developer experience by including a set of essential backend features out-of-the-box:

- **Project Service**: Central service responsible for creating, updating, provisioning, and managing all project-related metadata, settings, compliance flags, and cascading deletions. Supports CLI, API, and UI interfaces for full lifecycle management.

- **Function Versioning Support**: Edge functions may support versioning, enabling developers to roll back to previous versions, test new changes safely, and manage different stages of deployment.

- **Scheduled Jobs (Cron-like Tasks)**: Future support for scheduled tasks or cron jobs that allow functions or services to execute periodically without external triggers.

- **Session Management and Inactivity Handling**: Support for configurable session timeouts, token expiration, and refresh strategies to enforce user security and comply with HIPAA/GDPR guidelines.

- **Email Queueing and Retry Mechanism**: Ensure reliable delivery of transactional emails using a built-in queue with retry logic. Status tracking for failed/successful deliveries can be integrated into the Admin UI.

- **Admin Impersonation Support**: Enables privileged administrators to impersonate users for debugging, support, or troubleshooting purposes while maintaining audit logs of all impersonation events.

- **System Metadata Tables**: KoyaLite maintains internal metadata tables such as \_koyalite_tables, \_koyalite_columns, \_koyalite_rls_policies, and \_koyalite_functions to enable advanced schema introspection, policy management, and integration with the Admin UI and CLI tools.

- **Authentication**: Built-in user management using Lucia and Arctic for secure session handling. Includes Role-Based Access Control (RBAC).

- **OAuth Support**: Login via Google, GitHub, etc.

- **Database**: Uses SQLite as the default embedded database for simplicity, reliability, and speed.

- **Auto-generated REST & GraphQL APIs**: Automatically create APIs based on your database schema.

- **Row-Level Security (RLS)**: Policy-based access control for fine-grained permissions per table and row.

- **File Storage**: S3-compatible storage via SeaweedFS for uploading and managing files.

- **Edge Functions**: Run serverless functions close to users using the Deno runtime, ideal for logic that can't run in the client.

- **Admin Dashboard**: Inspired by the Supabase Dashboard, this interface provides powerful control over backend resources. Key features include:

    - User and role management
    - RLS policy editor
    - Audit logs viewer
    - API request monitoring
    - Environment config editor
    - CLI command history
    - Real-time logs and metrics (PostHog, Loki, etc.)

- **KoyaLite Studio**: A visual database management UI similar to Supabase Studio. Key features include:

    - Table creation, editing, and deletion
    - Relationship and foreign key management
    - Data browsing and in-place editing
    - Query runner and SQL console
    - Visual ERD diagram viewer
    - Type and enum support for schema clarity

- **Search**: Vector and hybrid semantic search powered by Weaviate.

- **Email Styling and Delivery**: Style transactional emails with React.email and send them using Resend.

- **Client SDK**: Published and available via npm to interact with KoyaLite services from frontend applications.

- **Rate Limiting and Abuse Protection**: Prevent excessive requests and potential abuse via IP-based or user-level throttling.

- **CORS and Custom Headers Support**: Enables safe cross-origin integrations and flexible HTTP configurations.

- **Migration Management**: Tooling to handle schema migrations with version tracking.

- **Backup & Restore Tools**: Ability to snapshot and recover the SQLite database and storage layer.

- **Data Seeding Support**: Tools or configuration to populate default/test data across environments.

- **Webhooks Support**: Trigger external URLs in response to system events like row changes or auth events.

- **Environment Support**: Built-in support for managing dev, staging, and production environments.

## ⚙️ **Non-Functional Requirements**

- **Performance Monitoring (APM) Support**: Optional integration with open-source tools such as SigNoz, OpenTelemetry, or HyperDX to trace performance bottlenecks across APIs, edge functions, and DB operations.

- **Pluggable Architecture Readiness**: While KoyaLite does not enforce a plugin system, the internal structure allows advanced users to hook into lifecycle events or extend functionality through modular services, CLI, and metadata tables.

- **CDN and Multi-Region Readiness**: KoyaLite is designed to be ready for users who want to enable global distribution of edge functions and static assets. While these features are not provisioned automatically, users can integrate platforms like Deno Deploy or Cloudflare Workers to deploy edge functions globally. Static assets and public files can be served via popular CDN services such as Cloudflare or BunnyCDN. For SQLite database read replication, tools like LiteFS (from Fly.io) can be used to create multi-region read replicas, while write operations remain centralized to maintain consistency. This readiness ensures KoyaLite can scale geographically when paired with appropriate external services, though any infrastructure costs or service setups are the user's responsibility.

- **Secrets Management**: Optional integration with Infisical for secure and encrypted environment variable storage. Developers can manage secrets via Infisical's CLI or web UI, and KoyaLite CLI can integrate to pull secrets into local or deployment environments on demand.

- **TLS/HTTPS Support**: KoyaLite includes robust TLS support for secure communication. In development, self-signed certificates are used. In production, Let's Encrypt with Certbot is the default, with optional manual certificate upload for advanced users.

- **NGINX Gateway Configuration**: NGINX is used as an API Gateway for reverse proxying, TLS termination, CORS handling, rate limiting, authentication/authorization enforcement, and DDoS protection. Admins can manage gateway settings through the dashboard, including a graceful reload system for configuration changes.

- **Swagger/OpenAPI Documentation**: Auto-generated API documentation based on OpenAPI specs.

- **CLI Tooling**: Developer-focused CLI (`koyalite`) for project bootstrapping, development, deployment, and function/auth management. Published and available via npm.

- **CLI Testing Utilities**: Built-in CLI test tools for auth, functions, and API endpoints.

- **Hot Reloading Dev Server**: Supports a modern developer experience during local development.

- **Docker Compose Setup**: Simplifies self-hosting with a ready-to-run development stack.

- **ERD Viewer**: Automatically generate Entity-Relationship Diagrams from your schema.

- **Telemetry/Monitoring**: Built-in logging and metrics using Pino + Loki + Grafana.

- **Analytics**: PostHog integration for product and usage analytics.

- **Documentation**: Developer documentation site powered by Docusaurus.

- **Project Tooling & Structure**: TypeScript-based with path aliases, workspace tooling, and clear modular organization.

- **Monorepo Architecture**: Clean separation of services, apps, and shared packages for maintainability and scalability.

- **Audit Logging**: Support for auditing events and changes across the platform.

- **Type Safety**: End-to-end type safety using TypeScript throughout the entire codebase.

- **Test Environment**: Uses in-memory SQLite for fast and isolated automated tests.

- **HIPAA Compliance (Optional Opt-In)**: KoyaLite supports HIPAA compliance through an optional configuration mode. When enabled, KoyaLite enforces stricter security and privacy policies including encryption at rest (via SQLCipher), enforced TLS, audit logging, strict RLS policies, and access control. This makes KoyaLite suitable for self-hosted projects that handle Protected Health Information (PHI), while remaining flexible for users who do not require HIPAA compliance.g., encryption, access control, audit logging), making KoyaLite suitable for projects handling protected health information (PHI).

- **GDPR & CCPA Compliance (Optional Opt-In)**: KoyaLite provides optional support for GDPR and CCPA compliance. When enabled, users can configure features such as data export, data deletion, and consent preference tracking. Admin Dashboard actions and CLI commands will allow operators to respond to data access or deletion requests. These features are off by default to preserve simplicity for users who do not require them.

🧪 **Nice-to-Haves (Planned Post-MVP)**

These features are not core to the MVP but will enhance developer experience:

- **AI DX Helpers**: Optional AI tools to help debug, configure, or query your backend.
