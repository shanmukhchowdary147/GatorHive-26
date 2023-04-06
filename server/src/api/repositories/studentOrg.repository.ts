import logger from "../common/logger/logger";
import { mysqlProxy } from "../database/proxy/mysql.proxy";
import { collections } from "../enums/enums";

class StudentOrgRepository {
  update = async (
    condition: any,
    data?: any,
    transaction?: any
  ): Promise<any> => {
    await mysqlProxy.update(
      collections.StudentOrg,
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
      collections.StudentOrg,
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
  create = async (orgName: string, transaction?: any) => {
    const studentOrg = await mysqlProxy.create(
      collections.StudentOrg,
      { orgName },
      transaction
    );
    return studentOrg;
  };
  async find(condition: any = {}, options?: any) {
    return mysqlProxy.find(collections.StudentOrg, condition, options);
  }
}

export const studentOrgRepository = new StudentOrgRepository();
