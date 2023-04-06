import logger from "../common/logger/logger";
import { mysqlProxy } from "../database/proxy/mysql.proxy";
import { collections } from "../enums/enums";

class StudentOrgAccountsRepository {
  update = async (
    condition: any,
    data?: any,
    transaction?: any
  ): Promise<any> => {
    await mysqlProxy.update(
      collections.StudentOrgAccounts,
      condition,
      data,
      transaction
    );
  };

  findOne = async (condition: any, options: any = {}) => {
    logger.debug(
      "find one member record from db",
      { condition },
      __filename,
      "findOne"
    );
    const studentOrg = await mysqlProxy.findOne(
      collections.StudentOrgAccounts,
      condition,
      options
    );
    logger.debug(
      "got member record from db",
      { studentOrg, condition },
      __filename,
      "findOne"
    );
    return studentOrg;
  };
  create = async (data: any, transaction?: any) => {
    const studentOrg = await mysqlProxy.create(
      collections.StudentOrgAccounts,
      data,
      transaction
    );
    return studentOrg;
  };
  async find(condition: any = {}, options?: any) {
    return mysqlProxy.find(collections.StudentOrgAccounts, condition, options);
  }
}

export const studentOrgAccountsRepository = new StudentOrgAccountsRepository();
