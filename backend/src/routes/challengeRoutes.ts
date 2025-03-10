import { Router } from 'express';
import ChallengeController from '../controllers/ChallengeController';
import { protect, authorize } from '../middleware/auth';
import { uploadImage } from '../middleware/upload';

const router = Router();
const challengeController = new ChallengeController();

// Public routes
router.get('/id/:id/:creator_id?', challengeController.getById);
router.get('/stats', challengeController.getChallengeStats);
router.get('/search', challengeController.searchChallenges);
router.get('/', challengeController.getAll);
router.get('/:limit', challengeController.getAll);

// Protected routes
router.use(protect);
router.post('/', uploadImage.single('challengeImage'), challengeController.create);
router.post('/:id/participate', challengeController.addParticipant);
router.get('/user/:userId', challengeController.getUserChallenges);

// Admin only routes
router.use(authorize('admin'));
router.get('/creator_id/:creator_id/:limit', challengeController.getByCreatorId);
router.patch('/edit/:id', uploadImage.single('challengeImage'), challengeController.update);
router.delete('/delete/:id', challengeController.delete);
router.patch('/:id/status', challengeController.updateChallengeStatus);

export default router;
