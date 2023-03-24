import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../types/user.types";

export interface IPaginationResponse<T> {
  page: string;
  perPage: string;
  itemsCount: number;
  itemsFound: number;
  data: T;
}

class UserService {
  public async getAll(): Promise<IUser[]> {
    try {
      return User.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(id: string): Promise<IUser> {
    try {
      return User.findById(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async getWithPagination(
    query: any
  ): Promise<IPaginationResponse<any>> {
    try {
      const data = await User.findByName("Anton");
      console.log(data);

      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`)
      );
      const {
        page = 1,
        limit = 5,
        sortedBy = "createdAt",
        ...searchObject
      } = queryObj;
      const skip = limit * (page - 1);
      const users = await User.find(searchObject)
        .limit(limit)
        .skip(skip)
        .sort(sortedBy);
      const usersTotalCount = await User.count();
      return {
        page: page,
        itemsCount: usersTotalCount,
        perPage: limit,
        itemsFound: users.length,
        data: users,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userService = new UserService();
