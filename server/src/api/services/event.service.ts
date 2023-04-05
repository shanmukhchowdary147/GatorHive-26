import { eventRepository } from "../repositories/event.repository";
import logger from "../common/logger/logger";
import { map } from "lodash";
import { studentOrgRepository } from "../repositories/studentOrg.repository";
import { EventCategoryMap, EventCategory } from "../enums/enums";
import { eventCategory, eventCategoryName } from "../customTypes";
import { awsS3Client } from "../../config/awsS3";
import { unlink } from "fs-extra";

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
  createEvent = async (filePath: any, eventData: any, userId: string) => {
    const callerMethodName = "createEvent";
    try {
      logger.info("create event", {
        __filename,
        callerMethodName,
      });
      const url = awsS3Client.uploadFile(filePath);
      eventData.hostedByUserId = userId;
      eventData.posterLink = url;
      const category: eventCategoryName = eventData.category;
      eventData.category = EventCategory[category];
      const event = await eventRepository.create(eventData);
      await unlink(filePath);
    } catch (error) {
      throw error;
    }
  };
}

export const eventService = new EventService();
