import { userRepository } from "../repositories/user.repository";
import logger from "../common/logger/logger";

class UserService {
  updateUserDetails = async (user:any) => {
    const callerMethodName = "updateUserDetails";
    try {
      logger.info("Update User Details", {
        __filename,
        callerMethodName,
      });
      const events = userRepository.update({ id: user.id }, 
        { firstName: user.firstName, 
          lastName: user.lastName, 
          email: user.email,
          phone: user.phone,
          password: user.password,
          address1: user.address1,
          address2: user.address2,
          city: user.city,
          zipcode: user.zipcode,
        }
        );
      return events;
    } catch (error) {
      throw error;
    }
  };

}
export const userService = new UserService();
