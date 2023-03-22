// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { mongoose, Schema } from "mongoose";

import { User } from "./user.model";

const OldPasswordSchema = new Schema({
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

export const OldPassword =
  mongoose.models.OldPassword ||
  mongoose.model("OldPassword", OldPasswordSchema);
