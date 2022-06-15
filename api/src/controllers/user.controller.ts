import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import crypto from 'crypto';
import _ from 'lodash';
import { AppError } from '../utils/errors';
import { IRequest } from '../interfaces/IRequest';
import factoryService from '../services/factory.service';
import Staff from '../models/staff.model';
import { encrypt } from '../utils/cryptify';

const updateUser = async (req: IRequest, res: Response): Promise<void> => {
  const userData = _.pick(req.body, ['name', 'email', 'phoneNumber']);
  const user = await factoryService.updateOneByDocument(req.user, userData);

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      user,
    },
  });
};

const updateUserPassword = async (req: IRequest, res: Response): Promise<void> => {
  const { currentPassword, newPassword } = req.body;
  const { user } = req;

  if (!currentPassword || !newPassword)
    throw new AppError('Provide both current password and new password', StatusCodes.BAD_REQUEST);
  if (!(await user.validatePassword(currentPassword, user.password)))
    throw new AppError('Incorrect password', StatusCodes.BAD_REQUEST);

  // eslint-disable-next-line no-param-reassign
  user.password = newPassword;
  await user.save();
  const token = user.generateAuthToken();

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      token,
    },
  });
};

const getUserApiKey = async (req: IRequest, res: Response): Promise<void> => {
  const { apiKey } = await factoryService.getById(Staff, req.user.id, 'User').select('apiKey').exec();

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      apiKey,
    },
  });
};

const updateUserApiKey = async (req: IRequest, res: Response): Promise<void> => {
  const user = await factoryService.getById(Staff, req.user.id, 'User').select('+apiKey').exec();

  const apiKey = crypto.randomBytes(24).toString('hex');

  user.apiKey = encrypt(apiKey);

  await user.save();

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      apiKey,
    },
  });
};

const getBasicProfileInfo = async (req: IRequest, res: Response): Promise<void> => {
  const { user } = req;
  user.password = undefined;

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      user,
    },
  });
};

const updateUserProfile = async (req: IRequest, res: Response): Promise<void> => {
  const userData = _.pick(req.body, ['name', 'phoneNumber', 'email']);

  const user = await factoryService.updateOneByDocument(req.user, userData);

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      user,
    },
  });
};

export default {
  updateUser,
  updateUserPassword,
  getUserApiKey,
  updateUserApiKey,
  getBasicProfileInfo,
  updateUserProfile,
};
