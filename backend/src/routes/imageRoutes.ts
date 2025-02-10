import { Router } from 'express';
import ImageController from '../controllers/ImageController';
import { protect } from '../middleware/auth';
import { uploadImage } from '../middleware/upload';

const router = Router();
const imageController = new ImageController();

// Protected routes
router.use(protect);
router.post('/', (req, res, next) => {
  uploadImage.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).send('Error uploading file');
    }
    next();
  });
}, imageController.upload);
router.get('/user/:userId', imageController.getUserImages);
router.delete('/:id', imageController.delete);

export default router;
