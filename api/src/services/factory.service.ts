/* eslint-disable no-unused-vars, @typescript-eslint/ban-types */
import { Model, Document, Query, Aggregate, EnforceDocument } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import { AppError } from '../utils/errors';
import APIFeatures from '../utils/apiFeatures';
import { GetByDistanceAttrs, ObjectType } from '../types';

function createOne<T extends Document>(model: Model<T>, data: any): Promise<T> {
  return model.create(data);
}
/**
 * @param  {Model<T>} model mongoose model
 * @param  {string} id id of the document that is to be updated
 * @param  {any} data new document data
 * @param  {string} modelName model name
 */
async function updateOne<T extends Document>(model: Model<T>, id: string, data: any, modelName: string): Promise<T> {
  let doc = await model.findById(id);

  if (!doc) throw new AppError(`${modelName} with that id does not exist`, StatusCodes.BAD_REQUEST);

  doc = Object.assign(doc, data);
  await doc.save();

  return doc;
}

/**
 * @param  {T} document Mongoose document
 * @param  {any} data
 * @returns Promise
 */
async function updateOneByDocument<T extends Document>(document: T, data: any): Promise<T> {
  const doc = Object.assign(document, data);
  await doc.save();
  return doc;
}

/**
 * @param  {Model<T>} model mongoose model
 * @param  {any} options conditions object
 * @param  {any} data new document data
 * @param  {string} modelName model name
 * @returns Promise
 */
async function updateOneByFields<T extends Document>(
  model: Model<T>,
  options: any,
  data: any,
  modelName: string,
): Promise<T> {
  let doc = await model.findOne(options);

  if (!doc) throw new AppError(`${modelName} with that id does not exist`, StatusCodes.BAD_REQUEST);

  doc = Object.assign(doc, data);
  await doc.save();

  return doc;
}

/**
 * @param  {Model<T>} model mongoose model
 * @param  {string} id id of the document that is to be replace
 * @param  {any} data new updated document data
 * @param  {string} modelName model name
 */
async function replaceOne<T extends Document>(model: Model<T>, id: string, data: any, modelName: string): Promise<any> {
  await model.replaceOne({ _id: id as any }, data);
  const doc = await model.findById(id);

  if (!doc) throw new AppError(`${modelName} with that id does not exist`, StatusCodes.BAD_REQUEST);

  return doc;
}

type GetAll<T> = {
  populate: (...options: any) => GetAll<T>;
  exec: () => Promise<[T[], number, number]>;
};
/**
 * @param  {Model<T>} model
 * @param  {any} query i.e. { price: { gte: 500, lte: 3000 }, page: 2, size: 30, type: 'clothing', sort: '-price' }
 * @param {object | string} populate populate query field
 */
function getAll<T extends Document>(model: Model<T>, query: any): GetAll<T> {
  const { limit } = query;

  const size = limit && !Number.isNaN(Number(limit)) ? Number(limit) : 40;

  const features = new APIFeatures(model.find(), query).filter().sort().limitFields().paginate(size);

  const totalCountFilter = _.omit(query, ['page', 'sort', 'limit', 'fields']);

  return {
    populate(options: string | ObjectType | ObjectType[]) {
      features.query.populate(options);
      return this;
    },
    async exec() {
      const [data, totalCount] = await Promise.all([features.query, model.countDocuments(totalCountFilter as any)]);
      return [data, totalCount, size];
    },
  };
}

type GetById<T> = {
  populate: (path: string | ObjectType | ObjectType[]) => GetById<T>;
  select: (attributes: any) => GetById<T>;
  exec: () => Promise<EnforceDocument<T, {}>>;
};
/**
 * @param  {Model<T>} model mongoose model
 * @param  {string} id id of the document that is to be fetched
 * @param  {string} modelName model name
 */
function getById<T extends Document>(model: Model<T>, id: string, modelName: string): GetById<T> {
  const query = model.findById(id);

  return {
    populate(path: string | ObjectType | ObjectType[]) {
      query.populate(path);
      return this;
    },
    select(attributes: any) {
      query.select(attributes);
      return this;
    },
    async exec() {
      const doc = await query;
      if (!doc) throw new AppError(`${modelName} with that id not found`, StatusCodes.BAD_REQUEST);
      return doc;
    },
  };
}

type GetOne<T> = {
  populate: (path: string | ObjectType | ObjectType[]) => GetOne<T>;
  select: (attributes: any) => GetOne<T>;
  exec: () => Promise<EnforceDocument<T, {}>>;
};
/**
 * @param  {Model<T>} model mongoose model
 * @param  {any} options query object
 * @param  {string} modelName model name
 */
function getOne<T extends Document>(model: Model<T>, options: any, modelName: string): GetOne<T> {
  const query = model.findOne(options);
  return {
    populate(path: string | ObjectType | ObjectType[]) {
      query.populate(path);
      return this;
    },
    select(attributes: any) {
      query.select(attributes);
      return this;
    },
    async exec() {
      const doc = await query;
      if (!doc) throw new AppError(`${modelName} with that id not found`, StatusCodes.BAD_REQUEST);
      return doc;
    },
  };
}
/**
 * @param  {Model<T>} model
 * @param  {} options={}
 * @returns Query
 */
function count<T extends Document>(model: Model<T>, options = {}): Query<number, EnforceDocument<T, {}>, {}, T> {
  return model.countDocuments(options);
}

/**
 * @param  {Model<T>} model
 * @param  {GetByDistanceAttrs} params geo parameters
 * @returns DocumentQuery
 */
function getServicesWithin<T extends Document>(
  model: Model<T>,
  params: GetByDistanceAttrs,
): Query<EnforceDocument<T, {}>[], EnforceDocument<T, {}>, {}, T> {
  const { distance, latlng, unit } = params;
  const [lat, lng] = latlng.split(',');

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    throw new AppError('Please provide latitute and longitude in the format lat,lng.', 400);
  }

  return model.find({
    isEnabled: true,
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  } as any);
}

function deleteOne<T extends Document>(model: Model<T>, _id: string): any {
  return model.deleteOne({ _id } as any);
}

function aggregate<T extends Document>(model: Model<T>, option: any[]): Aggregate<any[]> {
  return model.aggregate(option);
}

export default {
  createOne,
  updateOne,
  updateOneByDocument,
  updateOneByFields,
  replaceOne,
  getAll,
  getById,
  getOne,
  deleteOne,
  count,
  getServicesWithin,
  aggregate,
};
