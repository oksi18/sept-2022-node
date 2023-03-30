import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import fileUploader from "express-fileupload";
import * as http from "http";
import mongoose from "mongoose";
import { Server, Socket } from "socket.io";

import { cronRunner } from "./crons";
import { carRouter } from "./routers";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";
import { IError } from "./types";

config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  // /* Send to particular client */
  // socket.emit("message", { message: "hello" });
  // /* send message to all clients */
  // io.emit("user:connected", { message: "User connected" });
  // /* send message to all clients except sender */
  // socket.broadcast.emit("user:connected", { message: "User connected" });
  socket.on("message:send", (text) => {
    io.on("message:get", text);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUploader({}));

app.use("/users", userRouter);
app.use("/cars", carRouter);
app.use("/auth", authRouter);

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const status = err.status;

    return res.status(status).json({
      message: err.message,
      status,
    });
  } catch (e) {
    next(e);
  }
});
console.log(process.env.PORT);

server.listen(process.env.PORT, () => {
  mongoose.connect(process.env.DB_URL);
  cronRunner();
  console.log(`Server has started on PORT ${process.env.PORT}`);
});
