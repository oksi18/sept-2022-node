export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
}

export interface ICommonResponse<T> {
  message: string;
  data: T;
}
