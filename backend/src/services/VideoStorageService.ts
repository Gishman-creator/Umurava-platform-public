import logger from '../utils/logger';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

class VideoStorageService {
    private static supabase = (() => {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseKey) {
            logger.error('Missing Supabase credentials:', {
                url: !!supabaseUrl,
                key: !!supabaseKey
            });
            throw new Error('Supabase credentials are required');
        }

        return createClient(supabaseUrl, supabaseKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false
            }
        });
    })();

    static async uploadVideo(file: Express.Multer.File): Promise<string> {
        try {
            if (!file || !file.buffer) {
                throw new Error('Invalid file provided');
            }

            // Validate file type and size
            if (!file.mimetype.startsWith('video/')) {
                throw new Error('Only video files are allowed');
            }

            const maxSize = 100 * 1024 * 1024; // 100MB
            if (file.size > maxSize) {
                throw new Error('File size exceeds 100MB limit');
            }

            const timestamp = Date.now();
            const safeName = encodeURIComponent(file.originalname.replace(/\s+/g, '_'));
            const uniqueFilename = `${timestamp}-${safeName}`;

            logger.info('Attempting to upload video:', {
                filename: uniqueFilename,
                size: file.size,
                type: file.mimetype,
                bucket: 'videos'
            });

            // Upload video to Supabase Storage
            const { data, error } = await this.supabase.storage
                .from('videos')
                .upload(`public/${uniqueFilename}`, file.buffer, {
                    contentType: file.mimetype,
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) {
                logger.error('Supabase upload error:', error);
                throw error;
            }

            // Get public URL
            const { data: { publicUrl } } = this.supabase.storage
                .from('videos')
                .getPublicUrl(`public/${uniqueFilename}`);

            logger.info(`Video uploaded successfully: ${publicUrl}`);
            return publicUrl;

        } catch (error: any) {
            logger.error('Error uploading video:', {
                error: error.message,
                details: error.details || error.error_description,
                statusCode: error.statusCode
            });
            throw new Error(error.message || 'Failed to upload video');
        }
    }

    static async deleteVideo(fileUrl: string): Promise<void> {
        try {
            const fileName = fileUrl.split('/').pop();
            if (!fileName) {
                throw new Error('Invalid file URL');
            }

            logger.info('Attempting to delete video:', { fileName });

            const { error } = await this.supabase.storage
                .from('videos')
                .remove([`public/${fileName}`]);

            if (error) {
                logger.error('Supabase delete error:', error);
                throw error;
            }

            logger.info(`Video deleted successfully: ${fileName}`);
        } catch (error: any) {
            logger.error('Error deleting video:', {
                error: error.message,
                details: error.details
            });
            throw new Error('Failed to delete video');
        }
    }

    static async listVideos(page: number = 1, limit: number = 20): Promise<any[]> {
        try {
            const { data, error } = await this.supabase.storage
                .from('videos')
                .list('public', {
                    limit: limit,
                    offset: (page - 1) * limit,
                    sortBy: { column: 'created_at', order: 'desc' }
                });

            if (error) {
                logger.error('Supabase list error:', error);
                throw error;
            }

            return data.map(file => ({
                name: file.name,
                size: file.metadata?.size,
                created: file.created_at,
                url: this.supabase.storage
                    .from('videos')
                    .getPublicUrl(`public/${file.name}`).data.publicUrl
            }));

        } catch (error: any) {
            logger.error('Error listing videos:', {
                error: error.message,
                details: error.details
            });
            throw new Error('Failed to list videos');
        }
    }
}

export default VideoStorageService; 