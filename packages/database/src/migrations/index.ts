import { Database } from "better-sqlite3";
import { logger } from "@koyalite/logger";

interface Migration {
    id: number;
    name: string;
    up: (db: Database) => void;
    down: (db: Database) => void;
}

// Array to store all migrations
export const migrations: Migration[] = [];

export async function runMigrations(db: Database, targetVersion?: number) {
    logger.info("Starting database migrations");

    // Create migrations table if it doesn't exist
    db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

    // Get current version
    const currentVersion =
        db.prepare("SELECT MAX(id) as version FROM migrations").get().version || 0;

    // Determine target version
    const finalVersion = targetVersion ?? migrations.length;

    if (currentVersion === finalVersion) {
        logger.info("Database is up to date");
        return;
    }

    // Sort migrations by ID
    const sortedMigrations = [...migrations].sort((a, b) => a.id - b.id);

    try {
        if (currentVersion < finalVersion) {
            // Migrate up
            for (const migration of sortedMigrations.slice(currentVersion)) {
                if (migration.id > finalVersion) break;

                logger.info(`Running migration up: ${migration.name}`);
                migration.up(db);

                db.prepare("INSERT INTO migrations (id, name) VALUES (?, ?)").run(
                    migration.id,
                    migration.name
                );
            }
        } else {
            // Migrate down
            for (const migration of sortedMigrations.slice(finalVersion).reverse()) {
                if (migration.id <= finalVersion) break;

                logger.info(`Running migration down: ${migration.name}`);
                migration.down(db);

                db.prepare("DELETE FROM migrations WHERE id = ?").run(migration.id);
            }
        }

        logger.info("Database migrations completed successfully");
    } catch (error) {
        logger.error("Error during migration:", error);
        throw error;
    }
}

// Example migration format:
/*
migrations.push({
  id: 1,
  name: '001_initial_schema',
  up: (db: Database) => {
    db.exec(`
      CREATE TABLE users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  },
  down: (db: Database) => {
    db.exec('DROP TABLE users');
  },
});
*/
