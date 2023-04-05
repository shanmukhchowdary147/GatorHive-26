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
      const {user} = req.body;
      
      const details = await userService.updateUserDetails(user);
      res.status(200).json({ details });
    } catch (error) {
      next(error);
    }
  };

  getUser  = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("Get User Details", {
        __filename,
        functionName: "getUserDetails",
      });
      const {user} = req.body;
      
      const userData = await userService.getUser(user);
      res.status(200).json({ userData });
    } catch (error) {
      next(error);
    }
  };


}
export const userController = new UserController();
