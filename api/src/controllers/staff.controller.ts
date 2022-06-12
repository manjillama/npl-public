import { Response } from 'express';
import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import factoryService from '../services/factory.service';
import Staff from '../models/staff.model';
import { IRequest } from '../interfaces/IRequest';

const getAllStaffs = async (req: IRequest, res: Response): Promise<void> => {
  const [staffs, total, size] = await factoryService.getAll(Staff, req.query).exec();

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      total,
      size,
      staffs,
    },
  });
};

const getOneStaff = async (req: IRequest, res: Response): Promise<void> => {
  const staff = await factoryService.getById(Staff, req.params.staffId, 'Staff').exec();

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      staff,
    },
  });
};

const addStaff = async (req: IRequest, res: Response): Promise<void> => {
  const staff = await factoryService.createOne(Staff, req.body);

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    data: {
      staff,
    },
  });
};

const updateStaff = async (req: IRequest, res: Response): Promise<void> => {
  const staffData = _.omit(req.body, ['password']);

  const staff = await factoryService.updateOneByDocument(req.staff, staffData);

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      staff,
    },
  });
};

export default { getAllStaffs, addStaff, updateStaff, getOneStaff };
