import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../utils/errors';
import { IRequest } from '../interfaces/IRequest';
import Staff from '../models/staff.model';

export const validateStaffId = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
  const staff = await Staff.findById(req.params.staffId);
  if (!staff) throw new AppError('Staff with that id does not exist', StatusCodes.BAD_REQUEST);

  req.staff = staff;
  next();
};
