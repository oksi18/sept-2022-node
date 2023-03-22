// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { mongoose, Schema } from "mongoose";

import { User } from "./user.model";

const TokenSchema = new Schema({
  _user_id: {
    type: String,
    required: true,
    ref: User,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

export const Token =
  mongoose.models.Token || mongoose.model("Token", TokenSchema);
