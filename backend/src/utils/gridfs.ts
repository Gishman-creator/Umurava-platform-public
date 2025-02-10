import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import logger from './logger';
import config from '../config/config';

// Update interface to be more specific
type RequestWithUser = Request & {
    user?: {
        _id: string;
        email: string;
    };
};

// Create storage engine only if we're not in test environment
const storage = process.env.NODE_ENV !== 'test' 
  ? new GridFsStorage({
      url: config.mongoUrl,
      file: (req, file) => {
        return {
          filename: file.originalname,
          bucketName: 'uploads'
        };
      }
    })
  : null;

// Initialize bucket only if we're not in test environment
const bucket = process.env.NODE_ENV !== 'test' && mongoose.connection.db
  ? new GridFSBucket(mongoose.connection.db, {
      bucketName: 'uploads'
    })
  : null;

export { storage, bucket };

export const upload = multer({
    storage: storage as unknown as multer.StorageEngine,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            logger.error(`Invalid file type attempted: ${file.mimetype}`);
            cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
        }
    },
});
