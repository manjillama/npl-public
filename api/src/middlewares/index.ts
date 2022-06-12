import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { validateJoiSchema } from '../utils/validator';

export function schemaValidator(joiSchema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    validateJoiSchema(joiSchema, req.body);
    next();
  };
}
/**
 * @docs geojson type is replaced when updating using factory update function
 * Adding location type 'Point' manually
 */
export const addGeoLocationType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (req.body.location) req.body.location.type = 'Point';
  next();
};
