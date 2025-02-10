import axios from 'axios';
import logger from '../utils/logger';

class RakutenService {
    private static baseUrl = 'https://www.rakuten-drive.com/cloud/mydrive/Images/';

    static async uploadImage(file: Express.Multer.File): Promise<string> {
        try {
            const formData = new FormData();
            formData.append('file', new Blob([file.buffer]), file.originalname);

            const response = await axios.post(this.baseUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            logger.info(`File uploaded successfully to Rakuten Drive: ${response.data.url}`);
            return response.data.url;

        } catch (error) {
            logger.error('Error uploading to Rakuten Drive:', error);
            throw new Error('Failed to upload image to Rakuten Drive');
        }
    }

    static async deleteImage(imageUrl: string): Promise<void> {
        try {
            const fileName = imageUrl.split('/').pop();
            await axios.delete(`${this.baseUrl}${fileName}`);
            logger.info(`File deleted successfully from Rakuten Drive: ${fileName}`);
        } catch (error) {
            logger.error('Error deleting from Rakuten Drive:', error);
            throw new Error('Failed to delete image from Rakuten Drive');
        }
    }

    static async listImages(page: number = 1, limit: number = 20): Promise<any[]> {
        try {
            const response = await axios.get(`${this.baseUrl}?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            logger.error('Error listing images from Rakuten Drive:', error);
            throw new Error('Failed to fetch images from Rakuten Drive');
        }
    }
}

export default RakutenService; 