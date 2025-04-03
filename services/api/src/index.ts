import express from 'express';
import { createYoga } from 'graphql-yoga';
import pinoHttp from 'pino-http';
import { logger } from '@koyalite/logger';
import { schema } from './schema';
import { restRouter } from './routes';
import { authMiddleware } from './middleware/auth';
import { errorHandler } from './middleware/error';

const app = express();

// Logging middleware
app.use(pinoHttp({ logger }));

// JSON body parsing
app.use(express.json());

// Auth middleware
app.use(authMiddleware);

// REST API routes
app.use('/api/v1', restRouter);

// GraphQL endpoint
const yoga = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  // Add any GraphQL-specific middleware or plugins here
});
app.use(yoga.graphqlEndpoint, yoga);

// Error handling
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info({ port }, 'API server started');
}); 