import { eventRepository } from "../repositories/event.repository";
import logger from "../common/logger/logger";

class EventService {
  getAllEvents = async () => {
    const callerMethodName = "getAllEvents";
    try {
      logger.info("get all events", {
        __filename,
        callerMethodName,
      });
      const events = eventRepository.getAllEvents();
      return events;
    } catch (error) {
      throw error;
    }
  };
}

export const eventService = new EventService();
