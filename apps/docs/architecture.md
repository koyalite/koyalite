# KoyaLite Architecture

This document outlines the architecture of the KoyaLite platform, a modern monorepo-based application built with TypeScript and Node.js.

## Overview

KoyaLite is structured as a monorepo using pnpm workspaces, divided into three main categories:

- `apps/`: Client applications
- `packages/`: Shared libraries and utilities
- `services/`: Backend microservices

## System Architecture

### Client Applications (`apps/`)

1. **Studio** (`apps/studio/`)

    - Main application interface for end users (Visual Database UI)
    - Built with Next.js and React
    - Structure:
        - `public/`: Static assets
        - `src/`: Application source code
        - `package.json`: Dependencies and scripts
        - `tsconfig.json`: TypeScript configuration

2. **Admin Dashboard** (`apps/admin-dashboard/`)

    - Administrative interface for system management
    - Built with Next.js and React
    - Structure:
        - `public/`: Static assets
        - `src/`: Application source code
        - `package.json`: Dependencies and scripts
        - `tsconfig.json`: TypeScript configuration

3. **Documentation** (`apps/docs/`)
    - Public documentation site
    - Built with Docusaurus
    - Structure:
        - `docs/`: Documentation content
        - `src/`: Custom components and pages
        - `static/`: Static assets
        - `docusaurus.config.js`: Site configuration

### Shared Libraries (`packages/`)

1. **Core Infrastructure**

    - `core-types/`:
        - Shared TypeScript interfaces
        - Domain models
        - Enums and type definitions
    - `database/`:
        - SQLite client implementation
        - Schema management
        - Database migrations
        - Query builders
    - `auth-client/`:
        - Lucia/Arctic authentication helpers
        - Session management
        - User authentication flows
    - `logger/`:
        - Pino logger configuration
        - Structured logging wrapper
        - Log formatting utilities
    - `telemetry/`:
        - OpenTelemetry integration
        - Performance monitoring
        - Distributed tracing
    - `config/`:
        - Configuration loading
        - Zod schema validation
        - Environment variable management

2. **UI and Frontend**

    - `ui-components/`:
        - Shared React components
        - Component documentation
        - Styling utilities
    - `email-templates/`:
        - React Email components
        - Email layout system
        - Template rendering

3. **API and Integration**

    - `sdk/`:
        - npm-published client SDK
        - API wrapper methods
        - Type definitions
    - `search-client/`:
        - Weaviate integration
        - Search query builders
        - Index management
    - `storage-client/`:
        - SeaweedFS client integration
        - File upload/download utilities
        - Storage management
    - `rls/`:
        - Row Level Security implementation
        - Policy evaluation engine
        - Access control rules

4. **Development Tools**

    - `cli/`:
        - KoyaLite CLI tool
        - Project templates (`koyalite init`)
        - Development utilities
    - `tsconfig/`:
        - Base TypeScript configuration
        - Environment-specific configs (node, react)
        - Path aliases
    - `eslint-config-koyalite/`:
        - Custom ESLint rules
        - Code style enforcement

### Backend Services (`services/`)

1. **Core Services**

    - `api/`:
        - Express/GraphQL server
        - REST endpoints
        - GraphQL schema and resolvers
        - Authentication coordination
    - `edge-runtime/`:
        - Deno edge function management
        - Runtime orchestration
        - Function deployment

2. **Background Processing**

    - `scheduler/`:
        - Cron job management
        - Task scheduling
        - Job execution tracking
    - `email-queue/`:
        - Email queue management
        - Resend.com integration
        - Retry mechanisms
    - `webhook-dispatcher/`:
        - Webhook delivery system
        - Retry logic
        - Event management

## Infrastructure

### Local Development

- `docker-compose.yml`:
    - NGINX reverse proxy
    - Weaviate search service
    - SeaweedFS storage
    - Development services

### Configuration

- `.env.example`: Template for environment variables
- `nginx/koyalite.conf`: NGINX configuration
- `docker/`: Custom Dockerfile definitions

### CI/CD

- GitHub Actions workflows:
    - Continuous Integration
    - Testing
    - Deployment
    - Version management

## Technical Stack

- **Language & Runtime**:

    - TypeScript
    - Node.js
    - Deno (edge functions)

- **Package Management**:

    - pnpm with workspaces
    - Monorepo structure
    - Dependency sharing

- **Build System**:

    - Turborepo
    - Workspace task orchestration
    - Build caching

- **Frontend**:

    - Next.js
    - React
    - React Email

- **Backend**:

    - Express
    - GraphQL
    - SQLite
    - SeaweedFS (file storage)
    - Weaviate (search)

- **Testing & Quality**:

    - Vitest
    - ESLint
    - Prettier
    - Husky for git hooks

- **Observability**:

    - OpenTelemetry
    - Pino logging
    - Distributed tracing

- **Infrastructure**:
    - Docker
    - NGINX
    - GitHub Actions

## Data Flow

1. Client requests enter through either:

    - Edge Runtime (Deno-based for low-latency operations)
    - Main API (Express/GraphQL for complex operations)

2. Authentication/Authorization:

    - Lucia/Arctic-based auth-client
    - Row Level Security (RLS) policy evaluation
    - Session management

3. Data Storage:

    - SQLite database access through database package
    - SeaweedFS for file storage via storage-client
    - Weaviate for search via search-client

4. Background Processing:
    - Scheduled tasks via scheduler service
    - Email processing through email-queue with Resend.com
    - Webhook delivery through webhook-dispatcher

## Development Workflow

1. **Local Development**

    - Docker Compose for service orchestration:
        - NGINX reverse proxy
        - Weaviate search
        - SeaweedFS storage
    - Turborepo for build orchestration
    - Shared configurations:
        - TypeScript (tsconfig package)
        - ESLint (eslint-config-koyalite)
        - Prettier

2. **Quality Assurance**

    - Pre-commit hooks with Husky
    - Vitest for testing
    - ESLint and Prettier for code quality
    - TypeScript for type safety

3. **Deployment**
    - Infrastructure as Code in `infra/` directory
    - CI/CD through GitHub Actions
    - Docker-based deployment

## Security

1. **Authentication & Authorization**

    - Lucia/Arctic-based authentication
    - Row Level Security for data access
    - Secure session management
    - JWT handling

2. **Data Protection**
    - Environment-based configuration with Zod validation
    - Secure credential management
    - API key handling
    - Data encryption

## Monitoring and Observability

1. **Logging**

    - Centralized Pino logging
    - Structured log format
    - Log level management
    - Context preservation

2. **Telemetry**
    - OpenTelemetry integration
    - Distributed tracing
    - Metrics collection
    - Performance monitoring

## Future Considerations

1. **Scalability**

    - Horizontal scaling of services
    - Caching strategies
    - Performance optimization
    - Database sharding

2. **Integration**
    - API versioning strategy
    - Third-party integration framework
    - Webhook reliability
    - Event-driven architecture
    - Message queue implementation
