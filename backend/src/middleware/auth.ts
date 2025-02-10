/**
 * @module Auth
 * @description Authentication and authorization middleware
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../types';
import User from '../models/User';
import logger from '../utils/logger';
import { AuthenticationError, AuthorizationError } from '../utils/errorHandler';
import config from '../config/config';

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

/**
 * @middleware protect
 * @description Verify JWT token and attach user to request
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @throws {AuthenticationError} If token is invalid or missing
 */
export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token;

        if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            throw new AuthenticationError('Not authorized to access this route');
        }

        try {
            const decoded = jwt.verify(token, config.jwtSecret) as { id: string };
            const user = await User.findById(decoded.id);

            if (!user) {
                throw new AuthenticationError('User not found');
            }

            req.user = user;
            next();
        } catch (error) {
            throw new AuthenticationError('Invalid token');
        }
    } catch (error) {
        next(error);
    }
};

/**
 * @middleware authorize
 * @description Check if user has required role
 * @param {...string} roles - Allowed roles
 * @returns {Function} Express middleware
 * @throws {AuthorizationError} If user role is not allowed
 */
export const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                throw new AuthenticationError('User not found');
            }

            if (!roles.includes(req.user.role)) {
                throw new AuthorizationError(
                    `User role ${req.user.role} is not authorized to access this route`
                );
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};


