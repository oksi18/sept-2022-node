import { ApiError } from "../errors";
import { User } from "../models";
import { IPaginationResponse, IQuery } from "../types";
import { IUser } from "../types/user.types";

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
    query: IQuery
  ): Promise<IPaginationResponse<any>> {
    try {
      // const data = await User.findById("641b7f0004ec33c2ba7d594d");
      //console.log(data);

      const data = await User.findById("641b7f0004ec33c2ba7d594d");
      console.log(data.nameWithSurname);

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
        .sort(sortedBy)
        .lean();
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
