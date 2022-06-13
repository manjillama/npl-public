import { StatusCodes } from 'http-status-codes';
import IStaff from '../interfaces/IStaff';
import Staff from '../models/staff.model';
import { AppError } from '../utils/errors';

export function loginResponse(token: string, user: IStaff) {
  // Remove password from output
  user.password = undefined;

  return { token, user };
}

/**
 * @param  {string} email email
 * @param  {string} password password
 * @returns {Promise} Promise object represents token and current user
 */
export async function loginService(email: string, password: string): Promise<{ token: string; user: IStaff }> {
  const user = await Staff.findOne({ email, enabled: true }).select('+password');

  if (!user || !(await user.validatePassword(password, user.password)))
    throw new AppError('Incorrect email or password', StatusCodes.UNAUTHORIZED);

  const token = user.generateAuthToken();

  // Remove password from output
  // eslint-disable-next-line no-param-reassign
  user.password = undefined;

  // 3) If everything ok, send token to client
  return loginResponse(token, user);
}
