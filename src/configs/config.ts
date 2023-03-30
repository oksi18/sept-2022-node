import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,

  ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD,

  ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET,
  FORGOT_SECRET: process.env.JWT_FORGOT_SECRET,

  FRONT_URL: process.env.FRONT_URL,

  AWS_S3_BUCKET_URL: process.env.AWS_S3_BUCKET_URL,
  AWS_S3_BUCKET_REGION: process.env.AWS_S3_BUCKET_REGION,
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  AWS_S3_BUCKET_ACL: process.env.AWS_S3_BUCKET_ACL,

  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
};
