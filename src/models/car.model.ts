import { model, Schema, Types } from "mongoose";

import { User } from "./user.model";

const carSchema = new Schema(
  {
    brand: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    model: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    year: {
      type: Number,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Car = model("car", carSchema);
