import { StatusCodes } from 'http-status-codes';
import { ObjectSchema } from 'joi';
import AppError from './errors/appError';
/**
 * @param  {ObjectSchema} schema joi schema
 * @param  {any} data data object to validate
 * @returns void
 */
export function validateJoiSchema(schema: ObjectSchema, data: any): void {
  const { error } = schema.validate(data, {
    errors: {
      wrap: {
        label: '',
      },
    },
  });
  if (error) throw new AppError(error.details.map((d) => d.message).join(' ,'), StatusCodes.BAD_REQUEST);
}
