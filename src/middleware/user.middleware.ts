import { NextFunction, Request, Response } from "express";

import { ApiErrors } from "../errors/api.errors";
import { User } from "../models/user.model";

class UserMiddleware {
  public async getByIdAndThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId);

      if (!user) {
        throw new ApiErrors("User not found", 404);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const userMiddleware = new UserMiddleware();
