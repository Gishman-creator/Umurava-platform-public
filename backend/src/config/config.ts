/**
 * @module Config
 * @description Application configuration
 */

/**
 * @interface Config
 * @description Configuration options interface
 */
interface Config {
  env: string;
  port: number;
  mongoUrl: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  logLevel: string;
  allowedOrigins: string[];
  frontendUrl: string;
  fileUpload: {
    maxSize: number;
    allowedTypes: string[];
  };
  storage: StorageConfig;
  supabase: {
    url: string;
    key: string;
    bucket: string;
  };
}

/**
 * @interface StorageConfig
 * @description Storage configuration options interface
 */
export interface StorageConfig {
  baseUrl: string;
  apiKey: string;
}

/**
 * @const config
 * @description Application configuration object
 */
const config: Config = {
  env: process.env.NODE_ENV || 'development',

  port: Number(process.env.PORT) || 3000,

  mongoUrl: process.env.MONGODB_URL || 'mongodb+srv://andrewbyukusenge4:andre01.@cluster0.breue.mongodb.net/umurava_platform?retryWrites=true&w=majority',
  jwtSecret: process.env.JWT_SECRET || '13017c2178c02b2646bcb1ad94cfcccf8d578e54ad3e846d4a81699021d33ce3b1d983ad9203ff67bfeec802b88022cce79be2881a7acec560c01deee9f11723',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  logLevel: process.env.LOG_LEVEL || 'info',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://127.0.0.1:5500').split(','),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  fileUpload: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif']
  },
  storage: {
    baseUrl: process.env.CLOUD_STORAGE_URL || 'https://www.rakuten-drive.com/cloud/mydrive/Images/',
    apiKey: process.env.CLOUD_STORAGE_API_KEY || ''
  },
  supabase: {
    url: process.env.SUPABASE_URL || '',
    key: process.env.SUPABASE_ANON_KEY || '',
    bucket: process.env.SUPABASE_BUCKET || 'profile-images'
  }
};

export default config;
