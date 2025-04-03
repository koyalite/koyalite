import express from 'express';
import { CronJob } from 'cron';
import pinoHttp from 'pino-http';
import { logger } from '@koyalite/logger';
import { db } from '@koyalite/database';

const app = express();

// Logging middleware
app.use(pinoHttp({ logger }));

// JSON body parsing
app.use(express.json());

// Initialize cron jobs from database
async function initializeCronJobs() {
  try {
    // TODO: Load scheduled tasks from database
    logger.info('Initializing cron jobs');

    // Example cron job
    new CronJob('*/5 * * * *', () => {
      logger.info('Running scheduled task');
    }).start();
  } catch (error) {
    logger.error({ error }, 'Failed to initialize cron jobs');
  }
}

// Schedule management endpoints
app.post('/scheduler/tasks', async (req, res) => {
  try {
    const { name, schedule, functionId } = req.body;

    // TODO: Create scheduled task in database
    logger.info({ name, schedule, functionId }, 'Creating scheduled task');

    res.json({ success: true });
  } catch (error) {
    logger.error({ error }, 'Failed to create scheduled task');
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/scheduler/tasks/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;

    // TODO: Delete scheduled task from database
    logger.info({ taskId }, 'Deleting scheduled task');

    res.json({ success: true });
  } catch (error) {
    logger.error({ error }, 'Failed to delete scheduled task');
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = process.env.PORT || 3002;

// Initialize cron jobs before starting server
initializeCronJobs().then(() => {
  app.listen(port, () => {
    logger.info({ port }, 'Scheduler service started');
  });
}); 