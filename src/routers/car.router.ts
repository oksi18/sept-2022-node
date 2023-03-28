import { Router } from "express";

import { carController } from "../controllers/car.controller";
import { authMiddleware } from "../middleware";
import { carMiddleware } from "../middleware/car.middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { CarValidator } from "../validators/car.validators";

const router = Router();

router.post(
  "/",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(CarValidator.createCar),
  carController.create
);

router.get(
  "/:carId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("carId"),
  carController.getById
);
router.put(
  "/:carId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("carId"),
  carMiddleware.getByIdOrThrow,
  carController.update
);
router.delete(
  "/:carId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("carId"),
  carMiddleware.getByIdOrThrow,
  carController.delete
);

export const carRouter = router;
