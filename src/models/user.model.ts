// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { mongoose, Schema } from "mongoose";

import { EGenders, EUserStatusEnum } from "../enums";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      unique: true,
      required: [true, "password is required"],
    },
    gender: {
      type: String,
      enum: EGenders,
    },
    status: {
      type: String,
      enum: EUserStatusEnum,
      default: EUserStatusEnum.inactive,
    },
  },
  {
    versionKey: false,
  }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
