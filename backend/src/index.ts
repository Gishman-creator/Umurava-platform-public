import express, { Express, Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './utils/logger';
import userRoutes from './routes/userRoutes';
import challengeRoutes from './routes/challengeRoutes';
import config from './config/config';
import { ValidationError, AuthenticationError, AuthorizationError, NotFoundError } from './utils/errorHandler';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import imageRoutes from './routes/imageRoutes';
import path from 'path';

dotenv.config();

const app: Express = express();

const port = Number(process.env.PORT) || 3001; 

// CORS configuration
const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With']
};

// Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Add this after your middleware setup
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Database connection
mongoose.connect(config.mongoUrl)
    .then(() => logger.info('Connected to MongoDB'))
    .catch((err) => {
        logger.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Routes
app.use('/users', userRoutes);
app.use('/challenges', challengeRoutes);
app.use('/images', imageRoutes);
// Swagger Documentation
// app.use('/api-docs', swaggerUi.serve());
// app.use('/api-docs', swaggerUi.setup(specs));

// Error handling middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // Log error details for debugging
    logger.error('Error:', {
        type: err.constructor.name,
        message: err.message,
        path: req.path,
        method: req.method,
        ip: req.ip,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });

    // Handle Mongoose Validation Errors
    if (err.name === 'ValidationError') {
        res.status(400).json({
            status: 'error',
            type: 'ValidationError',
            message: 'Invalid data provided',
            details: Object.values((err as any).errors).map((e: any) => ({
                field: e.path,
                message: e.message
            }))
        });
        return;
    }

    // Handle Mongoose Cast Errors (invalid IDs)
    if (err.name === 'CastError') {
        res.status(400).json({
            status: 'error',
            type: 'InvalidDataError',
            message: 'Invalid ID format',
            details: {
                field: (err as any).path,
                value: (err as any).value
            }
        });
        return;
    }

    // Handle Duplicate Key Errors
    if ((err as any).code === 11000) {
        const field = Object.keys((err as any).keyValue)[0];
        res.status(400).json({
            status: 'error',
            type: 'DuplicateError',
            message: `${field} already exists`,
            details: {
                field,
                value: (err as any).keyValue[field]
            }
        });
        return;
    }

    // Handle custom errors
    if (err instanceof ValidationError) {
        res.status(400).json({
            status: 'error',
            type: 'ValidationError',
            message: err.message
        });
        return;
    }

    if (err instanceof AuthenticationError) {
        res.status(401).json({
            status: 'error',
            type: 'AuthenticationError',
            message: err.message
        });
        return;
    }

    if (err instanceof AuthorizationError) {
        res.status(403).json({
            status: 'error',
            type: 'AuthorizationError',
            message: err.message
        });
        return;
    }

    if (err instanceof NotFoundError) {
        res.status(404).json({
            status: 'error',
            type: 'NotFoundError',
            message: err.message
        });
        return;
    }

    // Handle MongoDB connection errors
    if (err.name === 'MongoServerError') {
        res.status(500).json({
            status: 'error',
            type: 'DatabaseError',
            message: 'Database operation failed',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
        return;
    }

    // Default error (500 Internal Server Error)
    res.status(500).json({
        status: 'error',
        type: 'InternalServerError',
        message: process.env.NODE_ENV === 'development' 
            ? err.message 
            : 'An unexpected error occurred',
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

app.use(errorHandler);

// Health check route
app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
});

// Start server
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
}

export default app;
