# Getting Started with KoyaLite

This guide will help you set up KoyaLite and create your first application.

## Prerequisites

- Node.js 18 or later
- pnpm 8 or later
- Docker (for local development)
- Git

## Quick Start

1. **Create a new KoyaLite project**
   ```bash
   # Create a new project
   npx create-koyalite-app my-app
   cd my-app

   # Install dependencies
   pnpm install
   ```

2. **Start the development environment**
   ```bash
   # Start all services
   pnpm dev
   ```

   This will start:
   - API server at http://localhost:3000
   - Studio UI at http://localhost:3001
   - Admin Dashboard at http://localhost:3002

3. **Create your first table**
   ```typescript
   // schema.ts
   import { table, text, timestamp } from '@koyalite/core-types';

   export const posts = table('posts', {
     title: text('title').notNull(),
     content: text('content').notNull(),
     created_at: timestamp('created_at').defaultNow(),
   });
   ```

4. **Add Row Level Security**
   ```typescript
   // policies.ts
   import { rls } from '@koyalite/rls';

   rls.policy('posts', {
     create: 'auth.role = "admin"',
     read: 'true',
     update: 'auth.uid = user_id',
     delete: 'auth.role = "admin"',
   });
   ```

5. **Use the SDK in your frontend**
   ```typescript
   import { KoyaLite } from '@koyalite/sdk';

   const client = new KoyaLite({
     apiKey: 'your-api-key',
   });

   // Query data
   const posts = await client.database.query('posts');

   // Real-time subscriptions
   client.database.subscribe('posts', (post) => {
     console.log('New post:', post);
   });
   ```

## Project Structure

A typical KoyaLite project looks like this:

```
my-app/
├── src/
│   ├── schema/           # Database schema
│   │   └── index.ts
│   ├── policies/         # RLS policies
│   │   └── index.ts
│   ├── functions/        # Edge functions
│   │   └── hello.ts
│   └── emails/          # Email templates
│       └── welcome.tsx
├── public/              # Static assets
├── .env                 # Environment variables
├── koyalite.config.ts   # KoyaLite configuration
└── package.json
```

## Configuration

KoyaLite can be configured through `koyalite.config.ts`:

```typescript
import { defineConfig } from '@koyalite/core';

export default defineConfig({
  // Project name
  name: 'my-app',

  // Database configuration
  database: {
    // Enable WAL mode for better performance
    walMode: true,
    // Auto-vacuum settings
    autoVacuum: true,
  },

  // Authentication settings
  auth: {
    providers: ['github', 'google'],
    sessionDuration: '7d',
  },

  // Storage configuration
  storage: {
    provider: 'seaweedfs',
    bucket: 'my-app',
  },

  // Email settings
  email: {
    provider: 'resend',
    from: 'noreply@myapp.com',
  },

  // Function settings
  functions: {
    runtime: 'deno',
    memory: '128MB',
  },
});
```

## Environment Variables

Create a `.env` file in your project root:

```env
# Database
DATABASE_URL="file:./data.db"

# Auth
AUTH_SECRET="your-secret-key"
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."

# Storage
STORAGE_KEY="..."

# Email
RESEND_API_KEY="..."
```

## Next Steps

- [Database Schema Guide](./database/schema.md)
- [Authentication Guide](./auth/README.md)
- [RLS Policies Guide](./rls/README.md)
- [Edge Functions Guide](./functions/README.md)
- [Email Templates Guide](./email/README.md)
- [Deployment Guide](./deployment/README.md)

## Common Tasks

### Creating an Admin User

```bash
pnpm koyalite users create-admin \
  --email admin@example.com \
  --password secretpassword
```

### Generating Types

```bash
# Generate TypeScript types from your schema
pnpm koyalite codegen

# Generate API client
pnpm koyalite codegen client
```

### Database Migrations

```bash
# Create a new migration
pnpm koyalite db migrate create add_users_table

# Apply migrations
pnpm koyalite db migrate up

# Rollback last migration
pnpm koyalite db migrate down
```

### Deploying Edge Functions

```bash
# Deploy all functions
pnpm koyalite functions deploy

# Deploy specific function
pnpm koyalite functions deploy hello
```

## Troubleshooting

### Common Issues

1. **Database Locked**
   ```bash
   # Reset the database lock
   pnpm koyalite db unlock
   ```

2. **Port Conflicts**
   ```bash
   # Change ports in koyalite.config.ts
   export default defineConfig({
     ports: {
       api: 3000,
       studio: 3001,
       admin: 3002,
     },
   });
   ```

3. **Performance Issues**
   - Enable WAL mode
   - Add indexes to frequently queried columns
   - Use connection pooling in production

### Getting Help

- Check the [FAQ](./faq.md)
- Join our [Discord](https://discord.gg/koyalite)
- Open an [Issue](https://github.com/koyalite/koyalite/issues) 