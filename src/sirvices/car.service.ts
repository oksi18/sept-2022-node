import { Types } from "mongoose";

import { ApiError } from "../errors";
import { Car } from "../models/car.model";
import { ICar } from "../types/car.types";

class CarService {
  public async getById(userId: string, carId: string): Promise<ICar> {
    try {
      const result = Car.aggregate([
        {
          $match: {
            _id: carId,
          },
        },
        {
          $lookup: {
            from: "user",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: {
            path: "/user",
          },
        },
      ]);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return result[0];
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(data: ICar, userId: string): Promise<any> {
    try {
      return Car.create({ ...data, user: new Types.ObjectId(userId) });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const carService = new CarService();
