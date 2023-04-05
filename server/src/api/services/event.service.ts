import { eventRepository } from "../repositories/event.repository";
import logger from "../common/logger/logger";
import { map } from "lodash";
import { studentOrgRepository } from "../repositories/studentOrg.repository";
import { EventCategoryMap } from "../enums/enums";
import { eventCategory } from "../customTypes";

class EventService {
  getAllEvents = async () => {
    const callerMethodName = "getAllEvents";
    try {
      logger.info("get all events", {
        __filename,
        callerMethodName,
      });
      const events = await eventRepository.getAllEvents();
      logger.debug("events", {
        data: { data: events },
        __filename,
        callerMethodName,
      });
      const eventsWithOrg = await Promise.all(
        events.map(async (event: any) => {
          const studentOrg = await studentOrgRepository.findOne({
            id: event.studentOrgId,
          });
          const category: eventCategory = event.category;
          return {
            ...event,
            categoryName: EventCategoryMap[category],
            orgName: studentOrg.orgName,
          };
        })
      );
      logger.debug("get all events", {
        data: { eventsWithOrg },
        __filename,
        callerMethodName,
      });
      return eventsWithOrg;
    } catch (error) {
      throw error;
    }
  };
}

export const eventService = new EventService();
