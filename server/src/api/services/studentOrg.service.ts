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
}

export const studentOrgService = new StudentOrgService();
