import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errors';
import Staff from '../models/staff.model';
import { IRequest } from '../interfaces/IRequest';
import { keys } from '../config';
import { encrypt } from '../utils/cryptify';

export const authenticateUsingApiKey = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
): Promise<void | NextFunction> => {
  // 1) Getting api key and check of it's there
  const key = req.headers.key as string;

  if (!key) throw new AppError('Missing api key', StatusCodes.UNAUTHORIZED);

  // 2) Encrypt api key
  const apiKey = encrypt(key);

  // 3) Fetching user using key and check if it's there
  const user = await Staff.findOne({
    apiKey,
    enabled: true,
  });

  if (!user) throw new AppError('Invalid api key', StatusCodes.UNAUTHORIZED);

  req.user = user;
  next();
};

export const authenticate = async (req: IRequest, res: Response, next: NextFunction): Promise<void | NextFunction> => {
  // 1) Getting token and check of it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    token = req.headers.authorization.split(' ')[1];

  if (!token) throw new AppError('You are not logged in! Please log in to get access.', StatusCodes.UNAUTHORIZED);

  // 2) Verification token
  const decoded: any = await promisify<string, string>(jwt.verify)(token, keys.JWT_SECRET).catch(() => {
    throw new AppError('Invalid token', 401);
  });

  // 3) Check if user exists
  const currentUser = await Staff.findOne({ _id: decoded.id, enabled: true }).select('+password');
  if (!currentUser)
    throw new AppError('The user belonging to this token does no longer exist.', StatusCodes.UNAUTHORIZED);

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat))
    throw new AppError('User recently changed password! Please log in again.', StatusCodes.UNAUTHORIZED);

  req.user = currentUser;
  next();
};
/**
 * @param  {string} roles authorized roles
 */
export const restrictTo = (...roles: string[]) => {
  return (req: IRequest, res: Response, next: NextFunction): void => {
    // Check if current user has access role
    const hasRole = roles.some((role) => {
      return req.user.roles.includes(role);
    });

    if (!hasRole) throw new AppError('You do not have permission to perform this action', StatusCodes.FORBIDDEN);

    next();
  };
};
