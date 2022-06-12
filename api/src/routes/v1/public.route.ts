import { Router } from 'express';
import authController from '../../controllers/auth.controller';
import { validateFields } from '../../middlewares/login.middleware';

const router = Router();

router.post('/login', validateFields, authController.login);

export default router;
