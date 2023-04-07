import { Router } from "express";
import { eventController } from "../controllers/event.controller";
import { authorize } from "../middleware/authorize.middleware";
import multer from "multer";
import { posterDir } from "../../config/vars";

const router = Router();

router.route("/").get([eventController.getAllEvents]);
router.route("/create").post([
  authorize,
  multer({
    storage: multer.diskStorage({
      destination: posterDir,
      filename: (req, file, next) => {
        next(null, `${Date.now()}--${file.originalname}`);
      },
    }),
  }).single("posterLink"),
  eventController.createEvent,
]);
router.route("/eventDetails").get([eventController.getEventDetails]);
router.route("/register").post([authorize, eventController.registerForAnEvent]);
router.route("/getPopularEvents").get([eventController.getPopularEvents]);
router
  .route("/registerGroup")
  .post([authorize, eventController.registerAsGroupForAnEvent]);

export { router as eventRoutes };
