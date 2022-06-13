import { Router } from 'express';
import restroomController from '../../controllers/restroom.controller';
import { addGeoLocationType, schemaValidator } from '../../middlewares';
import { restRoomJoiSchema } from '../../models/restroom.model';

const router = Router();

router.get('/', restroomController.getAllRestrooms);
router.get('/within/:distance/center/:latlng/:unit', restroomController.getRestroomWithin);
router.get('/:restroomId', restroomController.getOneRestroom);
router.get('/count', restroomController.getRestroomsCount);

router.post('/', schemaValidator(restRoomJoiSchema), restroomController.addRestroom);
router.patch('/:restroomId', schemaValidator(restRoomJoiSchema), addGeoLocationType, restroomController.updateRestroom);

export default router;
