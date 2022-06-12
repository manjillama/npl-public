import mongoose, { HookNextFunction } from 'mongoose';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import IStaff from '../interfaces/IStaff';
import { encrypt, decrypt } from '../utils/cryptify';
import { ROLES } from '../constants';
import { keys } from '../config';

const staffSchema = new mongoose.Schema<IStaff>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      // eslint-disable-next-line no-useless-escape
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
    },
    countryCode: {
      type: String,
      required: [true, 'Please provide a country code'],
      default: '+977',
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide a phone number'],
      unique: [true, 'Staff with the phone number already exists'],
      minlength: [10, 'Please enter 10 digit number'],
      maxlength: [10, 'Please enter 10 digit number'],
    },
    roles: [
      {
        type: String,
        required: [true, 'Please assign a role'],
        enum: ROLES,
      },
    ],
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    passwordChangedAt: Date,
    enabled: {
      type: Boolean,
      default: true,
    },
    apiKey: {
      type: String,
      required: [true, 'Please add staff api key'],
      select: false,
    },
    dob: Date,
    photo: String,
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

staffSchema.pre<IStaff>('save', async function (next: HookNextFunction) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

staffSchema.pre<IStaff>('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  // Setting in database can be bit slower than issuing a jwt
  // Hence passwordChangedAt timestamp is set sometime a bit after then jwt is issued
  // Which will prevent access to the user thinking a password has been updated
  // Hence - 5000
  this.passwordChangedAt = Date.now() - 5000;
  next();
});

staffSchema.methods.validatePassword = async function (candidatePassword: string, hashedPassword: string) {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

// Check if user changed password after the token was issued
staffSchema.methods.changedPasswordAfter = function (jwtIssuedTime: number) {
  if (this.passwordChangedAt) {
    // converting millisecond into seconds
    const changedTimestamp = (this.passwordChangedAt as Date).getTime() / 1000;

    return jwtIssuedTime < changedTimestamp;
  }
  // false means not changed
  return false;
};

staffSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, keys.JWT_SECRET, {
    expiresIn: keys.JWT_EXPIRES_IN,
  });
};

staffSchema.pre<IStaff>('validate', function (next: HookNextFunction) {
  if (!this.isNew) return next();
  const apiKey = crypto.randomBytes(24).toString('hex');
  this.apiKey = encrypt(apiKey);
  next();
});

staffSchema.post<IStaff>(/^find/, function (doc: IStaff[] | IStaff) {
  if (doc && !Array.isArray(doc) && doc.apiKey) doc.apiKey = decrypt(doc.apiKey);
});

const Staff = mongoose.model<IStaff>('Staff', staffSchema);

export const staffJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  password: Joi.number().required(),
  roles: Joi.array().valid(...Object.values(ROLES)),
}).unknown(true);

export default Staff;
