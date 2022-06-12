import { Router } from 'express';
import authController from '../../controllers/auth.controller';
import userController from '../../controllers/user.controller';

const router = Router();

router.get('/current-user', authController.getLoggedInUser);
router.patch('/current-user', userController.updateUser);
router.put('/current-user/change-password', userController.updateUserPassword);

export default router;
