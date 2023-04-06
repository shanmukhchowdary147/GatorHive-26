import logger from "../common/logger/logger";
import { addressType, signupDto } from "../customTypes";
import { mysqlProxy } from "../database/proxy/mysql.proxy";
import { collections } from "../enums/enums";

class AddressRepository {
  update = async (
    condition: any,
    data?: any,
    transaction?: any
  ): Promise<any> => {
    await mysqlProxy.update(collections.Address, condition, data, transaction);
  };

  findOne = async (condition: any, options: any = {}) => {
    logger.debug(
      "find one member record from db",
      { condition },
      __filename,
      "findOne"
    );
    const address = await mysqlProxy.findOne(
      collections.Address,
      condition,
      options
    );
    logger.debug(
      "got member record from db",
      { address, condition },
      __filename,
      "findOne"
    );
    return address;
  };
  create = async (addressData: any, transaction?: any) => {
    const Address = await mysqlProxy.create(
      collections.Address,
      addressData,
      transaction
    );
    return Address;
  };

  getUser = async (condition: any = {}): Promise<any> => {
    const user = await mysqlProxy.find(collections.User, condition, {
      raw: true,
    });
    return user;
  };
}

export const addressRepository = new AddressRepository();
