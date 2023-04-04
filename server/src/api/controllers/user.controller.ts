import { Response, Request, NextFunction } from "express";
import logger from "../common/logger/logger";
import { userService } from "../services/user.service";

class UserController {
  updateUserDetails  = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("Update User Details", {
        __filename,
        functionName: "updateUserDetails",
      });
      const details = await userService.updateUserDetails();
      res.status(200).json({ details });
    } catch (error) {
      next(error);
    }
  };
}
export const userController = new UserController();
