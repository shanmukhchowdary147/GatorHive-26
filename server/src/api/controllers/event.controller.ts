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
  createEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("create event", {
        file: req.file,
        __filename,
        functionName: "createEvent",
      });
      let filePath = null;
      if (req.file) {
        filePath = req.file.path;
      }
      logger.debug("create event", {
        filePath: filePath,
        __filename,
        functionName: "createEvent",
      });
      const userId = req.context.userId;
      const eventData = req.body.eventData;
      await eventService.createEvent(filePath, eventData, userId);
      res.json({ status: "success" }).status(200);
    } catch (error) {
      next(error);
    }
  };
}
export const eventController = new EventController();
