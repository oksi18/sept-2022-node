import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { EActionTokenType } from "../enums/action-token-type.enum";
import { authMiddleware, userMiddleware } from "../middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { UserValidator } from "../validators/validators";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.createUser),
  userMiddleware.getDynamicallyAndThrow("email"),
  authController.register
);
router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.loginUser),
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.login
);
router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);
router.post(
  "/password/change",
  commonMiddleware.isBodyValid(UserValidator.changePassword),
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.changePassword
);
router.post(
  "/password/forgot",
  commonMiddleware.isBodyValid(UserValidator.emailValidator),
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.forgotPassword
);
router.put(
  "/password/forgot/:token",
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  authMiddleware.checkActionToken(EActionTokenType.forgot),
  authController.setForgotPassword
);
router.post(
  "/activate",
  commonMiddleware.isBodyValid(UserValidator.emailValidator),
  userMiddleware.getDynamicallyOrThrow("email"),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  authController.sendActivateToken
);
router.put(
  "/activate/:token",
  authMiddleware.checkActionToken(EActionTokenType.activate),
  authController.activate
);
export const authRouter = router;
