import { model, Schema } from "mongoose";

import { EGenders } from "../types/user.types";

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
  },
  {
    versionKey: false,
  }
);

export const User = model("users", userSchema);
