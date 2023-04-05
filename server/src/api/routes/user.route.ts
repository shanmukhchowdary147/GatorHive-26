import { Router } from "express";
import { userController } from "../controllers/user.controller";
const router = Router();

router.route("/editProfile").put([userController.updateUserDetails]);

export { router as userRoutes };
