import { Database } from "better-sqlite3";
import { migrations } from "./index";

migrations.push({
    id: 1,
    name: "001_initial_schema",
    up: (db: Database) => {
        // Users table
        db.exec(`
            CREATE TABLE users (
                id TEXT PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Organizations table
        db.exec(`
            CREATE TABLE organizations (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Roles table
        db.exec(`
            CREATE TABLE roles (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL CHECK (name IN ('owner', 'admin', 'member', 'viewer')),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // User-Organization membership table
        db.exec(`
            CREATE TABLE user_organizations (
                id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL,
                organization_id TEXT NOT NULL,
                role_id TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
                FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT,
                UNIQUE (user_id, organization_id)
            )
        `);

        // Projects table
        db.exec(`
            CREATE TABLE projects (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                organization_id TEXT NOT NULL,
                owner_id TEXT NOT NULL,
                settings JSON NOT NULL DEFAULT '{}',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
                FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE RESTRICT
            )
        `);

        // Insert default roles
        db.exec(`
            INSERT INTO roles (id, name) VALUES
            ('role_owner', 'owner'),
            ('role_admin', 'admin'),
            ('role_member', 'member'),
            ('role_viewer', 'viewer')
        `);
    },
    down: (db: Database) => {
        db.exec(`
            DROP TABLE IF EXISTS projects;
            DROP TABLE IF EXISTS user_organizations;
            DROP TABLE IF EXISTS roles;
            DROP TABLE IF EXISTS organizations;
            DROP TABLE IF EXISTS users;
        `);
    },
});
