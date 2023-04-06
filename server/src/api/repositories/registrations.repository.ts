import logger from "../common/logger/logger";
import { mysqlProxy } from "../database/proxy/mysql.proxy";
import { collections } from "../enums/enums";

class RegistrationsRepository {
  create = async (data: any, transaction?: any) => {
    const registration = await mysqlProxy.create(
      collections.Registrations,
      data,
      transaction
    );
    return registration;
  };
  findOne = async (condition: any, options: any = {}) => {
    logger.debug(
      "find one member record from db",
      { condition },
      __filename,
      "findOne"
    );
    const registration = await mysqlProxy.findOne(
      collections.Registrations,
      condition,
      options
    );
    logger.debug(
      "got member record from db",
      { registration, condition },
      __filename,
      "findOne"
    );
    return registration;
  };
  async find(condition: any, options?: any) {
    return mysqlProxy.find(collections.Registrations, condition, options);
  }
  async bulkCreate(data: any, transaction: any) {
    logger.debug("bulkCreate", { data }, __filename, "bulkCreate");
    await mysqlProxy.bulkCreate(collections.Registrations, data, {
      transaction,
    });
  }
}

export const registrationsRepository = new RegistrationsRepository();
