import { Router } from 'express';
import publicRoute from './public.route';
import userRoute from './user.route';
import restroomRoute from './restroom.route';
import staffRoute from './staff.route';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

router.use('/public', publicRoute);

router.use(authenticate);
router.use('/restrooms', restroomRoute);
router.use('/users', userRoute);
router.use('/staffs', staffRoute);

export default router;
