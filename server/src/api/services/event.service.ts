import { eventRepository } from "../repositories/event.repository";
import logger from "../common/logger/logger";
import { concat, map } from "lodash";
import { studentOrgRepository } from "../repositories/studentOrg.repository";
import { EventCategoryMap, EventCategory } from "../enums/enums";
import { addressType, eventCategory, eventCategoryName } from "../customTypes";
import { awsS3Client } from "../../config/awsS3";
import { unlink } from "fs-extra";
import { addressRepository } from "../repositories/address.repository";
import { registrationsRepository } from "../repositories/registrations.repository";
import { userRepository } from "../repositories/user.repository";
import { Op } from "sequelize";
import { mysqlProxy } from "../database/proxy/mysql.proxy";

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
  createEvent = async (
    filePath: any,
    eventData: any,
    userId: string,
    addressData: any
  ) => {
    const callerMethodName = "createEvent";
    const transaction = await mysqlProxy.createTransaction();
    try {
      logger.info("create event", {
        __filename,
        callerMethodName,
      });
      const url = await awsS3Client.uploadFile(filePath);
      eventData.hostedByUserId = userId;
      eventData.posterLink = url;
      const category: eventCategoryName = eventData.category;
      eventData.category = EventCategory[category];
      const address = await addressRepository.create(
        { ...addressData },
        transaction
      );
      eventData.addressId = address.id;
      const event = await eventRepository.create(eventData, transaction);
      await unlink(filePath);
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
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
      const address = await addressRepository.findOne(
        { id: event.addressId },
        { raw: true }
      );
      //need to correct casing
      const location = concat(
        address.roomNumber,
        address.street,
        address.City,
        address.State,
        address.Country,
        address.Pin
      );
      event.eventLocation = address;
      return event;
    } catch (error) {
      throw error;
    }
  };
  registerForAnEvent = async (userId: string, eventId: string) => {
    const callerMethodName = "registerForAnEvent";
    try {
      logger.info("registerForAnEvent", {
        __filename,
        callerMethodName,
      });
      await registrationsRepository.create({
        userId: userId,
        eventId: eventId,
        registeredAtUtc: new Date(),
      });
    } catch (error) {
      throw error;
    }
  };
  registerAsGroupForAnEvent = async (
    userId: string,
    eventId: string,
    groupEmails: string
  ) => {
    const callerMethodName = "registerAsGroupForAnEvent";
    const transaction = await mysqlProxy.createTransaction();
    try {
      logger.info("register as group", {
        __filename,
        callerMethodName,
      });
      const groupEmailsArray = groupEmails.split(",");
      const usersTobeRegistered = await userRepository.find(
        {
          email: { [Op.in]: groupEmailsArray },
        },
        { attributes: ["id"], raw: true }
      );
      const registrations = map(usersTobeRegistered, (user) => {
        return {
          userId: user.id,
          eventId: eventId,
          registeredAtUtc: new Date(),
        };
      });
      //Not checking if all the emails are in the database
      await registrationsRepository.bulkCreate({ registrations }, transaction);
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
}

export const eventService = new EventService();
