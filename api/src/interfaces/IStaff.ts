/* eslint-disable no-unused-vars */
import { Document } from 'mongoose';

export interface IStaffType {
  name: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  roles: string[];
  password?: string;
  createdAt: Date;
  passwordChangedAt?: Date | number;
  enabled: boolean;
  dob?: Date;
  photo?: string;
  apiKey: string;
  validatePassword(candidatePassword: string, hashedPassword: string): Promise<boolean>;
  changedPasswordAfter(jwtIssuedTime: number): boolean;
  generateAuthToken(): string;
}

export default interface IStaff extends Document, IStaffType {}
