export interface IRestroom {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  address: string;
  phoneNumber: string;
  location: {
    coordinates: [lng: number, lat: number];
  };
  isEnabled: boolean;
  remarks: string;
}
export interface IRestroomType extends Partial<IRestroom> {
  location: {
    coordinates: [lng: number, lat: number];
  };
}
