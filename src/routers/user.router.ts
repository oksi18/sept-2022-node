import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMiddleware } from "../middleware/user.middleware";

const router = Router();

router.get("/", userController.getAll);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.get("/:userId", userMiddleware.getByIdAndThrow, userController.getById);

router.post("/", userController.create);

router.put("/:userId", userController.update);

router.delete("/:userId", userController.delete);

export const userRouter = router;
