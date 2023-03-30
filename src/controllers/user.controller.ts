import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { userMapper } from "../mappers/user.mapper";
import { User } from "../models";
import { userService } from "../sirvices";
import { ICommonResponse, IQuery } from "../types";
import { IUser } from "../types/user.types";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const response = await userService.getWithPagination(
        req.query as unknown as IQuery
      );

      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { user } = res.locals;

      const response = userMapper.toResponse(user);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<IUser>>> {
    try {
      const body = req.body;
      const user = await User.create(body);

      return res.status(201).json({
        message: "User created!",
        data: user,
      });
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;

      const updatedUser = await User.update(
        userId,
        { ...req.body },
        { new: true }
      );
      const response = userMapper.toResponse(updatedUser);
      return res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { userId } = req.params;

      await User.deleteOne({ _id: userId });

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async uploadAvatar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { user: userEntity } = req.res.locals;
      //const { userId } = req.params; //not important because user has an ID
      const avatar = req.files.avatar as UploadedFile;

      const user = await userService.uploadAvatar(avatar, userEntity); // after service uploaded an Avatar and returned stringAvatar

      const response = userMapper.toResponse(user);

      return res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }

  public async deleteAvatar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const userEntity = res.locals.user as IUser;

      const user = await userService.deleteAvatar(userEntity); // after service uploaded an Avatar and returned stringAvatar

      const response = userMapper.toResponse(user);

      return res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
}
export const userController = new UserController();
