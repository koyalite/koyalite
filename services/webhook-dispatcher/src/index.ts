import express from "express";
import fetch from "node-fetch";
import pinoHttp from "pino-http";
import { logger } from "@koyalite/logger";
import { db } from "@koyalite/database";

const app = express();

// Logging middleware
app.use(pinoHttp({ logger }));

// JSON body parsing
app.use(express.json());

// Webhook dispatch function
async function dispatchWebhook(url: string, payload: unknown, retries = 3) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        logger.info({ url }, "Webhook dispatched successfully");
        return true;
    } catch (error) {
        logger.error({ error, url }, "Failed to dispatch webhook");

        if (retries > 0) {
            logger.info({ retries }, "Retrying webhook dispatch");
            return dispatchWebhook(url, payload, retries - 1);
        }

        return false;
    }
}

// Webhook management endpoints
app.post("/webhooks/register", async (req, res) => {
    try {
        const { url, events } = req.body;

        // TODO: Register webhook in database
        logger.info({ url, events }, "Registering webhook");

        res.json({ success: true });
    } catch (error) {
        logger.error({ error }, "Failed to register webhook");
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/webhooks/trigger", async (req, res) => {
    try {
        const { event, payload } = req.body;

        // TODO: Get registered webhooks for event from database
        logger.info({ event }, "Triggering webhooks");

        // Example webhook dispatch
        await dispatchWebhook("http://example.com/webhook", payload);

        res.json({ success: true });
    } catch (error) {
        logger.error({ error }, "Failed to trigger webhooks");
        res.status(500).json({ error: "Internal server error" });
    }
});

const port = process.env.PORT || 3003;

app.listen(port, () => {
    logger.info({ port }, "Webhook Dispatcher service started");
});
