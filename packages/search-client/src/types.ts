export interface SearchOptions {
    strategy: "fts" | "semantic" | "auto";
    limit?: number;
    offset?: number;
    minScore?: number;
}

export interface SearchResult<T> {
    items: T[];
    total: number;
    strategy: "fts" | "semantic";
    score: number;
}

export interface SearchClient {
    search<T>(query: string, options?: SearchOptions): Promise<SearchResult<T>>;
    index<T>(document: T, options?: { strategy?: "fts" | "semantic" | "both" }): Promise<void>;
    remove(id: string): Promise<void>;
}

export interface FTSConfig {
    tableName: string;
    searchableColumns: string[];
    indexedColumns?: string[];
    tokenizer?: "porter" | "unicode61" | "simple";
}

export interface WeaviateConfig {
    endpoint: string;
    apiKey?: string;
    className: string;
    vectorizer?: string;
}
