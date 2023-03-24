// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Model, mongoose, Schema } from "mongoose";

import { EGenders, EUserStatusEnum } from "../enums";
import { IUser } from "../types/user.types";

const userSchema = new Schema(
  {
    name: {
      type: String,
      index: true,
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
    age: {
      type: Number,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

interface IUserMethods {
  nameWithAge(): void;
}

interface IUserModel extends Model<IUser, object, IUserMethods> {
  findByName(name: string): Promise<IUser>
}

userSchema.methods = {
  nameWithAge() {
    console.log("hello");
  },
};

userSchema.static = {
  async findByName(name: string) {
    return this.find({ name });
  },
};

//export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const User: Model<IUser, IUserModel> =
  (mongoose.models.User as Model<IUser, IUserModel>) ||
  mongoose.model<IUser, IUserModel>("User", userSchema);


