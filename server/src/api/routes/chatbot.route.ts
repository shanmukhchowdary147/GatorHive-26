import { Router } from "express";
import { chatbotController} from "../controllers/chatbot.controller";
const router = Router();

router.route("/recommend-events").get([chatbotController.getChatGptRecommendations]);
export { router as chatbotRoutes };