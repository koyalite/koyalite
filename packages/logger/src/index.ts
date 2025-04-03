import pino from "pino";
import { z } from "zod";

const loggerOptionsSchema = z.object({
    level: z.enum(["trace", "debug", "info", "warn", "error", "fatal"]).default("info"),
    pretty: z.boolean().default(process.env.NODE_ENV !== "production"),
    service: z.string().optional(),
    environment: z.enum(["development", "staging", "production"]).default("development"),
});

export type LoggerOptions = z.infer<typeof loggerOptionsSchema>;

function createLogger(options: Partial<LoggerOptions> = {}) {
    const config = loggerOptionsSchema.parse(options);

    const baseLogger = pino({
        level: config.level,
        timestamp: true,
        base: {
            service: config.service,
            environment: config.environment,
        },
        ...(config.pretty
            ? {
                  transport: {
                      target: "pino-pretty",
                      options: {
                          colorize: true,
                          translateTime: "SYS:standard",
                          ignore: "pid,hostname",
                      },
                  },
              }
            : {}),
    });

    return baseLogger.child({});
}

// Create default logger instance
export const logger = createLogger({
    service: process.env.SERVICE_NAME,
    environment:
        (process.env.NODE_ENV as "development" | "staging" | "production") || "development",
});

// Export factory function
export { createLogger };

// Export types
export type Logger = pino.Logger;
export type LogFn = pino.LogFn;
export type LoggerLevel = pino.Level;
