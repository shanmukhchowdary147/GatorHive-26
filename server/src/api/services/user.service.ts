import { userRepository } from "../repositories/user.repository";
import logger from "../common/logger/logger";
import { addressRepository } from "../repositories/address.repository";
import { mysqlProxy } from "../database/proxy/mysql.proxy";
import { collections } from "../enums/enums";
import { registrationsRepository } from "../repositories/registrations.repository";
import { eventRepository } from "../repositories/event.repository";
import { Op } from "sequelize";
import { map } from "lodash";

class UserService {
  updateUserDetails = async (userId: string, user: any) => {
    const callerMethodName = "updateUserDetails";
    const transaction = await mysqlProxy.createTransaction();
    try {
      logger.info("Update User Details", {
        __filename,
        callerMethodName,
      });
      const address = await userRepository.findOne(
        { id: userId },
        { raw: true }
      );
      //need to update the address table later on into addressline 1 and 2 instead of room bumber and street
      let addressId = null;
      if (address.addressId != null) {
        addressId = address.addressId;
        await addressRepository.update(
          { id: address.addressId },
          {
            roomNumber: user.roomNumber,
            street: user.street,
            City: user.City,
            State: user.State,
            Country: user.Country,
            Pin: user.Pin,
          },
          transaction
        );
      } else {
        const addressDetails = await addressRepository.create(
          {
            roomNumber: user.roomNumber,
            street: user.street,
            City: user.City,
            State: user.State,
            Country: user.Country,
            Pin: user.Pin,
          },
          transaction
        );
        addressId = addressDetails.id;
      }
      const userDetails = await userRepository.update(
        { id: userId },
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          addressId: addressId,
          // password: user.password,
        },
        transaction
      );
      await transaction.commit();
      // since this means update is done, sending the user details in parameters
      return user;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  getUser = async (userId: any) => {
    const callerMethodName = "getUser";
    try {
      logger.info("Get User Details", {
        __filename,
        callerMethodName,
      });
      const userData = await userRepository.findOne(
        { id: userId },
        { raw: true }
      );
      const address = await addressRepository.findOne(
        { id: userData.addressId },
        { raw: true }
      );
      return { ...userData, ...address };
    } catch (error) {
      throw error;
    }
  };
  getRegisteredEvents = async (userId: string) => {
    const callerMethodName = "getRegisteredEvents";
    try {
      logger.info("Get Registered Events", {
        __filename,
        callerMethodName,
      });
      const registrations = await registrationsRepository.find(
        { userId: userId },
        { attributes: ["eventId"], raw: true }
      );
      const registeredEventIds = map(
        registrations,
        (registration) => registration.eventId
      );
      const registeredEvents = await eventRepository.find(
        { id: { [Op.in]: registeredEventIds } },
        { raw: true }
      );
      return registeredEvents;
    } catch (error) {
      throw error;
    }
  };
  getHostedEvents = async (userId: string) => {
    const callerMethodName = "getHostedEvents";
    try {
      logger.info("Get Hosted Events", {
        __filename,
        callerMethodName,
      });
      const hostedEvents = await eventRepository.find(
        { hostedByUserId: userId },
        { raw: true }
      );
      return hostedEvents;
    } catch (error) {
      throw error;
    }
  };
}
export const userService = new UserService();
