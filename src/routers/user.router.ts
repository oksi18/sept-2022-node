import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware";
import { userMiddleware } from "../middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { UserValidator } from "../validators/validators";

const router = Router();

router.get("/", userController.getAll);

router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.getById
);
router.put(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.updateUser),
  userMiddleware.getByIdOrThrow,
  userController.update
);
router.delete(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("email"),
  userMiddleware.getByIdOrThrow,
  userController.delete
);

router.put(
  "/:userId/avatar",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userMiddleware.isValidUpdate,
  userMiddleware.getByIdOrThrow,
  userController.uploadAvatar
);
router.delete(
  "/:userId/avatar",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("email"),
  userMiddleware.getByIdOrThrow,
  userController.deleteAvatar
);
export const userRouter = router;
