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
      const eventData = JSON.parse(req.body.eventData);
      const addressData = JSON.parse(req.body.address);
      await eventService.createEvent(filePath, eventData, userId, addressData);
      res.json({ status: "success" }).status(200);
    } catch (error) {
      next(error);
    }
  };
  getEventDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("get event details", {
        __filename,
        functionName: "getEventDetails",
      });
      // const userId = req.context.userId;
      const eventId = req.query.eventId as string;
      const eventDetails = await eventService.getEventDetails(eventId);
      res.status(200).json(eventDetails);
    } catch (error) {
      next(error);
    }
  };
  registerForAnEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("register for an event", {
        __filename,
        functionName: "registerForAnEvent",
      });
      const userId = req.context.userId;
      const eventId = req.query.eventId as string;
      const ifAbleToRegister = await eventService.registerForAnEvent(
        userId,
        eventId
      );
      if (!ifAbleToRegister) {
        res.status(200).json({ status: "failure" });
      }
      res.status(200).json({ status: "success" });
    } catch (error) {
      next(error);
    }
  };
  registerAsGroupForAnEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("register for an event", {
        __filename,
        functionName: "registerForAnEvent",
      });
      const userId = req.context.userId;
      const eventId = req.query.eventId as string;
      const ifAbleToRegister = await eventService.registerAsGroupForAnEvent(
        userId,
        eventId,
        req.body.groupEmails
      );
      if (!ifAbleToRegister) {
        res.status(200).json({ status: "failure" });
      }
      res.status(200).json({ status: "success" });
    } catch (error) {
      next(error);
    }
  };

  getPopularEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("getPopularEvents", {
        __filename,
        functionName: "getPopularEvents",
      });

      const popularEvents = await eventService.getPopularEvents();
      res.status(200).json(popularEvents);
    } catch (error) {
      next(error);
    }
  };
}
export const eventController = new EventController();
