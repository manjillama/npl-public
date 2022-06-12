import Joi from 'joi';
import mongoose from 'mongoose';
import { REST_ROOM_TYPE } from '../constants';
import IRestroom from '../interfaces/IRestroom';

const restroomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please specify restroom/business name'],
    },
    address: {
      type: String,
      required: [true, 'Please specify address'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Please specify restroom type'],
    },
    phoneNumber: {
      type: String,
      default: 'NA',
    },
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
    },
    isEnabled: {
      type: Boolean,
      default: true,
    },
    remarks: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

const Restroom = mongoose.model<IRestroom>('Restroom', restroomSchema);

export const restRoomJoiSchema = Joi.object({
  name: Joi.string().max(50).required(),
  address: Joi.string().max(50).required(),
  type: Joi.string()
    .valid(...REST_ROOM_TYPE)
    .required(),
  phoneNumber: Joi.number(),
  isEnabled: Joi.boolean(),
  remarks: Joi.string(),
  location: Joi.object()
    .keys({
      coordinates: Joi.array().items(Joi.number().required(), Joi.number().required()).required().messages({
        'any.required': `Location array is required [lng, lat]`,
      }),
    })
    .required(),
}).unknown(true);

export default Restroom;
