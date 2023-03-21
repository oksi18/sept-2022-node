import * as jwt from "jsonwebtoken";

import { configs } from "../configs";
import { ETokenType } from "../enums";
import { ApiError } from "../errors";
import { ITokenPair, ITokenPayload } from "../types/token.types";

class TokenService {
  public async generateTokenPair(payload: ITokenPayload): Promise<ITokenPair> {
    const accessToken = jwt.sign(payload, configs.ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, configs.REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public checkToken(token, tokenType = ETokenType.access) {
    try {
      let secret = "";

      switch (tokenType) {
        case ETokenType.access:
          secret = configs.ACCESS_SECRET;
          break;
        case ETokenType.refresh:
          secret = configs.REFRESH_SECRET;
          break;
      }
      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 404);
    }
  }
}
export const tokenService = new TokenService();
