import { Document } from 'mongoose';

export interface IRestRoomType {
  name: string;
  address: string;
  type: string;
  phoneNumber?: string;
  location: {
    coordinates: [lng: number, lat: number];
  };
  remarks?: string;
  isEnabled?: boolean;
  createdAt?: Date | string;
}

export default interface IChargeStation extends Document, IRestRoomType {}
