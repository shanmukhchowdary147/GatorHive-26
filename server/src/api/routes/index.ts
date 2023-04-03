import { Router } from "express";
import { eventRoutes } from "./event.route";
const router = Router();

router.get("/", (req: any, res: any) => res.send("We are all God's friends!"));
router.use("/events", eventRoutes);

export { router };
