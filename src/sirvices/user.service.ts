import { UploadedFile } from "express-fileupload";

import { ApiError } from "../errors";
import { userMapper } from "../mappers/user.mapper";
import { User } from "../models";
import { IPaginationResponse, IQuery } from "../types";
import { IUser } from "../types/user.types";
import { s3Service } from "./s3.service";

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

  public async update(userId: string, data: Partial<IUser>): Promise<void> {
    try {
      return await User.findByIdAndUpdate(userId, data, { new: true });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async delete(userId: string): Promise<void> {
    try {
      await User.deleteOne({ _id: userId });
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
        data: userMapper.toManyResponse(users),
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async uploadAvatar(file: UploadedFile, user: IUser): Promise<IUser> {
    try {
      const filePath = await s3Service.uploadPhoto(file, "user", user._id);
      if (user.avatar) {
        await s3Service.deletePhoto(user.avatar);
      }
      return await User.findByIdAndUpdate(
        user._id,
        { avatar: filePath },
        { new: true }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async deleteAvatar(user: IUser): Promise<IUser> {
    try {
      if (!user.avatar) {
        throw new ApiError("the user does not have", 422);
      }

      await s3Service.deletePhoto(user.avatar);
      return await User.findByIdAndUpdate(
        user._id,
        { $unset: { avatar: user.avatar } },
        { new: true }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}
export const userService = new UserService();
