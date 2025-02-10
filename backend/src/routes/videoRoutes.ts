import { Router } from 'express';
import VideoController from '../controllers/VideoController';
import { protect, authorize } from '../middleware/auth';
import { uploadVideo } from '../middleware/upload';

const router = Router();
const videoController = new VideoController();

// Public routes
router.get('/', videoController.getAllVideos);
router.get('/search', videoController.searchVideos);

// Admin only routes
router.use(protect);
router.use(authorize('admin'));
router.post('/', uploadVideo.single('video'), videoController.upload);
router.delete('/:id', videoController.delete);

export default router;
