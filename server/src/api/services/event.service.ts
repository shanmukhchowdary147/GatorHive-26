import { eventRepository } from "../repositories/event.repository";
import logger from "../common/logger/logger";
import { map } from "lodash";
import { studentOrgRepository } from "../repositories/studentOrg.repository";
import { EventCategoryMap, EventCategory } from "../enums/enums";
import { eventCategory, eventCategoryName } from "../customTypes";
import { awsS3Client } from "../../config/awsS3";
import { unlink } from "fs-extra";
import { addressRepository } from "../repositories/address.repository";

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
  getEventDetails = async (userId: string, eventId: string) => {
    const callerMethodName = "getEventDetails";
    try {
      logger.info("get event details", {
        __filename,
        callerMethodName,
      });
      const event = await eventRepository.findOne(
        { id: eventId },
        { raw: true }
      );
      const studentOrg = await studentOrgRepository.findOne({
        id: event.studentOrgId,
      });
      const category: eventCategory = event.category;
      event.categoryName = EventCategoryMap[category];
      event.orgName = studentOrg.orgName;
      const registration = await eventRepository.findOne(
        { userId: userId, eventId: eventId },
        { raw: true }
      );
      event.isRegistered = registration.id ? true : false;
      const address = addressRepository.findOne(
        { id: event.addressId },
        { raw: true }
      );
      event.address = address;
      return event;
    } catch (error) {
      throw error;
    }
  };
}

export const eventService = new EventService();
