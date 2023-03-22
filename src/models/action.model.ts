// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { mongoose, Schema } from "mongoose";
import { Types } from "mongoose";

import { EActionTokenType } from "../enums/action-token-type.enum";
import { User } from "./user.model";

const ActionTokenSchema = new Schema(
  {
    _user_id: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
    actionToken: {
      type: String,
      required: true,
    },
    tokenType: {
      type: String,
      enum: EActionTokenType,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Action =
  mongoose.models.Action || mongoose.model("Token", ActionTokenSchema);
