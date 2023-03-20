import { ApiError } from "../errors/api.errors";
import { User } from "../models/User.model";
import { IUser } from "../types/user.types";
import { passwordService } from "./password.service";

class AuthService {
  public async register(body: IUser) {
    try {
      const { password } = body;
      const hashedPassword = await passwordService.hash(password);
      await User.create({
        ...body,
        password: hashedPassword,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}
export const authService = new AuthService();
