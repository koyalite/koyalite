import express from "express";
import pinoHttp from "pino-http";
import { logger } from "@koyalite/logger";
import { EdgeFunction } from "@koyalite/core-types";

const app = express();

// Logging middleware
app.use(pinoHttp({ logger }));

// JSON body parsing
app.use(express.json());

// Function execution endpoint
app.post("/edge/execute/:functionId", async (req, res) => {
    try {
        const { functionId } = req.params;
        const { args } = req.body;

        // TODO: Implement function execution using Deno runtime
        logger.info({ functionId, args }, "Executing edge function");

        res.json({ success: true });
    } catch (error) {
        logger.error({ error }, "Failed to execute edge function");
        res.status(500).json({ error: "Internal server error" });
    }
});

// Function deployment endpoint
app.post("/edge/deploy", async (req, res) => {
    try {
        const functionData = req.body as EdgeFunction;

        // TODO: Implement function deployment
        logger.info({ functionData }, "Deploying edge function");

        res.json({ success: true });
    } catch (error) {
        logger.error({ error }, "Failed to deploy edge function");
        res.status(500).json({ error: "Internal server error" });
    }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    logger.info({ port }, "Edge Runtime service started");
});
