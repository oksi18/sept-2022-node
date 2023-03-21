import { Promise } from "mongoose";

import { EEmailActions } from "../constants/email.constants";
import { ApiError } from "../errors";
import { Token, User } from "../models";
import { ICredentials } from "../types/auth.types";
import { ITokenPair } from "../types/token.types";
import { IUser } from "../types/user.types";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(body: IUser) {
    try {
      const { password } = body;
      const hashedPassword = await passwordService.hash(password);
      await User.create({
        ...body,
        password: hashedPassword,
      });
      await emailService.sendEmail(
        "oksanaklymchuk04@gmail.com",
        EEmailActions.WELCOME
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async login(
    credentials: ICredentials,
    user: IUser
  ): Promise<ITokenPair> {
    try {
      const isMatched = await passwordService.compare(
        credentials.password,
        user.password
      );
      if (!isMatched) {
        throw new ApiError("Invalid email or password", 404);
      }

      const tokenPair = tokenService.generateTokenPair({
        _id: user._id,
        name: user.name,
      });

      await Token.create({
        _user_id: user._id,
        ...tokenPair,
      });

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async refresh(
    tokeInfo: ITokenPair,
    jwtPayload: IUser
  ): Promise<ITokenPair> {
    try {
      const tokenPair = tokenService.generateTokenPair({
        _id: jwtPayload._id,
        name: jwtPayload.name,
      });

      await Promise.all([
        Token.create({ _user_id: jwtPayload._id, ...tokenPair }),
        Token.deleteOne({ refreshToken: tokeInfo.refreshToken }),
      ]);

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async changePassword(
    user: IUser,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    const isMatched = await passwordService.compare(oldPassword, user.password);
    if (!isMatched) {
      throw new ApiError("Wrong old password", 400);
    }
    const hashedNewPassword = await passwordService.hash(newPassword);
    await User.updateOne({ _id: user._id }, { password: hashedNewPassword });
  }
}
export const authService = new AuthService();
