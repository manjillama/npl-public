import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import { AppError } from '../utils/errors';
import { IRequest } from '../interfaces/IRequest';
import factoryService from '../services/factory.service';

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

export default { updateUser, updateUserPassword };
