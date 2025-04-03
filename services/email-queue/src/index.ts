import express from "express";
import { Resend } from "resend";
import pinoHttp from "pino-http";
import { logger } from "@koyalite/logger";
import { db } from "@koyalite/database";
import { EmailLog } from "@koyalite/core-types";

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Logging middleware
app.use(pinoHttp({ logger }));

// JSON body parsing
app.use(express.json());

// Email sending function
async function sendEmail(email: EmailLog, retries = 3) {
    try {
        await resend.emails.send({
            from: "noreply@koyalite.dev",
            to: email.to,
            subject: email.subject,
            // TODO: Use email template from @koyalite/email-templates
            html: "<p>Example email</p>",
        });

        logger.info({ emailId: email.id }, "Email sent successfully");
        return true;
    } catch (error) {
        logger.error({ error, emailId: email.id }, "Failed to send email");

        if (retries > 0) {
            logger.info({ retries }, "Retrying email send");
            return sendEmail(email, retries - 1);
        }

        return false;
    }
}

// Email queue endpoints
app.post("/email/queue", async (req, res) => {
    try {
        const emailData = req.body as EmailLog;

        // TODO: Store email in queue (database)
        logger.info({ emailData }, "Queueing email");

        res.json({ success: true });
    } catch (error) {
        logger.error({ error }, "Failed to queue email");
        res.status(500).json({ error: "Internal server error" });
    }
});

// Process email queue
async function processEmailQueue() {
    try {
        // TODO: Get pending emails from database
        logger.info("Processing email queue");

        // Example email processing
        const email: EmailLog = {
            id: "123",
            to: "test@example.com",
            subject: "Test Email",
            status: "pending",
            attempts: 0,
            template_id: "welcome",
        };

        await sendEmail(email);
    } catch (error) {
        logger.error({ error }, "Failed to process email queue");
    }
}

// Process queue every minute
setInterval(processEmailQueue, 60 * 1000);

const port = process.env.PORT || 3004;

app.listen(port, () => {
    logger.info({ port }, "Email Queue service started");
});
