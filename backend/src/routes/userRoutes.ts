import { Router } from 'express';
import { RequestHandler } from 'express';
import UserController from '../controllers/UserController';
import { protect, authorize} from '../middleware/auth';
import { upload } from '../utils/gridfs';
import { File } from '../types';
import { uploadImage } from '../middleware/upload';

const router = Router();
const userController = new UserController();

// Public routes
router.post('/register', uploadImage.single('profileImage'), userController.register);
router.get('/verify-email/:token', userController.verifyEmail);
router.post('/login', userController.login);

router.post(
    '/profile/picture',
    upload.single('profile') as RequestHandler,
    userController.uploadProfilePicture as RequestHandler
);

// Add this with other public routes
router.get('/search/specialty', userController.searchBySpecialty);

// Protected routes
router.use(protect); // All routes below this will be protected

// User routes
router.get('/profile', userController.getById);
router.patch('/profile', userController.updateUser);
router.get('/stats', userController.getUserStats);

// Admin only routes
router.use(authorize('admin'));
router.get('/', userController.getAll);
router.delete('/:id', userController.delete);
router.get('/search', userController.searchUsers);

export default router;
