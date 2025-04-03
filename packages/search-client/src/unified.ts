import { Database } from "better-sqlite3";
import { SearchClient, SearchOptions, SearchResult, FTSConfig, WeaviateConfig } from "./types";
import { FTSSearchClient } from "./fts";
import { WeaviateSearchClient } from "./weaviate";

export class UnifiedSearchClient implements SearchClient {
    private ftsClient: FTSSearchClient;
    private weaviateClient: WeaviateSearchClient;

    constructor(db: Database, ftsConfig: FTSConfig, weaviateConfig: WeaviateConfig) {
        this.ftsClient = new FTSSearchClient(db, ftsConfig);
        this.weaviateClient = new WeaviateSearchClient(weaviateConfig);
    }

    async search<T>(
        query: string,
        options: SearchOptions = { strategy: "auto" }
    ): Promise<SearchResult<T>> {
        switch (options.strategy) {
            case "fts":
                return this.ftsClient.search<T>(query, options);
            case "semantic":
                return this.weaviateClient.search<T>(query, options);
            case "auto":
                // Use heuristics to determine the best search strategy
                if (this.shouldUseFTS(query)) {
                    return this.ftsClient.search<T>(query, options);
                } else {
                    return this.weaviateClient.search<T>(query, options);
                }
            default:
                throw new Error(`Unsupported search strategy: ${options.strategy}`);
        }
    }

    async index<T>(
        document: T,
        options: { strategy?: "fts" | "semantic" | "both" } = { strategy: "both" }
    ): Promise<void> {
        switch (options.strategy) {
            case "fts":
                await this.ftsClient.index(document);
                break;
            case "semantic":
                await this.weaviateClient.index(document);
                break;
            case "both":
                await Promise.all([
                    this.ftsClient.index(document),
                    this.weaviateClient.index(document),
                ]);
                break;
            default:
                throw new Error(`Unsupported indexing strategy: ${options.strategy}`);
        }
    }

    async remove(id: string): Promise<void> {
        await Promise.all([this.ftsClient.remove(id), this.weaviateClient.remove(id)]);
    }

    private shouldUseFTS(query: string): boolean {
        // Heuristics to determine whether to use FTS or semantic search
        // 1. Query contains exact phrases (quoted text)
        if (query.includes('"')) return true;

        // 2. Query uses boolean operators
        if (/\b(AND|OR|NOT)\b/i.test(query)) return true;

        // 3. Query is short and likely looking for exact matches
        if (query.split(" ").length <= 2) return true;

        // 4. Query contains special characters or numbers
        if (/[^a-zA-Z\s]/.test(query)) return true;

        // Default to semantic search for natural language queries
        return false;
    }
}
