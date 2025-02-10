import { Request, Response } from 'express';
import Image from '../models/Image';
import asyncHandler from '../middleware/async';
import ErrorResponse from '../utils/errorResponse';
import CloudStorageService from '../services/CloudStorageService';
import { IImage } from '../models/Image';

class ImageController {
    upload = asyncHandler(async (req: Request, res: Response) => {
        if (!req.file || !req.user) {
            throw new ErrorResponse('Please upload an image file and login', 400);
        }

        // Upload to cloud storage
        const imageUrl = await CloudStorageService.uploadFile(req.file);

        // Save reference in database
        const image = await Image.create({
            filename: req.file.originalname,
            url: imageUrl,
            mimetype: req.file.mimetype,
            size: req.file.size,
            uploadedBy: req.user._id
        });

        res.status(201).json({ 
            success: true, 
            data: image 
        });
    });

    getUserImages = asyncHandler(async (req: Request, res: Response) => {
        const images = await Image.find({ uploadedBy: req.params.userId })
                                .sort({ uploadDate: -1 });
        res.status(200).json({ 
            success: true, 
            data: images 
        });
    });

    delete = asyncHandler(async (req: Request, res: Response) => {
        const image = await Image.findById(req.params.id) as IImage | null;
        
        if (!image) {
            throw new ErrorResponse('Image not found', 404);
        }

        if (!req.user || !image.canModify(req.user.id)) {
            throw new ErrorResponse('Not authorized to delete this image', 403);
        }

        // Delete from cloud storage
        await CloudStorageService.deleteFile(image.url);

        // Delete from database
        await image.deleteOne();
        
        res.status(200).json({ 
            success: true, 
            data: {} 
        });
    });

    listImages = asyncHandler(async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;

        const images = await CloudStorageService.listFiles(page, limit);
        
        res.status(200).json({
            success: true,
            data: images
        });
    });
}

export default ImageController;
