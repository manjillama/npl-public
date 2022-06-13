import { Router } from 'express';
import { addPatronServiceFilter } from '../../middlewares/patron.middleware';
import restroomController from '../../controllers/restroom.controller';
import { authenticateUsingApiKey } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticateUsingApiKey);

router.get('/restrooms', addPatronServiceFilter, restroomController.getAllRestrooms);
router.get(
  '/restrooms/within/:distance/center/:latlng/:unit',
  addPatronServiceFilter,
  restroomController.getRestroomWithin,
);
router.get('/restrooms/:restroomId', restroomController.getOneRestroom);
router.get('/restrooms/count', restroomController.getRestroomsCount);

export default router;
