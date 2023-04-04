import { Router } from "express";
import { eventRoutes } from "./event.route";
import { authRoutes } from "./auth.route";
const router = Router();

router.get("/", (req: any, res: any) => res.send("We are all God's friends!"));
router.use("/events", eventRoutes);
router.use("/auth", authRoutes);

export { router };
