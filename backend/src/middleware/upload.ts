import multer from 'multer';
import path from 'path';
import { Request } from 'express';

// Use memory storage for Appwrite uploads
const storage = multer.memoryStorage();

const fileFilter = (type: string) => (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    if (file.mimetype.startsWith(type)) {
        cb(null, true);
    } else {
        cb(new Error(`Please upload a ${type} file`));
    }
};

export const uploadImage = multer({
    storage,
    fileFilter: fileFilter('image/'),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

export const uploadVideo = multer({
    storage,
    fileFilter: fileFilter('video/'),
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});
