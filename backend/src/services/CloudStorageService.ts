import axios from 'axios';
import logger from '../utils/logger';
import { createClient } from '@supabase/supabase-js';
import config from '../config/config';
import dotenv from 'dotenv';
import sharp from 'sharp';

// Load environment variables
dotenv.config();

const convertToJpg = async (inputBuffer: Buffer): Promise<Buffer> => {
    return sharp(inputBuffer)
        .resize({ width: 1024 }) // Resize width to 1024px, adjust if needed
        .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
        .toBuffer();
};

class CloudStorageService {
    private static supabase = (() => {
        const supabaseUrl = process.env.SUPABASE_URL;
        // Use service role key instead of anon key for admin access
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        console.log('SUPABASE_URL:', supabaseUrl);
        console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey);

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

    static async uploadFile(file: Express.Multer.File): Promise<string> {
        try {
            if (!file || !file.buffer) {
                throw new Error('Invalid file provided');
            }

            // Validate file type and size
            if (!file.mimetype.startsWith('image/')) {
                throw new Error('Only image files are allowed');
            }

            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                throw new Error('File size exceeds 5MB limit');
            }

            const optimizedBuffer = await convertToJpg(file.buffer);

            const timestamp = Date.now();
            const safeName = encodeURIComponent(file.originalname.replace(/\s+/g, '_'));
            const uniqueFilename = `${timestamp}-${safeName}`;

            logger.info('Attempting to upload file:', {
                filename: uniqueFilename,
                originalSize: file.size,
                optimizedSize: optimizedBuffer.length,
                bucket: process.env.SUPABASE_BUCKET
            });

            // Upload file to Supabase Storage
            const { data, error } = await this.supabase.storage
                .from(process.env.SUPABASE_BUCKET || 'profile_image')
                .upload(`public/${uniqueFilename}`, optimizedBuffer, {
                    contentType: 'image/jpeg',
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) {
                logger.error('Supabase upload error:', error);
                throw error;
            }

            // Get public URL
            const { data: { publicUrl } } = this.supabase.storage
                .from(process.env.SUPABASE_BUCKET || 'profile_image')
                .getPublicUrl(`public/${uniqueFilename}`);

            logger.info(`File uploaded successfully: ${publicUrl}`);
            return publicUrl;

        } catch (error: any) {
            logger.error('Error uploading file:', {
                error: error.message,
                details: error.details || error.error_description,
                statusCode: error.statusCode
            });
            throw new Error(error.message || 'Failed to upload file');
        }
    }

    static async deleteFile(fileUrl: string): Promise<void> {
        try {
            const fileName = fileUrl.split('/').pop();
            if (!fileName) {
                throw new Error('Invalid file URL');
            }

            logger.info('Attempting to delete file:', { fileName });

            const { error } = await this.supabase.storage
                .from(process.env.SUPABASE_BUCKET || 'profile_image')
                .remove([fileName]);

            if (error) {
                logger.error('Supabase delete error:', error);
                throw error;
            }

            logger.info(`File deleted successfully: ${fileName}`);
        } catch (error: any) {
            logger.error('Error deleting file:', {
                error: error.message,
                details: error.details
            });
            throw new Error('Failed to delete file');
        }
    }

    static async listFiles(page: number = 1, limit: number = 20): Promise<any[]> {
        try {
            const { data, error } = await this.supabase.storage
                .from(process.env.SUPABASE_BUCKET || 'profile_image')
                .list('', {
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
                    .from(process.env.SUPABASE_BUCKET || 'profile_image')
                    .getPublicUrl(file.name).data.publicUrl
            }));

        } catch (error: any) {
            logger.error('Error listing files:', {
                error: error.message,
                details: error.details
            });
            throw new Error('Failed to list files');
        }
    }
}

export default CloudStorageService; 