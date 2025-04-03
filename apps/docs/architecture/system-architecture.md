# KoyaLite System Architecture

This document provides a comprehensive overview of the KoyaLite platform's architecture, design decisions, and technical implementation details.

## Table of Contents

1. [Overview](#overview)
2. [Requirements](#requirements)
3. [System Components](#system-components)
4. [Technical Stack](#technical-stack)
5. [Data Flow & Architecture](#data-flow--architecture)
6. [Development & Deployment](#development--deployment)
7. [Security & Monitoring](#security--monitoring)
8. [Future Roadmap](#future-roadmap)

## Overview

KoyaLite is a modern, monorepo-based application built with TypeScript and Node.js. The platform leverages a microservices architecture with a focus on modularity, scalability, and developer experience.

### Repository Structure

The codebase is organized into three main categories using pnpm workspaces:

```
koyalite/
├── apps/           # Client applications
├── packages/       # Shared libraries and utilities
├── services/       # Backend microservices
└── infra/         # Infrastructure configuration
```

## Requirements

### Functional Requirements

KoyaLite offers a streamlined developer experience with essential backend features out-of-the-box:

1. **Core Services**

    - Project Service for managing project metadata, settings, and lifecycle
    - Function versioning with rollback capabilities
    - Scheduled jobs (cron-like tasks)
    - Session management with configurable timeouts
    - Email queueing with retry mechanism
    - Admin impersonation with audit logging
    - System metadata tables for introspection

2. **Authentication & Security**

    - Built-in user management (Lucia/Arctic)
    - OAuth support (Google, GitHub)
    - Role-Based Access Control (RBAC)
    - Row-Level Security (RLS)

3. **Data & Storage**

    - SQLite as embedded database
    - Auto-generated REST & GraphQL APIs
    - S3-compatible storage (SeaweedFS)
    - Migration management
    - Backup & restore capabilities
    - Data seeding support

4. **Developer Tools**

    - Edge Functions (Deno runtime)
    - Admin Dashboard
    - KoyaLite Studio (visual database UI)
    - Vector/hybrid semantic search (Weaviate)
    - Client SDK (npm package)
    - Email styling (React.email + Resend)
    - Webhooks support
    - Environment management

5. **Protection & Integration**
    - Rate limiting and abuse protection
    - CORS and custom headers support
    - Multi-environment support

### Non-Functional Requirements

1. **Performance & Monitoring**

    - APM support (SigNoz, OpenTelemetry, HyperDX)
    - Telemetry (Pino + Loki + Grafana)
    - PostHog analytics integration

2. **Architecture & Scalability**

    - Pluggable architecture
    - CDN and multi-region ready
    - Docker Compose setup
    - Monorepo structure
    - Type safety (TypeScript)

3. **Security & Compliance**

    - Secrets management (Infisical)
    - TLS/HTTPS support
    - NGINX gateway configuration
    - Optional HIPAA compliance mode
    - Optional GDPR & CCPA compliance
    - Audit logging

4. **Developer Experience**
    - Swagger/OpenAPI documentation
    - CLI tooling and utilities
    - Hot reloading dev server
    - ERD viewer
    - Documentation site (Docusaurus)
    - Test environment with in-memory SQLite

### Future Enhancements

- AI DX Helpers for debugging and configuration
- Enhanced global distribution features
- Advanced analytics and monitoring capabilities

## System Components

### Client Applications (`apps/`)

1. **Studio** (`apps/studio/`)

    - Purpose: Main application interface for end users
    - Implementation: Next.js + React
    - Features:
        - Visual Database UI
        - Interactive Query Builder
        - Real-time Data Visualization
        - Table Management
        - Visual ERD Diagram Viewer
        - SQL Console
        - Data Browser with In-place Editing
    - Structure:
        ```
        studio/
        ├── public/          # Static assets
        ├── src/             # Application source
        │   ├── components/  # React components
        │   ├── pages/       # Next.js pages
        │   └── styles/      # CSS/styling
        ├── package.json     # Dependencies
        └── tsconfig.json    # TypeScript config
        ```

2. **Admin Dashboard** (`apps/admin-dashboard/`)

    - Purpose: System administration and monitoring
    - Implementation: Next.js + React
    - Features:
        - User & Role Management
        - RLS Policy Editor
        - System Configuration
        - Performance Monitoring
        - Audit Logs Viewer
        - API Request Monitoring
        - Environment Config Editor
        - CLI Command History
        - Real-time Logs & Metrics
    - Structure: [Same as Studio]

3. **Documentation** (`apps/docs/`)
    - Purpose: Public documentation and guides
    - Implementation: Docusaurus
    - Features:
        - API Documentation
        - User Guides
        - Developer Documentation
        - OpenAPI/Swagger Integration
    - Structure:
        ```
        docs/
        ├── docs/            # Documentation content
        ├── src/             # Custom components
        ├── static/          # Static assets
        └── docusaurus.config.js
        ```

### Shared Libraries (`packages/`)

1. **Core Infrastructure**

    a. **Core Types** (`core-types/`)

    - Shared TypeScript interfaces
    - Domain models
    - System-wide type definitions
    - Enum definitions
    - HIPAA/GDPR compliance types

    b. **Database** (`database/`)

    - SQLite client implementation
    - Schema management
    - Migration system
    - Query builders
    - Connection pooling
    - Data seeding support
    - Backup & restore utilities

    c. **Authentication** (`auth-client/`)

    - Lucia/Arctic authentication integration
    - Session management with timeouts
    - OAuth providers (Google, GitHub)
    - JWT handling
    - User flows (signup, login, recovery)
    - RBAC implementation
    - Admin impersonation

    d. **Logger** (`logger/`)

    - Pino logger configuration
    - Structured logging
    - Log rotation
    - Context preservation
    - Log level management
    - Audit logging for compliance

    e. **Telemetry** (`telemetry/`)

    - OpenTelemetry integration
    - Performance monitoring
    - Distributed tracing
    - Metrics collection
    - Error tracking
    - PostHog analytics integration

    f. **Config** (`config/`)

    - Environment management
    - Zod schema validation
    - Secret management (Infisical)
    - Feature flags
    - Compliance mode settings

2. **UI and Frontend**

    a. **UI Components** (`ui-components/`)

    - Shared React components
    - Component documentation
    - Theme system
    - Design tokens
    - Accessibility features

    b. **Email Templates** (`email-templates/`)

    - React Email components
    - Email layouts
    - Template system
    - Preview functionality
    - Responsive designs

3. **API and Integration**

    a. **SDK** (`sdk/`)

    - Public API client
    - Type definitions
    - Error handling
    - Rate limiting
    - Caching
    - Environment support

    b. **Search Client** (`search-client/`)

    - Dual Search Implementation:
        1. SQLite FTS5
            - Full-text search
            - Index management
            - Query optimization
            - Boolean operations
        2. Weaviate Integration
            - Semantic search
            - Vector embeddings
            - Similarity matching
            - AI-powered search features
    - Strategy Selection:
        - Automatic mode based on query
        - Manual override options
        - Performance optimization
    - Features:
        - Unified search interface
        - Result ranking
        - Query preprocessing
        - Cache management

    c. **Storage Client** (`storage-client/`)

    - SeaweedFS integration
    - File operations
    - Metadata management
    - Access control
    - Caching layer
    - Backup support

    d. **Row Level Security** (`rls/`)

    - Policy engine
    - Access control rules
    - Policy evaluation
    - Cache invalidation
    - Audit logging
    - HIPAA/GDPR compliance rules

4. **Development Tools**

    a. **CLI** (`cli/`)

    - Project scaffolding
    - Development utilities
    - Code generation
    - Database tools
    - Testing utilities
    - Environment management

    b. **TypeScript Config** (`tsconfig/`)

    - Base configuration
    - Environment presets
    - Path aliases
    - Compiler options
    - Type safety enforcement

    c. **ESLint Config** (`eslint-config-koyalite/`)

    - Custom rules
    - Code style
    - Best practices
    - Security rules
    - Compliance checks

### Backend Services (`services/`)

1. **Core Services**

    a. **API** (`api/`)

    - Express/GraphQL server
    - REST endpoints
    - GraphQL schema/resolvers
    - Authentication
    - Rate limiting
    - Caching
    - OpenAPI/Swagger docs

    b. **Edge Runtime** (`edge-runtime/`)

    - Deno-based functions
    - Runtime management
    - Deployment system
    - Performance optimization
    - Version control
    - Rollback support

2. **Background Processing**

    a. **Scheduler** (`scheduler/`)

    - Cron job system
    - Task scheduling
    - Job tracking
    - Error handling
    - Retry logic
    - Audit logging

    b. **Email Queue** (`email-queue/`)

    - Email processing
    - Resend.com integration
    - Queue management
    - Retry mechanism
    - Analytics
    - Template management

    c. **Webhook Dispatcher** (`webhook-dispatcher/`)

    - Event delivery
    - Retry logic
    - Rate limiting
    - Monitoring
    - Error handling
    - Audit logging

## Technical Stack

1. **Core Technologies**

    - Language: TypeScript (end-to-end type safety)
    - Runtime: Node.js, Deno
    - Package Manager: pnpm with workspaces
    - Build System: Turborepo
    - Development: Hot reloading dev server

2. **Frontend**

    - Framework: Next.js
    - UI Library: React
    - Email: React Email + Resend
    - Analytics: PostHog
    - Documentation: Docusaurus

3. **Backend**

    - API: Express, GraphQL
    - Database: SQLite (with SQLCipher for encryption)
    - Search:
        - Full-text: SQLite FTS5
        - Semantic: Weaviate
    - Storage: SeaweedFS
    - Authentication: Lucia/Arctic
    - Scheduling: Built-in cron system

4. **DevOps & Infrastructure**

    - Containers: Docker + Docker Compose
    - CI/CD: GitHub Actions
    - Gateway: NGINX
    - Secrets: Infisical
    - SSL/TLS: Let's Encrypt + Certbot
    - CDN: Ready for Cloudflare/BunnyCDN

5. **Monitoring & Observability**

    - APM: OpenTelemetry, SigNoz, HyperDX
    - Logging: Pino
    - Metrics: Loki + Grafana
    - Analytics: PostHog
    - Documentation: OpenAPI/Swagger

6. **Testing & Quality**
    - Testing: Vitest
    - Linting: ESLint
    - Formatting: Prettier
    - Git Hooks: Husky
    - Test Environment: In-memory SQLite

## Data Flow & Architecture

1. **Request Flow**

    ```
    Client → Edge Runtime/API → Auth → RLS → Data Layer → Response
    ```

2. **Search Flow**

    ```
    Query → Strategy Selection → FTS/Semantic → Result Ranking → Response
    ```

3. **Background Jobs**
    ```
    Trigger → Scheduler → Queue → Processing → Completion/Retry
    ```

## Development & Deployment

1. **Local Development**

    - Docker Compose setup
    - Hot reloading
    - Development tools
    - Local services

2. **CI/CD Pipeline**

    - Automated testing
    - Build verification
    - Deployment stages
    - Version management

3. **Quality Assurance**
    - Code review process
    - Testing requirements
    - Performance benchmarks
    - Security scanning

## Security & Monitoring

1. **Authentication & Authorization**

    - User Management (Lucia/Arctic)
    - OAuth Providers (Google, GitHub)
    - Role-Based Access Control (RBAC)
    - Row Level Security (RLS)
    - Session Management
        - Configurable timeouts
        - Token expiration
        - Refresh strategies
    - Admin Impersonation with Audit Logs

2. **Data Protection**

    - Encryption at Rest (SQLCipher)
    - TLS/HTTPS (Let's Encrypt)
    - Secrets Management (Infisical)
    - Backup & Restore
    - Data Seeding Controls

3. **Compliance Features**

    - HIPAA Compliance Mode (Optional)
        - Encryption at rest
        - Enforced TLS
        - Strict audit logging
        - Enhanced RLS policies
        - PHI handling controls
    - GDPR & CCPA Support (Optional)
        - Data export capabilities
        - Data deletion workflows
        - Consent tracking
        - Privacy policy enforcement

4. **API Security**

    - Rate Limiting
    - DDoS Protection
    - CORS Configuration
    - Custom Headers
    - Request Validation
    - Error Handling

5. **Monitoring & Logging**

    - Centralized Logging (Pino)
    - Performance Metrics
        - API latency
        - Database performance
        - Resource utilization
    - Error Tracking
    - Audit Trails
        - User actions
        - System changes
        - Security events
    - Real-time Monitoring
        - Dashboard metrics
        - Alert system
        - Performance insights

6. **Infrastructure Security**

    - NGINX Security Configuration
    - Docker Security Best Practices
    - Network Isolation
    - Service Authentication
    - Regular Security Updates

## Future Roadmap

1. **Scalability**

    - Horizontal scaling
    - Caching implementation
    - Performance optimization
    - Database sharding

2. **Features**

    - API versioning
    - Enhanced search capabilities
    - Real-time functionality
    - Advanced analytics

3. **Infrastructure**
    - Cloud deployment
    - Container orchestration
    - Service mesh
    - Global CDN
