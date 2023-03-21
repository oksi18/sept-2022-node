import { NextFunction, Request, Response } from "express";

import { ETokenType } from "../enums";
import { ApiError } from "../errors";
import { Token } from "../models";
import { tokenService } from "../sirvices";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");

      const jwtPayload = tokenService.checkToken(
        accessToken,
        ETokenType.access
      );
      const tokenInfo = await Token.findOne({ accessToken });

      if (!accessToken) {
        throw new ApiError(" No Token", 401);
      }
      if (!tokenInfo) {
        throw new ApiError("Token not valid", 401);
      }

      res.locals.tokenInfo = { tokenInfo, jwtPayload };
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

      res.locals.tokenInfo = { tokenInfo, jwtPayload };
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
