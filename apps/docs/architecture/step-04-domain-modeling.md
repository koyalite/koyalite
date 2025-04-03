# Step 4: Domain Modeling

## Purpose

Domain modeling defines the core entities, relationships, and rules that shape how data and logic behave inside KoyaLite. It is essential for API generation, access control, storage, and internal consistency.

## Core Domain Entities

### User
- id: string
- email: string
- role_id: string
- created_at: Date
- updated_at: Date

### Role
- id: string
- name: string
- permissions: Permission[]

### Permission
- action: string
- resource: string

### Project
- id: string
- name: string
- owner_id: string (references User)
- settings: ProjectSettings
- created_at: Date
- updated_at: Date

### ProjectSettings
- compliance_flags: ComplianceFlags
- rate_limits: RateLimits
- environment: 'development' | 'staging' | 'production'

### ComplianceFlags
- hipaa_enabled: boolean
- gdpr_enabled: boolean
- ccpa_enabled: boolean

### RateLimits
- requests_per_second: number
- burst_size: number

### Table
- id: string
- name: string
- project_id: string
- columns: Column[]

### Column
- id: string
- table_id: string
- name: string
- type: string
- is_nullable: boolean
- default_value?: string
- is_unique: boolean

### Relationship
- id: string
- from_table_id: string
- to_table_id: string
- type: 'one_to_one' | 'one_to_many' | 'many_to_many'
- constraint_name: string

### Policy (RLS)
- id: string
- table_id: string
- check: string
- enabled: boolean
- effect: 'allow' | 'deny'
- created_by: string

### File
- id: string
- user_id: string
- path: string
- mime_type: string
- size: number
- created_at: Date

### EdgeFunction
- id: string
- name: string
- version: string
- path: string
- region?: string
- code: string
- schedule?: string

### EmailLog
- id: string
- to: string
- subject: string
- status: 'pending' | 'sent' | 'failed'
- attempts: number
- last_attempt_at?: Date
- template_id: string

### VectorIndex
- id: string
- name: string
- associated_table_id: string
- embedding_column: string
- created_at: Date

### AuditLog
- id: string
- actor_id: string
- action: string
- target_type: string
- target_id: string
- timestamp: Date
- metadata: Record<string, unknown>

## Relationships

- One User can own many Projects
- One User has one Role
- One Project has many Tables
- One Table has many Columns
- One Table can have many Relationships (as either source or target)
- One Table can have many Policies
- One Table can have one VectorIndex
- One User can own many Files
- One Project can have many EdgeFunctions
- System tracks all changes through AuditLogs
