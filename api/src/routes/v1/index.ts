import { Router } from 'express';
import publicRoute from './public.route';
import userRoute from './user.route';
import restroomRoute from './restroom.route';
import staffRoute from './staff.route';
import patronRoute from './patron.route';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

router.use('/public', publicRoute);

router.use('/patron', patronRoute);

router.use(authenticate);
router.use('/restrooms', restroomRoute);
router.use('/user', userRoute);
router.use('/staffs', staffRoute);

export default router;
