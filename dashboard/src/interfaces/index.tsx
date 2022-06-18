import { IUser } from "./IUser";

export interface Auth {
  token: string;
  user: IUser;
}

export * from "./IUser";
export * from "./IRestroom";
export * from "./Mappable";
export * from "./IStaff";
