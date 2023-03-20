import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { userMiddleware } from "../middleware/user.middleware";

const router = Router();

router.post(
  "/register",
  userMiddleware.isValidCreate,
  userMiddleware.getDynamicallyAndThrow("email", "body"),
  authController.register
);
router.post(
  "/login",
  userMiddleware.isValidLogin,
  userMiddleware.getDynamicallyOrThrow("email", "body"),
  authController.login
);

export const authRouter = router;
