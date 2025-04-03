import { Database } from "better-sqlite3";
import { FTSConfig, SearchOptions, SearchResult } from "./types";

export class FTSSearchClient {
    private db: Database;
    private config: FTSConfig;

    constructor(db: Database, config: FTSConfig) {
        this.db = db;
        this.config = config;
        this.initializeFTS();
    }

    private initializeFTS() {
        const columns = [
            ...this.config.searchableColumns,
            ...(this.config.indexedColumns || []),
        ].join(", ");

        const tokenizer = this.config.tokenizer ? `tokenize="${this.config.tokenizer}"` : "";

        this.db.exec(`
      CREATE VIRTUAL TABLE IF NOT EXISTS ${this.config.tableName} 
      USING fts5(
        ${columns},
        ${tokenizer}
      )
    `);
    }

    async search<T>(query: string, options?: SearchOptions): Promise<SearchResult<T>> {
        const limit = options?.limit || 10;
        const offset = options?.offset || 0;
        const minScore = options?.minScore || 0.3;

        const stmt = this.db.prepare(`
      SELECT *, bm25(${this.config.tableName}) as score
      FROM ${this.config.tableName}
      WHERE ${this.config.tableName} MATCH ?
      AND bm25(${this.config.tableName}) > ?
      ORDER BY bm25(${this.config.tableName}) DESC
      LIMIT ? OFFSET ?
    `);

        const countStmt = this.db.prepare(`
      SELECT COUNT(*) as count
      FROM ${this.config.tableName}
      WHERE ${this.config.tableName} MATCH ?
      AND bm25(${this.config.tableName}) > ?
    `);

        const items = stmt.all(query, minScore, limit, offset) as T[];
        const { count } = countStmt.get(query, minScore) as { count: number };

        return {
            items,
            total: count,
            strategy: "fts",
            score: items.length > 0 ? (items as any)[0].score : 0,
        };
    }

    async index<T extends Record<string, any>>(document: T): Promise<void> {
        const columns = [...this.config.searchableColumns, ...(this.config.indexedColumns || [])];

        const placeholders = columns.map(() => "?").join(", ");
        const values = columns.map((col) => document[col]);

        const stmt = this.db.prepare(`
      INSERT INTO ${this.config.tableName} (${columns.join(", ")})
      VALUES (${placeholders})
    `);

        stmt.run(...values);
    }

    async remove(id: string): Promise<void> {
        const stmt = this.db.prepare(`
      DELETE FROM ${this.config.tableName}
      WHERE id = ?
    `);

        stmt.run(id);
    }
}
