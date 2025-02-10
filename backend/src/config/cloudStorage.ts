import { Storage } from '@google-cloud/storage';
import path from 'path';

// Initialize storage
const storage = new Storage({
    keyFilename: path.join(__dirname, '../../google-cloud-key.json'),
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID
});

const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME || 'umurava-uploads';
const bucket = storage.bucket(bucketName);

export { storage, bucket, bucketName }; 