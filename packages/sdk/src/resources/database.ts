import { KoyaLiteClient } from '../client';
import { Table, Column, Relationship, Policy } from '@koyalite/core-types';
import { z } from 'zod';

const createTableSchema = z.object({
  name: z.string().min(1),
  columns: z.array(z.object({
    name: z.string().min(1),
    type: z.string().min(1),
    isNullable: z.boolean().optional().default(false),
    defaultValue: z.string().optional(),
    isUnique: z.boolean().optional().default(false),
  })),
});

export class DatabaseResource {
  constructor(private client: KoyaLiteClient) {}

  // Table Operations
  async listTables(): Promise<Table[]> {
    return this.client.get('/api/v1/tables');
  }

  async createTable(data: z.infer<typeof createTableSchema>): Promise<Table> {
    return this.client.post('/api/v1/tables', data);
  }

  async getTable(tableId: string): Promise<Table> {
    return this.client.get(`/api/v1/tables/${tableId}`);
  }

  async deleteTable(tableId: string): Promise<void> {
    return this.client.delete(`/api/v1/tables/${tableId}`);
  }

  // Column Operations
  async addColumn(tableId: string, column: Omit<Column, 'id' | 'table_id'>): Promise<Column> {
    return this.client.post(`/api/v1/tables/${tableId}/columns`, column);
  }

  async updateColumn(tableId: string, columnId: string, changes: Partial<Column>): Promise<Column> {
    return this.client.put(`/api/v1/tables/${tableId}/columns/${columnId}`, changes);
  }

  async deleteColumn(tableId: string, columnId: string): Promise<void> {
    return this.client.delete(`/api/v1/tables/${tableId}/columns/${columnId}`);
  }

  // Relationship Operations
  async createRelationship(data: Omit<Relationship, 'id'>): Promise<Relationship> {
    return this.client.post('/api/v1/relationships', data);
  }

  async deleteRelationship(relationshipId: string): Promise<void> {
    return this.client.delete(`/api/v1/relationships/${relationshipId}`);
  }

  // Policy Operations
  async listPolicies(tableId: string): Promise<Policy[]> {
    return this.client.get(`/api/v1/tables/${tableId}/policies`);
  }

  async createPolicy(tableId: string, policy: Omit<Policy, 'id' | 'table_id'>): Promise<Policy> {
    return this.client.post(`/api/v1/tables/${tableId}/policies`, policy);
  }

  async updatePolicy(tableId: string, policyId: string, changes: Partial<Policy>): Promise<Policy> {
    return this.client.put(`/api/v1/tables/${tableId}/policies/${policyId}`, changes);
  }

  async deletePolicy(tableId: string, policyId: string): Promise<void> {
    return this.client.delete(`/api/v1/tables/${tableId}/policies/${policyId}`);
  }

  // Query Operations
  async query<T>(sql: string, params?: Record<string, any>): Promise<T[]> {
    return this.client.post('/api/v1/query', { sql, params });
  }

  // Schema Operations
  async getSchema(): Promise<{
    tables: Table[];
    relationships: Relationship[];
  }> {
    return this.client.get('/api/v1/schema');
  }

  // Real-time Changes
  subscribeToChanges(tableId: string, callback: (change: any) => void) {
    return this.client.connectWebSocket(`/ws/tables/${tableId}/changes`, {
      onMessage: callback,
    });
  }
} 