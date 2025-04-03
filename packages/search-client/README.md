# KoyaLite Search Client

The KoyaLite Search Client provides a unified interface for both full-text search (using SQLite FTS5) and semantic search (using Weaviate) capabilities.

## Features

- **Dual Search Strategies**:

    - SQLite FTS5 for efficient full-text search
    - Weaviate for AI-powered semantic search
    - Automatic strategy selection based on query characteristics

- **Unified Interface**:
    - Single API for both search types
    - Consistent result format
    - Configurable search options

## Installation

This is an internal package within the KoyaLite monorepo. It's managed through pnpm workspaces and is not published to npm.

### Within KoyaLite Monorepo

Add to your package.json dependencies:

```json
{
    "dependencies": {
        "@koyalite/search-client": "workspace:*"
    }
}
```

Then run:

```bash
pnpm install
```

## Usage

### Basic Setup

```typescript
import { UnifiedSearchClient } from "@koyalite/search-client";
import Database from "better-sqlite3";

const db = new Database("your-database.sqlite");

const searchClient = new UnifiedSearchClient(
    db,
    {
        // FTS Configuration
        tableName: "documents_fts",
        searchableColumns: ["title", "content"],
        indexedColumns: ["id", "created_at"],
        tokenizer: "porter",
    },
    {
        // Weaviate Configuration
        endpoint: "http://localhost:8080",
        apiKey: "your-api-key",
        className: "Document",
    }
);
```

### Searching

```typescript
// Auto-select search strategy based on query
const results = await searchClient.search("your query", {
    strategy: "auto",
    limit: 10,
    offset: 0,
    minScore: 0.3,
});

// Force FTS search
const ftsResults = await searchClient.search('exact phrase "quoted text"', {
    strategy: "fts",
});

// Force semantic search
const semanticResults = await searchClient.search("find documents about similar concepts", {
    strategy: "semantic",
});
```

### Indexing Documents

```typescript
// Index in both FTS and Weaviate
await searchClient.index({
    id: "123",
    title: "Document Title",
    content: "Document content...",
});

// Index only in FTS
await searchClient.index(document, { strategy: "fts" });

// Index only in Weaviate
await searchClient.index(document, { strategy: "semantic" });
```

### Removing Documents

```typescript
await searchClient.remove("document-id");
```

## Search Strategy Selection

The auto-selection strategy chooses between FTS and semantic search based on:

1. **FTS is chosen when**:

    - Query contains exact phrases (quoted text)
    - Query uses boolean operators (AND, OR, NOT)
    - Query is short (1-2 words)
    - Query contains special characters or numbers

2. **Semantic search is chosen when**:
    - Query is in natural language
    - Query is longer and more descriptive
    - Query seeks conceptual matches

## Configuration

### FTS Configuration

```typescript
interface FTSConfig {
    tableName: string;
    searchableColumns: string[];
    indexedColumns?: string[];
    tokenizer?: "porter" | "unicode61" | "simple";
}
```

### Weaviate Configuration

```typescript
interface WeaviateConfig {
    endpoint: string;
    apiKey?: string;
    className: string;
    vectorizer?: string;
}
```

## Performance Considerations

- FTS is optimized for:

    - Exact phrase matching
    - Boolean queries
    - High-performance text search
    - Lower latency requirements

- Semantic search is optimized for:
    - Conceptual similarity
    - Natural language queries
    - Context-aware search
    - Fuzzy matching

## Error Handling

The search client throws errors for:

- Invalid configuration
- Failed database operations
- Network issues with Weaviate
- Invalid search/index strategies
