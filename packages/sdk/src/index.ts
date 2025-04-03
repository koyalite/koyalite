import { KoyaLiteClient } from "./client";
import { DatabaseResource } from "./resources/database";
import { StorageResource } from "./resources/storage";
import { SearchResource } from "./resources/search";

export class KoyaLite {
    public readonly database: DatabaseResource;
    public readonly storage: StorageResource;
    public readonly search: SearchResource;
    private readonly client: KoyaLiteClient;

    constructor(config: { apiKey: string; baseUrl?: string }) {
        this.client = new KoyaLiteClient(config);
        this.database = new DatabaseResource(this.client);
        this.storage = new StorageResource(this.client);
        this.search = new SearchResource(this.client);
    }

    close() {
        this.client.close();
    }
}

// Export types
export * from "@koyalite/core-types";

// Export default instance
export default KoyaLite;
