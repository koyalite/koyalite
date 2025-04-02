# Step 4.5: Additional Modeling Layers

## Bounded Contexts

KoyaLite can be decomposed into several bounded contexts, each representing a logically independent part of the system:

- Auth & Access: Users, Roles, Sessions, RBAC, Impersonation

- Projects & Schema: Projects, Tables, Columns, RLS Policies, Metadata

- Edge Functions & Scheduling: Function deployments, versioning, scheduled jobs

- File Management: Uploads, metadata, public/private status

- Communication: Email delivery, retry logic, templates, logs

- Search: Vector indexes, embeddings, semantic search

- Compliance & Monitoring: Audit logs, compliance modes, rate limits

- Integrations & Events: Webhooks, event triggers, external service dispatch

## Value Objects

These are immutable, logic-encapsulating types that improve type safety and readability:

- EmailAddress

- CronExpression

- FilePath

- RoleName

- TableName

- PermissionList

## Domain Services

Stateless business logic that operates across multiple entities:

- EmailService: send, retry, and log transactional emails

- AuthService: manage sessions, token rotation, impersonation

- FunctionService: handle function deployment, versioning, and runtime metadata

- ProjectService: create, update, and manage project metadata, settings, provisioning, and cascading delete operations

## Domain Events

Events to represent important system occurrences and enable decoupled side-effects:

- UserCreated

- ProjectCreated

- FunctionDeployed

- EmailDeliveryFailed

- WebhookFired

- TableSchemaChanged
