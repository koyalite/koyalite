import { sqliteTable, text, integer, blob } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  role_id: text('role_id').notNull(),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),
  updated_at: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const roles = sqliteTable('roles', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  permissions: blob('permissions', { mode: 'json' }).notNull().$type<string[]>(),
});

export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  owner_id: text('owner_id').notNull().references(() => users.id),
  settings: blob('settings', { mode: 'json' }).notNull(),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),
  updated_at: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const tables = sqliteTable('tables', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  project_id: text('project_id').notNull().references(() => projects.id),
});

export const columns = sqliteTable('columns', {
  id: text('id').primaryKey(),
  table_id: text('table_id').notNull().references(() => tables.id),
  name: text('name').notNull(),
  type: text('type').notNull(),
  is_nullable: integer('is_nullable', { mode: 'boolean' }).notNull(),
  default_value: text('default_value'),
  is_unique: integer('is_unique', { mode: 'boolean' }).notNull(),
});

export const relationships = sqliteTable('relationships', {
  id: text('id').primaryKey(),
  from_table_id: text('from_table_id').notNull().references(() => tables.id),
  to_table_id: text('to_table_id').notNull().references(() => tables.id),
  type: text('type').notNull(),
  constraint_name: text('constraint_name').notNull(),
});

export const policies = sqliteTable('policies', {
  id: text('id').primaryKey(),
  table_id: text('table_id').notNull().references(() => tables.id),
  check: text('check').notNull(),
  enabled: integer('enabled', { mode: 'boolean' }).notNull(),
  effect: text('effect').notNull(),
  created_by: text('created_by').notNull().references(() => users.id),
});

export const files = sqliteTable('files', {
  id: text('id').primaryKey(),
  user_id: text('user_id').notNull().references(() => users.id),
  path: text('path').notNull(),
  mime_type: text('mime_type').notNull(),
  size: integer('size').notNull(),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const edge_functions = sqliteTable('edge_functions', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  version: text('version').notNull(),
  path: text('path').notNull(),
  region: text('region'),
  code: text('code').notNull(),
  schedule: text('schedule'),
});

export const email_logs = sqliteTable('email_logs', {
  id: text('id').primaryKey(),
  to: text('to').notNull(),
  subject: text('subject').notNull(),
  status: text('status').notNull(),
  attempts: integer('attempts').notNull(),
  last_attempt_at: integer('last_attempt_at', { mode: 'timestamp' }),
  template_id: text('template_id').notNull(),
});

export const vector_indices = sqliteTable('vector_indices', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  associated_table_id: text('associated_table_id').notNull().references(() => tables.id),
  embedding_column: text('embedding_column').notNull(),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const audit_logs = sqliteTable('audit_logs', {
  id: text('id').primaryKey(),
  actor_id: text('actor_id').notNull().references(() => users.id),
  action: text('action').notNull(),
  target_type: text('target_type').notNull(),
  target_id: text('target_id').notNull(),
  timestamp: integer('timestamp', { mode: 'timestamp' }).notNull(),
  metadata: blob('metadata', { mode: 'json' }).notNull(),
}); 