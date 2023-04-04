import { Router } from "express";
import { eventRoutes } from "./event.route";
import { userRoutes } from "./user.route";
import { authRoutes } from "./auth.route";
const router = Router();

router.get("/", (req: any, res: any) => res.send("We are all God's friends!"));
router.use("/events", eventRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export { router };

router.post("/auth", (req, res) => {
  res.send("Hello World!");
});
