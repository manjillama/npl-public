import { Request } from 'express';
import IStaff from './IStaff';

export interface IRequest extends Request {
  user?: IStaff;
  staff?: IStaff;
}
