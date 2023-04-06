import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { authorize } from "../middleware/authorize.middleware";
const router = Router();

router.route("/editProfile").put([authorize, userController.updateUserDetails]);
router.route("/userDetails").get([authorize, userController.getUser]);
router
  .route("/registeredEvents")
  .get([authorize, userController.getRegisteredEvents]);
router.route("/hostedEvents").get([authorize, userController.getHostedEvents]);

export { router as userRoutes };
