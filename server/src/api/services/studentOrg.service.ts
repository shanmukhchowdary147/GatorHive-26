import * as bcrypt from "bcryptjs";
import { userRepository } from "../repositories/user.repository";
import logger from "../common/logger/logger";
import { studentOrgAccountsRepository } from "../repositories/studentOrgAccounts.repository";
import { studentOrgRepository } from "../repositories/studentOrg.repository";
import { UserRole } from "../enums/enums";
import { Op } from "sequelize";
import { mysqlProxy } from "../database/proxy/mysql.proxy";

class StudentOrgService {
  createOrg = async (params: any) => {
    const transaction = await mysqlProxy.createTransaction();
    try {
      logger.info("create student org", {
        data: params,
        __filename,
        functionName: "createOrg",
      });
      const studentOrg = await studentOrgRepository.create(
        params.clubName,
        transaction
      );
      const secondaryEmails = params.secondaryEmail.split(",");
      const secondaryUsers = await userRepository.find(
        {
          email: { [Op.in]: secondaryEmails },
        },
        { attributes: ["id"] }
      );
      const studentOrgAccountsData = [];
      studentOrgAccountsData.push({
        userId: params.userId,
        studentOrgId: studentOrg.id,
        userRole: UserRole.PrimaryUser,
      });
      secondaryUsers.map((user) => {
        studentOrgAccountsData.push({
          userId: user.id,
          studentOrgId: studentOrg.id,
          userRole: UserRole.SecondaryUser,
        });
      });

      await Promise.all(
        studentOrgAccountsData.map(async (studentOrgAccount: any) => {
          await studentOrgAccountsRepository.create(
            studentOrgAccount,
            transaction
          );
        })
      );

      await transaction.commit();
      logger.info("create student org successful", {
        __filename,
        functionName: "createOrg",
      });
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  };

  getAllOrgs = async () => {
    const callerMethodName = "getAllOrgs";
    try {
      logger.info("get all student orgs", {
        __filename,
        callerMethodName,
      });
      const studentOrgs = await studentOrgRepository.find({}, { raw: true });
      return studentOrgs;
    } catch (err) {
      throw err;
    }
  };

  getSubscribedOrgs = async (userId: string) => {
    const callerMethodName = "getSubscribedOrgs";
    try {
      logger.info("get subscribed student orgs", {
        __filename,
        callerMethodName,
      });

      const studentOrgAccounts = await studentOrgAccountsRepository.find(
        { userId: userId },
        { raw: true }
      );
      const registeredOrgs = studentOrgAccounts.map(
        (studentOrgAccount: any) => studentOrgAccount.studentOrgId
      );
      const studentOrgSubscribed = await studentOrgRepository.find(
        { id: { [Op.in]: registeredOrgs } },
        { attributes: ["id"], raw: true }
      );
      return studentOrgSubscribed;
    } catch (err) {
      throw err;
    }
  };
  getHostableOrgs = async (userId: string) => {
    const callerMethodName = "getHostableOrgs";
    try {
      logger.info("get hostable student orgs", {
        __filename,
        callerMethodName,
      });

      const studentOrgAccounts = await studentOrgAccountsRepository.find(
        {
          userId: userId,
          userRole: { [Op.in]: [UserRole.PrimaryUser, UserRole.SecondaryUser] },
        },
        { raw: true }
      );
      const hostableOrgIds = studentOrgAccounts.map(
        (studentOrgAccount: any) => studentOrgAccount.studentOrgId
      );
      const hostableOrgs = await studentOrgRepository.find(
        { id: { [Op.in]: hostableOrgIds } },
        { raw: true }
      );
      return hostableOrgs;
    } catch (err) {
      throw err;
    }
  };

  subscribeOrg = async (userId: string, studentOrgId: string) => {
    const callerMethodName = "subscribeOrg";
    try {
      logger.info("subscribe student org", {
        __filename,
        callerMethodName,
      });
      await studentOrgAccountsRepository.create({
        userId: userId,
        studentOrgId: studentOrgId,
        userRole: UserRole.Subscriber,
      });
    } catch (err) {
      throw err;
    }
  };
}

export const studentOrgService = new StudentOrgService();
