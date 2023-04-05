import { Response, Request, NextFunction } from "express";
import logger from "../common/logger/logger";
import { eventService } from "../services/event.service";

class EventController {
  getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("get all events", {
        __filename,
        functionName: "getAllEvents",
      });
      const eventsWithOrg = await eventService.getAllEvents();
      res.status(200).json(eventsWithOrg);
    } catch (error) {
      next(error);
    }
  };
}
export const eventController = new EventController();
