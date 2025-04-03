# KoyaLite SDK Guide

The KoyaLite SDK provides a type-safe way to interact with your KoyaLite backend from TypeScript/JavaScript applications.

## Installation

```bash
npm install @koyalite/sdk
# or
yarn add @koyalite/sdk
# or
pnpm add @koyalite/sdk
```

## Quick Start

```typescript
import { KoyaLite } from "@koyalite/sdk";

const client = new KoyaLite({
    apiKey: "your-api-key",
    baseUrl: "http://localhost:3000", // Optional
});
```

## Database Operations

### Querying Data

```typescript
// Basic query
const posts = await client.database.query("posts");

// With filters
const publishedPosts = await client.database.query("posts", {
    where: {
        published: true,
        author_id: "user-123",
    },
    orderBy: {
        created_at: "desc",
    },
    limit: 10,
    offset: 0,
});

// Select specific columns
const titles = await client.database.query("posts", {
    select: ["id", "title"],
});

// With relationships
const postsWithAuthors = await client.database.query("posts", {
    include: {
        author: true,
        comments: {
            include: {
                user: true,
            },
        },
    },
});
```

### Real-time Subscriptions

```typescript
// Subscribe to all changes
const unsubscribe = client.database.subscribe("posts", (change) => {
    console.log("Change type:", change.type); // 'INSERT' | 'UPDATE' | 'DELETE'
    console.log("Changed record:", change.record);
});

// Subscribe with filters
const unsubscribe = client.database.subscribe("posts", {
    where: {
        author_id: "user-123",
    },
    onInsert: (post) => console.log("New post:", post),
    onUpdate: (post) => console.log("Updated post:", post),
    onDelete: (id) => console.log("Deleted post:", id),
});

// Cleanup
unsubscribe();
```

## File Storage

### Uploading Files

```typescript
// Upload from buffer
const file = await client.storage.upload(fileBuffer, {
    path: "images/avatar.png",
    contentType: "image/png",
    metadata: {
        userId: "user-123",
    },
    isPublic: true,
});

// Upload stream
const stream = fs.createReadStream("large-file.mp4");
const file = await client.storage.uploadStream(stream, {
    path: "videos/large-file.mp4",
});

// Upload with progress
const file = await client.storage.uploadWithProgress(
    fileBuffer,
    {
        path: "documents/large.pdf",
    },
    (progress) => {
        console.log(`Upload progress: ${progress}%`);
    }
);
```

### Managing Files

```typescript
// Get file metadata
const file = await client.storage.getFileMetadata("file-id");

// Download file
const buffer = await client.storage.downloadFile("file-id");

// Stream download
const stream = await client.storage.downloadStream("file-id");

// Delete file
await client.storage.deleteFile("file-id");

// Get download URL
const url = await client.storage.getDownloadUrl("file-id", {
    expiresIn: "1h",
});
```

## Search

### Vector Search

```typescript
// Search near text
const results = await client.search.searchNearText("products", "blue shoes", {
    limit: 10,
    includeSimilarity: true,
});

// Search with vector
const results = await client.search.searchNearVector("products", vector, {
    filters: {
        category: "shoes",
    },
});

// Generate embedding
const embedding = await client.search.generateEmbedding("blue shoes");
```

## Authentication

### User Management

```typescript
// Login
const session = await client.auth.login({
    email: "user@example.com",
    password: "password123",
});

// Register
const user = await client.auth.register({
    email: "user@example.com",
    password: "password123",
    data: {
        name: "John Doe",
    },
});

// Get current session
const session = await client.auth.getSession();

// Logout
await client.auth.logout();
```

### OAuth

```typescript
// Start OAuth flow
const url = await client.auth.getOAuthUrl("github");

// Handle OAuth callback
const session = await client.auth.handleOAuthCallback(searchParams);
```

## Edge Functions

### Invoking Functions

```typescript
// Call function
const result = await client.functions.invoke("process-image", {
    imageUrl: "https://example.com/image.jpg",
});

// Stream response
const stream = await client.functions.invokeStream("generate-report");
```

## Error Handling

```typescript
try {
    await client.database.query("posts");
} catch (error) {
    if (error instanceof KoyaLiteError) {
        console.log("Error code:", error.code);
        console.log("Error message:", error.message);
        console.log("Error details:", error.details);
    }
}
```

## TypeScript Support

The SDK provides full TypeScript support. You can generate types from your schema:

```bash
pnpm koyalite codegen
```

Then use them in your code:

```typescript
import { Post, User } from "./generated/types";

const posts = await client.database.query<Post>("posts");
const users = await client.database.query<User>("users");
```

## Configuration

```typescript
const client = new KoyaLite({
    apiKey: "your-api-key",
    baseUrl: "http://localhost:3000",
    retries: 3,
    timeout: 30000,
    headers: {
        "Custom-Header": "value",
    },
});
```

## Best Practices

1. **Error Handling**

    ```typescript
    try {
        await client.database.query("posts");
    } catch (error) {
        if (error.code === "RATE_LIMITED") {
            // Handle rate limiting
        }
    }
    ```

2. **Resource Cleanup**

    ```typescript
    const unsubscribe = client.database.subscribe("posts", () => {});

    // Cleanup on component unmount
    useEffect(() => {
        return () => unsubscribe();
    }, []);
    ```

3. **Batch Operations**

    ```typescript
    // Use batch queries for better performance
    const results = await client.database.queryBatch([
        { table: "posts", where: { published: true } },
        { table: "users", where: { active: true } },
    ]);
    ```

4. **Type Safety**

    ```typescript
    // Use zod for runtime validation
    const schema = z.object({
        title: z.string(),
        content: z.string(),
    });

    const data = schema.parse(input);
    await client.database.query("posts", { data });
    ```
