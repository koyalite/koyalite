# KoyaLite API Reference

This documentation covers the KoyaLite API endpoints, authentication, and usage.

## Authentication

KoyaLite uses JWT-based authentication. Include the token in your requests:

```bash
Authorization: Bearer your-jwt-token
```

### Getting an API Key

1. Through the Admin Dashboard:

    - Navigate to Settings → API Keys
    - Click "Create New Key"
    - Save the key securely

2. Using the CLI:
    ```bash
    pnpm koyalite keys create --name "my-api-key"
    ```

## API Endpoints

### Database Operations

#### Tables

```http
GET /api/v1/tables
POST /api/v1/tables
GET /api/v1/tables/:id
PUT /api/v1/tables/:id
DELETE /api/v1/tables/:id
```

#### Queries

```http
POST /api/v1/query
POST /api/v1/query/batch
```

### Authentication

```http
POST /api/v1/auth/login
POST /api/v1/auth/register
POST /api/v1/auth/logout
GET /api/v1/auth/session
```

### Storage

```http
POST /api/v1/storage/upload
GET /api/v1/storage/files/:id
DELETE /api/v1/storage/files/:id
```

### Search

```http
POST /api/v1/search/:index/query
POST /api/v1/search/:index/vectors
```

## GraphQL API

KoyaLite automatically generates a GraphQL API from your schema.

### Endpoint

```http
POST /graphql
```

### Example Query

```graphql
query {
    posts(where: { published: { equals: true } }, orderBy: { createdAt: desc }, take: 10) {
        id
        title
        content
        author {
            name
            email
        }
    }
}
```

## Real-time Subscriptions

### WebSocket

```javascript
const ws = new WebSocket("ws://localhost:3000/ws");

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Received:", data);
};
```

### Server-Sent Events

```javascript
const events = new EventSource("/api/v1/events");

events.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Received:", data);
};
```

## Rate Limiting

- Default: 100 requests per minute
- Authenticated: 1000 requests per minute
- Configurable per API key

## Error Handling

All errors follow this format:

```json
{
    "error": {
        "code": "ERROR_CODE",
        "message": "Human readable message",
        "details": {}
    }
}
```

Common error codes:

- `AUTH_REQUIRED`: Authentication required
- `INVALID_TOKEN`: Invalid or expired token
- `PERMISSION_DENIED`: Insufficient permissions
- `RATE_LIMITED`: Too many requests
- `VALIDATION_ERROR`: Invalid input data
- `NOT_FOUND`: Resource not found
- `INTERNAL_ERROR`: Server error

## SDK Usage

The TypeScript SDK provides a type-safe way to interact with the API:

```typescript
import { KoyaLite } from "@koyalite/sdk";

const client = new KoyaLite({
    apiKey: "your-api-key",
});

// Query data
const posts = await client.database.query("posts");

// Real-time subscriptions
client.database.subscribe("posts", (post) => {
    console.log("New post:", post);
});

// File upload
const file = await client.storage.upload(fileBuffer, {
    path: "images/avatar.png",
});
```

## OpenAPI Specification

The complete OpenAPI specification is available at:

- JSON: `/api/v1/openapi.json`
- YAML: `/api/v1/openapi.yaml`
- UI: `/api/docs` (Swagger UI)

## Postman Collection

Download our Postman collection:

- [KoyaLite.postman_collection.json](https://api.koyalite.dev/postman)

## API Versioning

- Current version: v1
- All endpoints are prefixed with `/api/v1/`
- Breaking changes will increment the version number

## CORS Configuration

By default, CORS is enabled for all origins in development. Configure it in production:

```typescript
// koyalite.config.ts
export default defineConfig({
    api: {
        cors: {
            origin: ["https://your-domain.com"],
            methods: ["GET", "POST", "PUT", "DELETE"],
        },
    },
});
```
