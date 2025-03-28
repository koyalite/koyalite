# Software Design & Architecture Planning

## 1. Why and Who?

**Why does KoyaLite exist?**

- To empower solo developers, small teams, and startups to launch full-stack apps fast, without needing to manage backend infrastructure.

- Offer Supabase-like functionality but more lightweight, simpler to self-host, and tailored for projects that don't need a full-blown Postgres setup.

- Designed around SQLite to reduce complexity while still enabling powerful features like auth, storage, APIs, and RLS.

**Who is this built for?**

- Solo developers

- Small teams

- Startups

- Hackathon participants

- Bootstrappers

- Open-source builders

- Indie hackers who want to focus on frontend or product logic

## 2. Define Functional & Non-Functional Requirements

✅ Functional Requirements

KoyaLite aims to offer a streamlined developer experience by including a set of essential backend features out-of-the-box:

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

⚙️ **Non-Functional Requirements**

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
- **HIPAA Compliance Ready**: Infrastructure and architecture support HIPAA requirements (e.g., encryption, access control, audit logging), making KoyaLite suitable for projects handling protected health information (PHI).

🧪 **Nice-to-Haves (Planned Post-MVP)**

These features are not core to the MVP but will enhance developer experience:

- **AI DX Helpers**: Optional AI tools to help debug, configure, or query your backend.
