export interface IError extends Error {
  status: number;
}

export interface IMessage {
  message: string;
}

export interface ICommonResponse<T> extends IMessage {
  data: T;
}

interface IIndex {
  [key: string]: any;
}

export interface IPaginationResponse<T> {
  page: string;
  perPage: string;
  itemsCount: number;
  itemsFound: number;
  data: T;
}

export interface IQuery {
  page: number;
  limit: number;
  sortedBy: string;
  [key: string]: string | number;
}

export type IRequest = IIndex;
