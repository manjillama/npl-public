import { Router } from 'express';
import authController from '../../controllers/auth.controller';
import userController from '../../controllers/user.controller';

const router = Router();

router.route('/').get(authController.getLoggedInUser).patch(userController.updateUser);
router.route('/api-key').get(userController.getUserApiKey).put(userController.updateUserApiKey);
router.put('/change-password', userController.updateUserPassword);

export default router;
