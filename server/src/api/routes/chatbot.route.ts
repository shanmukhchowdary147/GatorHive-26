import { Router } from "express";
import { chatbotController} from "../controllers/chatbot.controller";
const router = Router();

router.route("/message").post([chatbotController.generateResponse]);
export { router as chatbotRoutes };