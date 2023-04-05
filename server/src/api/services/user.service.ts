import { userRepository } from "../repositories/user.repository";
import logger from "../common/logger/logger";
import { addressRepository } from "../repositories/address.repository";
import { mysqlProxy } from "../database/proxy/mysql.proxy";
import { collections } from "../enums/enums";

class UserService {
  updateUserDetails = async (user: any) => {
    const callerMethodName = "updateUserDetails";
    try {
      logger.info("Update User Details", {
        __filename,
        callerMethodName,
      });
      const address = await userRepository.findOne(
        { id: user.userId },
        { attributes: ["addressId"] }
      );
      const addressId = address.addressId;
      await addressRepository.update(
        { id: addressId },
        {
          roomNumber: user.addressLine1,
          street: user.addressLine2,
          City: user.city,
          State: user.state,
          Country: user.country,
          Pin: user.zipCode,
        }
      );
      const userDetails = userRepository.update(
        { id: user.userId },
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          password: user.password,
        }
      );
      return userDetails;
    } catch (error) {
      throw error;
    }
  };

  getUser = async (user: any) => {
    const callerMethodName = "getUser";
    try {
      logger.info("Get User Details", {
        __filename,
        callerMethodName,
      });
      const userData = await userRepository.findOne(
        { id: user.userId },
        { raw: true }
      );
      const address = await addressRepository.findOne(
        { id: user.userId },
        { raw: true }
      );
      return { ...userData, ...address };
    } catch (error) {
      throw error;
    }
  };
}
export const userService = new UserService();
