import { Router } from "express";
import { validate } from "express-validation";
import { loginValidation } from "../common/validations/login.validation";
import { authController } from "../controllers/auth.controller";
import { signupValidation } from "../common/validations/signup.validation";

const router: Router = Router();

router.route("/login").post([validate(loginValidation), authController.login]);

router
  .route("/signup")
  .post([validate(signupValidation), authController.registerUser]);

// TO-DO: Forgot Password API

export { router as authRoutes };
