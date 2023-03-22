import { IUser } from "./user.types";

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenPayload extends Pick<IUser, "_id" | "name"> {
  _id: string;
  name: string;
}
export type IActionTokenPayload = Pick<IUser, "_id">;
