# Step 4: Domain Modeling

## Purpose

Domain modeling defines the core entities, relationships, and rules that shape how data and logic behave inside KoyaLite. It is essential for API generation, access control, storage, and internal consistency.

## Core Domain Entities

**Webhook**

- id

- project_id

- event_type

- target_url

- payload

- status

- last_attempt_at

- attempt_count

**Scheduled Task**

- id

- project_id

- function_id

- cron_schedule

- status

- last_run

- next_run

**Project**

- id

- name

- owner_id (references User)

- created_at, updated_at

- settings (e.g., compliance flags, rate limits)

- environment (dev, staging, prod) Below are the most important objects in KoyaLite’s data model:

**User**

- id

- email

- hashed_password

- role_id

created_at, updated_at

**Role**

- id

- name (e.g., admin, developer, viewer)

- permissions (JSON or normalized)

**Table**

- id

- name

- project_id

- columns (1:N relationship)

**Column**

- id

- table_id

- name, type, is_nullable, default, is_unique

**Relationship**

- id

- from_table_id, to_table_id

- type (1:1, 1:N, N:M)

- constraint_name

**Policy (RLS)**

- id

- table_id

- check (condition expression)

- enabled

- effect (allow/deny)

- created_by

**File**

- id

- user_id

- path

- mime_type

- size

- created_at

**Edge Function**

- id

- name

- version

- path

- region

- code or source_url

- schedule (for cron jobs)

**Email Log**

- id

- to, subject, status

- attempts, last_attempt_at

- template_id

\*\* Vector Index

- id

- name

- associated_table_id

- embedding_column

- created_at

**Audit Log**

- id

- actor_id

- action

- target_type, target_id

- timestamp, metadata

**Relationships Summary**

- One User can own many Projects

- One Project has many Tables, Edge Functions, Files, Email Logs, Webhooks, and Scheduled Tasks

- One User has one Role

- One Table has many Columns

- Policies and RLS rules are tied to individual Tables

- Edge Functions and Email Logs are tied to Users

- Files and Vectors are owned by Users

- One User can own many Projects

- One Project has many Tables, Edge Functions, Files, Email Logs, etc.

- One User has one Role

- One Table has many Columns

- Policies and RLS rules are tied to individual Tables

- Edge Functions and Email Logs are tied to Users

- Files and Vectors are owned by Users
