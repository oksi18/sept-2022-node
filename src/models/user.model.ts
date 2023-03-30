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
    avatar: {
      type: String,
      required: false,
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

interface IUsersVirtuals {
  nameWithSurname: string;
}

interface IUserModel
  extends Model<IUser, object, IUserMethods, IUsersVirtuals> {
  // eslint-disable-next-line no-unused-vars
  findByName(name: string): Promise<IUser>;
}

userSchema.virtual("nameWithSurname").get(function () {
  return `${this.name} Kilatov`;
});

userSchema.methods = {
  nameWithAge() {
    return `${this.name} is ${this.age} years old`;
  },
};

userSchema.static = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async findByName(name: string): Promise<IUser[]> {
    return this.find({ name });
  },
};

//export const User = mongoose.models.User || mongoose.model("User", userSchema);
//export const User: Model<IUser, IUserModel> =
//  (mongoose.models.User as Model<IUser, IUserModel>) ||
// mongoose.model<IUser, IUserModel>("User", userSchema);

export const User =
  mongoose.models.User || mongoose.model<IUser, IUserModel>("User", userSchema);
