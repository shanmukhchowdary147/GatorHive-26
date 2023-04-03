import { Router } from "express";

const router = Router();
export { router };

router.post("/auth", (req, res) => {
  res.send("Hello World!");
});
