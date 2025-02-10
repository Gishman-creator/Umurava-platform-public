import { Request, Response } from 'express';
import Video from '../models/Video';
import asyncHandler from '../middleware/async';
import ErrorResponse from '../utils/errorResponse';
import { ValidationError } from '../utils/errorHandler';
import VideoStorageService from '../services/VideoStorageService';

class VideoController {
    getAll = asyncHandler(async (req: Request, res: Response) => {
        const videos = await Video.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: videos });
    });

    upload = asyncHandler(async (req: Request, res: Response) => {
        if (!req.file) {
            throw new ErrorResponse('Please upload a video file', 400);
        }

        const videoUrl = await VideoStorageService.uploadVideo(req.file);

        const video = await Video.create({
            filename: req.file.originalname,
            url: videoUrl,
            mimetype: req.file.mimetype,
            size: req.file.size,
            duration: req.body.duration || 0
        });

        res.status(201).json({ success: true, data: video });
    });

    delete = asyncHandler(async (req: Request, res: Response) => {
        const video = await Video.findById(req.params.id);
        if (!video) {
            throw new ErrorResponse('Video not found', 404);
        }

        // Delete from Supabase storage
        await VideoStorageService.deleteVideo(video.url);
        
        // Delete from database
        await video.deleteOne();
        
        res.status(200).json({ success: true, data: {} });
    });

    getAllVideos = asyncHandler(async (req: Request, res: Response) => {
        const { page, limit } = req.query;
        const videos = await VideoStorageService.listVideos(
            Number(page) || 1,
            Number(limit) || 20
        );

        res.status(200).json({
            success: true,
            count: videos.length,
            data: videos
        });
    });

    searchVideos = asyncHandler(async (req: Request, res: Response) => {
        const { name } = req.query;
        
        if (!name || typeof name !== 'string') {
            throw new ValidationError('Search term is required');
        }

        const videos = await Video.find({
            filename: { $regex: name, $options: 'i' }
        });

        res.status(200).json({
            success: true,
            count: videos.length,
            data: videos
        });
    });
}

export default VideoController;
