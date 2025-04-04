// User and Auth Types
export interface User {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Organization {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

// Organization Membership and Roles
export interface UserOrganization {
    id: string;
    userId: string;
    organizationId: string;
    roleId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Role {
    id: string;
    name: OrganizationRole;
    permissions: Permission[];
}

export type OrganizationRole = "owner" | "admin" | "member" | "viewer";

export interface Permission {
    action: PermissionAction;
    resource: PermissionResource;
}

export type PermissionAction = "create" | "read" | "update" | "delete" | "manage";
export type PermissionResource =
    | "project"
    | "user"
    | "organization"
    | "role"
    | "policy"
    | "function";

// Project Types
export interface Project {
    id: string;
    name: string;
    organizationId: string; // Projects belong to an organization
    ownerId: string; // User who created/owns the project
    settings: ProjectSettings;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProjectSettings {
    compliance_flags: ComplianceFlags;
    rate_limits: RateLimits;
    environment: "development" | "staging" | "production";
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
    type: "one_to_one" | "one_to_many" | "many_to_many";
    constraint_name: string;
}

// RLS Types
export interface Policy {
    id: string;
    table_id: string;
    check: string;
    enabled: boolean;
    effect: "allow" | "deny";
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
    status: "pending" | "sent" | "failed";
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

// API Response Types
export interface ApiResponse<T> {
    data: T;
    meta?: {
        total?: number;
        page?: number;
        limit?: number;
    };
}

export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
}

// Common Types
export type ID = string;
export type Timestamp = Date | string;

// Utility Types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncResponse<T> = Promise<ApiResponse<T>>;

// Environment Types
export interface Environment {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;

    // Database
    SQLITE_PATH: string;
    SQLCIPHER_KEY?: string;

    // Auth
    JWT_SECRET: string;
    SESSION_SECRET: string;

    // Email
    RESEND_API_KEY: string;

    // Storage
    SEAWEEDFS_MASTER: string;

    // Search
    WEAVIATE_ENDPOINT: string;
    WEAVIATE_API_KEY?: string;

    // Analytics
    POSTHOG_API_KEY: string;
    POSTHOG_HOST: string;

    // Observability
    OTEL_EXPORTER_OTLP_ENDPOINT: string;
    OTEL_SERVICE_NAME: string;

    // Edge Functions
    DENO_DEPLOY_TOKEN?: string;

    // Secrets Management
    INFISICAL_TOKEN?: string;
}

// Helper type for role-based operations
export interface OrganizationMember {
    user: User;
    role: Role;
    joinedAt: Date;
}

// Helper types for organization operations
export interface OrganizationWithMembers extends Organization {
    members: OrganizationMember[];
}

export interface ProjectWithOrganization extends Project {
    organization: Organization;
    owner: User;
}
