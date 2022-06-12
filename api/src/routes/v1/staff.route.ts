import { Router } from 'express';
import staffController from '../../controllers/staff.controller';
import { restrictTo } from '../../middlewares/auth.middleware';
import { ROLES } from '../../constants';
import { schemaValidator } from '../../middlewares';
import { staffJoiSchema } from '../../models/staff.model';
import { validateStaffId } from '../../middlewares/staff.middleware';

const router = Router();

router.use(restrictTo(ROLES.admin));

router.route('/').get(staffController.getAllStaffs).post(schemaValidator(staffJoiSchema), staffController.addStaff);
router.route('/:staffId').get(staffController.getOneStaff).patch(validateStaffId, staffController.updateStaff);

export default router;
