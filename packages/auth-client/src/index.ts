import { lucia } from "lucia";
import { betterSqlite3 } from "@lucia-auth/adapter-sqlite";
import { github, google } from "arctic";
import { db } from "@koyalite/database";
import { logger } from "@koyalite/logger";
import type { User } from "@koyalite/core-types";

// Initialize Lucia auth
export const auth = lucia({
    adapter: betterSqlite3(db, {
        user: "users",
        session: "sessions",
        key: "keys",
    }),
    env: process.env.NODE_ENV === "production" ? "PROD" : "DEV",
    middleware: {
        // Add middleware hooks here
    },
    getUserAttributes: (data) => {
        return {
            email: data.email,
            role_id: data.role_id,
        };
    },
});

// Initialize OAuth providers
export const githubAuth = github(auth, {
    clientId: process.env.GITHUB_CLIENT_ID ?? "",
    clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
});

export const googleAuth = google(auth, {
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    redirectUri: process.env.GOOGLE_REDIRECT_URI ?? "",
});

// Helper functions
export async function createUser(email: string, password: string): Promise<User> {
    try {
        const user = await auth.createUser({
            key: {
                providerId: "email",
                providerUserId: email,
                password,
            },
            attributes: {
                email,
                role_id: "default", // Assign default role
            },
        });

        logger.info({ userId: user.userId }, "User created successfully");
        return user;
    } catch (error) {
        logger.error({ error }, "Failed to create user");
        throw error;
    }
}

export async function validateSession(sessionId: string) {
    try {
        const { session, user } = await auth.validateSession(sessionId);
        return { session, user };
    } catch (error) {
        logger.error({ error }, "Failed to validate session");
        throw error;
    }
}

export async function invalidateSession(sessionId: string) {
    try {
        await auth.invalidateSession(sessionId);
        logger.info({ sessionId }, "Session invalidated successfully");
    } catch (error) {
        logger.error({ error }, "Failed to invalidate session");
        throw error;
    }
}

export type { Session } from "lucia";
