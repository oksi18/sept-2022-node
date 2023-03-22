import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { userMiddleware } from "../middleware";
import { authMiddleware } from "../middleware";

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
router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);
router.post(
  "/password/change",
  userMiddleware.isValidChangePassword,
  userMiddleware.getDynamicallyOrThrow("email", "body"),
  authController.changePassword
);
router.post(
  "/password/forgot",
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.forgotPassword
);
router.put(
  "/password/forgot/:token",
  authMiddleware.checkActionForgotToken,
  authController.setForgotPassword
);
export const authRouter = router;
