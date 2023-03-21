import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { userMiddleware } from "../middleware";
import { authMiddleware } from "../middleware";

const router = Router();

router.post(
  "/register",
  userMiddleware.isValidCreate,
  userMiddleware.getDynamicallyAndThrow("email"),
  authController.register
);
router.post(
  "/login",
  userMiddleware.isValidLogin,
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.login
);
router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);

export const authRouter = router;
