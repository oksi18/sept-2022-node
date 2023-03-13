import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { configs } from "./configs/config";
import { userRouter } from "./routers/user.router";
import { IError } from "./types/common.types";

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const status = err.status;

  return res.status(status).json({
    message: err.message,
    status,
  });
});
console.log(process.env.PORT);

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log(`Server has started on PORT ${configs.PORT}`);
});
