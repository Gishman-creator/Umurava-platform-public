// import { Client, Storage, ID, Query } from 'node-appwrite';
// import { Request } from 'express';
// import logger from '../utils/logger';
// import { storage } from '../config/appwrite';

// class AppwriteService {
//     private client: Client;
//     private storage: Storage;
//     private imagesBucketId: string;
//     private videosBucketId: string;

//     constructor() {
//         this.client = new Client()
//             .setEndpoint(process.env.APPWRITE_ENDPOINT || '')
//             .setProject(process.env.APPWRITE_PROJECT_ID || '')
//             .setKey(process.env.APPWRITE_API_KEY || '');

//         this.storage = new Storage(this.client);
//         this.imagesBucketId = process.env.APPWRITE_IMAGES_BUCKET_ID || '';
//         this.videosBucketId = process.env.APPWRITE_VIDEOS_BUCKET_ID || '';
//     }

//     static async uploadFile(file: Express.Multer.File, type: 'image' | 'video'): Promise<string> {
//         try {
//             if (!file.buffer) {
//                 throw new Error('No file buffer provided');
//             }

//             const bucketId = type === 'image' 
//                 ? process.env.APPWRITE_IMAGES_BUCKET_ID 
//                 : process.env.APPWRITE_VIDEOS_BUCKET_ID;

//             if (!bucketId) {
//                 throw new Error(`${type.toUpperCase()}_BUCKET_ID not configured`);
//             }

//             // Validate file type
//             if (type === 'image' && !file.mimetype.startsWith('image/')) {
//                 throw new Error('Invalid file type. Only images are allowed.');
//             }

//             const response = await storage.createFile(
//                 bucketId,
//                 ID.unique(),
//                 new File([file.buffer], file.originalname, { type: file.mimetype }),
//                 ['role:all'] // This is the correct permission format for Appwrite
//             );

//             logger.info(`File uploaded successfully: ${response.$id}`);
//             return response.$id;

//         } catch (error) {
//             logger.error('Error uploading file to Appwrite:', error);
//             throw new Error(error instanceof Error ? error.message : 'Failed to upload file');
//         }
//     }

//     static async deleteFile(fileId: string, type: 'image' | 'video') {
//         try {
//             const bucketId = type === 'image' ? process.env.APPWRITE_IMAGES_BUCKET_ID : process.env.APPWRITE_VIDEOS_BUCKET_ID;
//             if (bucketId && fileId) {
//                 await storage.deleteFile(bucketId, fileId);
//             } else {
//                 throw new Error('Bucket ID or File ID is undefined');
//             }
//         } catch (error) {
//             console.error('Error deleting file from Appwrite:', error);
//             throw error;
//         }
//     }

//     static getFileView(fileId: string, type: 'image' | 'video') {
//         const bucketId = type === 'image' ? process.env.APPWRITE_IMAGES_BUCKET_ID : process.env.APPWRITE_VIDEOS_BUCKET_ID;
//         return `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/view`;
//     }

//     static async listVideos(search?: string) {
//         try {
//             const bucketId = process.env.APPWRITE_VIDEOS_BUCKET_ID;
//             if (!bucketId) {
//                 throw new Error('VIDEOS_BUCKET_ID not configured');
//             }

//             const response = await storage.listFiles(bucketId, [
//                 search ? Query.search('name', search) : Query.limit(100)
//             ]);

//             return response.files.map(file => ({
//                 id: file.$id,
//                 name: file.name,
//                 size: file.sizeOriginal,
//                 mimeType: file.mimeType,
//                 url: this.getFileView(file.$id, 'video'),
//                 createdAt: file.$createdAt
//             }));

//         } catch (error) {
//             logger.error('Error listing videos from Appwrite:', error);
//             throw new Error('Failed to fetch videos');
//         }
//     }
// }

// export default AppwriteService; 