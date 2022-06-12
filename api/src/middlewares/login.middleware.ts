import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IRequest } from '../interfaces/IRequest';
import { AppError } from '../utils/errors';

export const validateFields = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) throw new AppError('Please provide email and password!', StatusCodes.BAD_REQUEST);
  next();
};
