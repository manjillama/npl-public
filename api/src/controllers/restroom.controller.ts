import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';
import Restroom from '../models/restroom.model';
import { IRequest } from '../interfaces/IRequest';
import factoryService from '../services/factory.service';

const getAllRestrooms = async (req: IRequest, res: Response): Promise<void> => {
  const [restrooms, total, size] = await factoryService
    .getAll(Restroom, {
      ...req.query,
    })
    .exec();

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      total,
      size,
      restrooms,
    },
  });
};

const getOneRestroom = async (req: IRequest, res: Response): Promise<void> => {
  const restroom = await factoryService.getById(Restroom, req.params.restroomId, 'Restroom').exec();

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      restroom,
    },
  });
};

const addRestroom = async (req: IRequest, res: Response): Promise<void> => {
  const restroom = await factoryService.createOne(Restroom, req.body);

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    data: {
      restroom,
    },
  });
};

const updateRestroom = async (req: IRequest, res: Response): Promise<void> => {
  const restroom = await factoryService.updateOne(Restroom, req.params.restroomId, req.body, 'Restroom');

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      restroom,
    },
  });
};

const getRestroomsCount = async (req: IRequest, res: Response): Promise<void> => {
  const count = await factoryService.count(Restroom);

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      count,
    },
  });
};

const getRestroomWithin = async (req: IRequest, res: Response): Promise<void> => {
  const restrooms = await factoryService.getServicesWithin(Restroom, req.params as any);

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      results: restrooms.length,
      restrooms,
    },
  });
};

export default {
  getAllRestrooms,
  addRestroom,
  updateRestroom,
  getOneRestroom,
  getRestroomsCount,
  getRestroomWithin,
};
