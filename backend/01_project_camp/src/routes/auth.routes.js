import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import { validator } from "../middlewares/validator.js";
import * as validate from "../validators/validate.js";

const router = Router();

router
  .route("/register")
  .post(validator(validate.registerUserInputSchema), authController.register);

router
  .route("/login")
  .post(validator(validate.loginUserInputSchema), authController.login);

router.route("/verify-email/:token").get(authController.verifyEmail);

router
  .route("/resend-email-verification-token")
  .post(
    validator(validate.resendEmailVerificationTokenInputSchema),
    authController.resendEmailVerificationToken,
  );

router.route("/refresh-token").post(authController.refreshAccessToken);
router
  .route("/forgot-password")
  .post(
    validator(validate.forgotPasswordInputSchema),
    authController.forgotPassword,
  );
router
  .route("/reset-password/:token")
  .post(
    validator(validate.resetForgotPasswordInputSchema),
    authController.resetForgotPassword,
  );

// protected routes
router
  .route("/logout")
  .post(authMiddleware.authenticate, authController.logout);
router
  .route("/current-user")
  .get(authMiddleware.authenticate, authController.getCurrentUser);

router
  .route("/change-password")
  .post(
    authMiddleware.authenticate,
    validator(validate.changePasswordInputSchema),
    authController.changePassword,
  );

export default router;
