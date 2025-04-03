import { Database } from "better-sqlite3";
import { beforeAll, afterAll, afterEach } from "vitest";
import type { User, Organization } from "@koyalite/core-types";

// Test database instance
let testDb: Database;

// Setup and teardown helpers
export function setupTestDatabase() {
    beforeAll(() => {
        testDb = new Database(":memory:");
        // Add any initial schema setup here
    });

    afterEach(() => {
        // Clean up tables after each test
        testDb.exec("DELETE FROM users");
        testDb.exec("DELETE FROM organizations");
        // Add more table cleanups as needed
    });

    afterAll(() => {
        testDb.close();
    });

    return testDb;
}

// Mock data generators
export function createMockUser(overrides?: Partial<User>): User {
    return {
        id: `user_${Math.random().toString(36).slice(2)}`,
        email: `test${Math.random().toString(36).slice(2)}@example.com`,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...overrides,
    };
}

export function createMockOrganization(overrides?: Partial<Organization>): Organization {
    return {
        id: `org_${Math.random().toString(36).slice(2)}`,
        name: `Test Organization ${Math.random().toString(36).slice(2)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...overrides,
    };
}

// Test assertions
export function assertDatesAreClose(actual: Date, expected: Date, toleranceMs = 1000) {
    const diff = Math.abs(actual.getTime() - expected.getTime());
    if (diff > toleranceMs) {
        throw new Error(`Dates are not within ${toleranceMs}ms of each other`);
    }
}

// Mock service responses
export function createMockApiResponse<T>(data: T) {
    return {
        data,
        meta: {
            total: 1,
            page: 1,
            limit: 10,
        },
    };
}

// Test environment helpers
export function withTestEnv<T>(fn: () => Promise<T>) {
    const originalEnv = process.env;

    process.env = {
        ...process.env,
        NODE_ENV: "test",
        SQLITE_PATH: ":memory:",
        JWT_SECRET: "test-secret",
        SESSION_SECRET: "test-session-secret",
    };

    return fn().finally(() => {
        process.env = originalEnv;
    });
}
