import { KoyaLiteClient } from "../client";
import { VectorIndex } from "@koyalite/core-types";
import { z } from "zod";

const createIndexSchema = z.object({
    name: z.string().min(1),
    associatedTableId: z.string().min(1),
    embeddingColumn: z.string().min(1),
});

const searchOptionsSchema = z.object({
    query: z.string().min(1),
    limit: z.number().min(1).max(100).optional().default(10),
    offset: z.number().min(0).optional().default(0),
    filters: z.record(z.any()).optional(),
    includeSimilarity: z.boolean().optional().default(false),
});

export class SearchResource {
    constructor(private client: KoyaLiteClient) {}

    // Index Operations
    async listIndices(): Promise<VectorIndex[]> {
        return this.client.get("/api/v1/search/indices");
    }

    async createIndex(data: z.infer<typeof createIndexSchema>): Promise<VectorIndex> {
        return this.client.post("/api/v1/search/indices", data);
    }

    async deleteIndex(indexId: string): Promise<void> {
        return this.client.delete(`/api/v1/search/indices/${indexId}`);
    }

    async getIndex(indexId: string): Promise<VectorIndex> {
        return this.client.get(`/api/v1/search/indices/${indexId}`);
    }

    // Search Operations
    async search<T>(
        indexId: string,
        options: z.infer<typeof searchOptionsSchema>
    ): Promise<{
        results: T[];
        total: number;
        similarities?: number[];
    }> {
        return this.client.post(`/api/v1/search/indices/${indexId}/search`, options);
    }

    async searchNearText<T>(
        indexId: string,
        text: string,
        options: Omit<z.infer<typeof searchOptionsSchema>, "query"> = {}
    ): Promise<{
        results: T[];
        total: number;
        similarities?: number[];
    }> {
        return this.search(indexId, { ...options, query: text });
    }

    async searchNearVector<T>(
        indexId: string,
        vector: number[],
        options: Omit<z.infer<typeof searchOptionsSchema>, "query"> = {}
    ): Promise<{
        results: T[];
        total: number;
        similarities?: number[];
    }> {
        return this.client.post(`/api/v1/search/indices/${indexId}/search-vector`, {
            ...options,
            vector,
        });
    }

    // Batch Operations
    async batchIndex(indexId: string, records: Record<string, any>[]): Promise<void> {
        return this.client.post(`/api/v1/search/indices/${indexId}/batch`, {
            records,
        });
    }

    async batchDelete(indexId: string, recordIds: string[]): Promise<void> {
        return this.client.post(`/api/v1/search/indices/${indexId}/batch-delete`, {
            recordIds,
        });
    }

    // Utility Operations
    async generateEmbedding(text: string): Promise<number[]> {
        const response = await this.client.post("/api/v1/search/generate-embedding", {
            text,
        });
        return response.embedding;
    }

    async reindexTable(tableId: string): Promise<void> {
        return this.client.post(`/api/v1/search/reindex/${tableId}`);
    }
}
