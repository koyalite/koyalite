// User and Auth Types
export interface User {
  id: string;
  email: string;
  role_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface Permission {
  action: string;
  resource: string;
}

// Project Types
export interface Project {
  id: string;
  name: string;
  owner_id: string;
  settings: ProjectSettings;
  created_at: Date;
  updated_at: Date;
}

export interface ProjectSettings {
  compliance_flags: ComplianceFlags;
  rate_limits: RateLimits;
  environment: 'development' | 'staging' | 'production';
}

export interface ComplianceFlags {
  hipaa_enabled: boolean;
  gdpr_enabled: boolean;
  ccpa_enabled: boolean;
}

export interface RateLimits {
  requests_per_second: number;
  burst_size: number;
}

// Database Types
export interface Table {
  id: string;
  name: string;
  project_id: string;
  columns: Column[];
}

export interface Column {
  id: string;
  table_id: string;
  name: string;
  type: string;
  is_nullable: boolean;
  default_value?: string;
  is_unique: boolean;
}

export interface Relationship {
  id: string;
  from_table_id: string;
  to_table_id: string;
  type: 'one_to_one' | 'one_to_many' | 'many_to_many';
  constraint_name: string;
}

// RLS Types
export interface Policy {
  id: string;
  table_id: string;
  check: string;
  enabled: boolean;
  effect: 'allow' | 'deny';
  created_by: string;
}

// Storage Types
export interface File {
  id: string;
  user_id: string;
  path: string;
  mime_type: string;
  size: number;
  created_at: Date;
}

// Edge Function Types
export interface EdgeFunction {
  id: string;
  name: string;
  version: string;
  path: string;
  region?: string;
  code: string;
  schedule?: string;
}

// Email Types
export interface EmailLog {
  id: string;
  to: string;
  subject: string;
  status: 'pending' | 'sent' | 'failed';
  attempts: number;
  last_attempt_at?: Date;
  template_id: string;
}

// Search Types
export interface VectorIndex {
  id: string;
  name: string;
  associated_table_id: string;
  embedding_column: string;
  created_at: Date;
}

// Audit Types
export interface AuditLog {
  id: string;
  actor_id: string;
  action: string;
  target_type: string;
  target_id: string;
  timestamp: Date;
  metadata: Record<string, unknown>;
} 