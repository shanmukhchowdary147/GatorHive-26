import { Router } from "express";
import { eventController } from "../controllers/event.controller";
const router = Router();

router.route("/").get([eventController.getAllEvents]);

export { router as eventRoutes };
