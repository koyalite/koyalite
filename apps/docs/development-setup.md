# Development Environment Setup Guide

## Prerequisites

- Node.js v18 or later
- pnpm v8.15.4 or later
- Docker and Docker Compose
- Git

## Initial Setup

1. **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/koyalite.git
    cd koyalite
    ```

2. **Install Dependencies**

    ```bash
    pnpm install
    ```

3. **Set Up Environment Variables**

    ```bash
    cp .env.example .env
    ```

    Edit `.env` with your specific configuration values.

4. **Start Development Services**

    ```bash
    docker-compose up -d
    ```

    This will start:

    - Weaviate (Search Engine)
    - SeaweedFS (Storage)
    - OpenTelemetry Collector (Observability)

5. **Initialize Database**
    ```bash
    pnpm run db:migrate
    ```

## Development Workflow

1. **Start Development Server**

    ```bash
    pnpm dev
    ```

    This will start all workspace packages in development mode.

2. **Running Tests**

    ```bash
    pnpm test        # Run all tests
    pnpm test:watch  # Run tests in watch mode
    ```

3. **Linting and Formatting**
    ```bash
    pnpm lint       # Run ESLint
    pnpm format     # Run Prettier
    ```

## Project Structure

```
koyalite/
├── apps/           # Frontend applications
├── packages/       # Shared packages and libraries
├── services/       # Backend services
└── infra/         # Infrastructure configuration
```

## Common Tasks

### Adding a New Package

1. Create a new directory in `packages/`
2. Initialize with `package.json` and `tsconfig.json`
3. Add to workspace in root `package.json`
4. Run `pnpm install`

### Adding a New Service

1. Create a new directory in `services/`
2. Initialize with `package.json` and `tsconfig.json`
3. Add to workspace in root `package.json`
4. Add service to `docker-compose.yml` if needed
5. Run `pnpm install`

### Database Migrations

1. Create a new migration file in `packages/database/src/migrations/`
2. Follow the migration format in the example
3. Run `pnpm run db:migrate`

## Troubleshooting

### Common Issues

1. **Docker Services Not Starting**

    - Check Docker daemon is running
    - Check port conflicts
    - Run `docker-compose down -v` and retry

2. **Package Dependencies Issues**

    - Clear pnpm store: `pnpm store prune`
    - Delete node_modules: `pnpm clean`
    - Reinstall: `pnpm install`

3. **Database Issues**
    - Check SQLite file permissions
    - Verify encryption key if using SQLCipher
    - Check migration status: `pnpm run db:status`

## Additional Resources

- [Architecture Documentation](./architecture/system-architecture.md)
- [API Documentation](./api/README.md)
- [Contributing Guidelines](../CONTRIBUTING.md)
- [Deployment Guide](./deployment.md)
