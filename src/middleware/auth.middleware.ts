import { NextFunction, Request, Response } from "express";

import { ETokenType } from "../enums";
import { EActionTokenType } from "../enums/action-token-type.enum";
import { ApiError } from "../errors";
import { Token } from "../models";
import { Action } from "../models/action.model";
import { OldPassword } from "../models/old-password.model";
import { passwordService, tokenService } from "../sirvices";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");

      const jwtPayload = tokenService.checkToken(accessToken);
      const tokenInfo = await Token.findOne({ accessToken });

      if (!accessToken) {
        throw new ApiError(" No Token", 401);
      }
      if (!tokenInfo) {
        throw new ApiError("Token not valid", 401);
      }

      req.res.locals = { tokenInfo, jwtPayload };
      next();
    } catch (e) {
      next(e);
    }
  }
  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.get("Authorization");

      const jwtPayload = tokenService.checkToken(
        refreshToken,
        ETokenType.refresh
      );
      const tokenInfo = await Token.findOne({ refreshToken });

      if (!refreshToken) {
        throw new ApiError(" No Token", 401);
      }
      if (!tokenInfo) {
        throw new ApiError("Token not valid", 401);
      }

      req.res.locals = { tokenInfo, jwtPayload };
      next();
    } catch (e) {
      next(e);
    }
  }

  public checkActionToken(type: EActionTokenType) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const actionToken = req.params.token;

        if (!actionToken) {
          throw new ApiError("No token", 401);
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const jwtPayload = tokenService.checkActionToken(actionToken, type);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const tokenInfo = await Action.findOne({ actionToken });

        if (!tokenInfo) {
          throw new ApiError("Token not valid", 401);
        }

        req.res.locals = { tokenInfo, jwtPayload };
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public async checkOldPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { body } = req;
      console.log(body);
      const { tokenInfo } = req.res.locals;
      console.log(tokenInfo);

      const oldPasswords = await OldPassword.find({
        _user_id: tokenInfo._user_id,
      });
      if (!oldPasswords) {
        next();
      }

      await Promise.all(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        oldPasswords.map(async (record) => {
          const isMatched = await passwordService.compare(
            body.password,
            record.password
          );
          if (isMatched) {
            throw new ApiError(
              "Your new password is the same as old one!",
              409
            );
          }
        })
      );
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
