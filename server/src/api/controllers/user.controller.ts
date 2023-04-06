import { Response, Request, NextFunction } from "express";
import logger from "../common/logger/logger";
import { userService } from "../services/user.service";

class UserController {
  updateUserDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("Update User Details", {
        __filename,
        functionName: "updateUserDetails",
      });
      const userId = req.context.userId;
      const userData = req.body;
      const details = await userService.updateUserDetails(userId, userData);
      res.status(200).json(details);
    } catch (error) {
      next(error);
    }
  };

  getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("Get User Details", {
        __filename,
        functionName: "getUserDetails",
      });
      const userId = req.context.userId;
      const userData = await userService.getUser(userId);
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  };
  getRegisteredEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("Get Registered Events", {
        __filename,
        functionName: "getRegisteredEvents",
      });
      const userId = req.context.userId;
      const events = await userService.getRegisteredEvents(userId);
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  };
  getHostedEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("Get Hosted Events", {
        __filename,
        functionName: "getHostedEvents",
      });
      const userId = req.context.userId;
      const events = await userService.getHostedEvents(userId);
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  };
}
export const userController = new UserController();
