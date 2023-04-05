import logger from "../common/logger/logger";
import { signupDto } from "../customTypes";
import { mysqlProxy } from "../database/proxy/mysql.proxy";
import { collections } from "../enums/enums";

class UserRepository {
  update = async (
    condition: any,
    data?: any,
    transaction?: any
  ): Promise<any> => {
    await mysqlProxy.update(collections.User, condition, data, transaction);
  };

  findOne = async (condition: any, options: any = {}) => {
    logger.debug(
      "find one member record from db",
      { condition },
      __filename,
      "findOne"
    );
    const user = await mysqlProxy.findOne(collections.User, condition, options);
    logger.debug(
      "got member record from db",
      { user, condition },
      __filename,
      "findOne"
    );
    return user;
  };
  create = async (userData: any, transaction?: any) => {
    const user = await mysqlProxy.create(
      collections.User,
      userData,
      transaction
    );
    return user;
  };

  async find(condition: any, options?: any) {
    return mysqlProxy.find(collections.User, condition, options);
  }
}

export const userRepository = new UserRepository();
