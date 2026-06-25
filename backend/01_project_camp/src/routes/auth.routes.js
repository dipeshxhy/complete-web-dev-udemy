import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { validator } from "../middlewares/validator.js";
import * as validate from "../validators/validate.js";

const router = Router();

router
  .route("/register")
  .post(validator(validate.registerUserInputSchema), authController.register);

export default router;
