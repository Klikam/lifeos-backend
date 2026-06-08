import express, { type Express } from 'express';
import habitsRoutes from './routes/habitsRoutes';
import usersRouter from './routes/usersRoutes';
import { errorHandler } from './middlewares/errorHandler.js';
import { requestLogger } from './middlewares/reqResLogger.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';
import frontendCors from './middlewares/cors';

const app: Express = express();

// Configure CORS middleware
app.use(frontendCors);

// Auth -> must be before express.json()
app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

// Logger -> must be before routes
app.use(requestLogger);

// Routes
app.use('/api/habits', habitsRoutes);
app.use('/api/users', usersRouter);

// Global error handling
app.use(errorHandler);

export default app;
