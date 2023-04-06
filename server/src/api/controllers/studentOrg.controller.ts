import { Response, Request, NextFunction } from "express";
import logger from "../common/logger/logger";
import { studentOrgService } from "../services/studentOrg.service";

class StudentOrgController {
  createOrg = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("create student org", {
        __filename,
        functionName: "createOrg",
      });
      const userId = req.context.userId;
      await studentOrgService.createOrg({
        ...req.body,
        userId,
      });
      res.send({ status: "Success" }).status(200);
    } catch (error) {
      next(error);
    }
  };
  getAllOrgs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("get all student orgs", {
        __filename,
        functionName: "getAllOrgs",
      });
      const orgs = await studentOrgService.getAllOrgs();
      res.send(orgs).status(200);
    } catch (error) {
      next(error);
    }
  };

  getSubscribedOrgs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("get subscribed orgs", {
        __filename,
        functionName: "getSubscribedOrgs",
      });
      const userId = req.context.userId;
      const subscribedOrgs = await studentOrgService.getSubscribedOrgs(userId);
      res.send(subscribedOrgs).status(200);
    } catch (error) {
      next(error);
    }
  };
  getHostableOrgs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("get hostable orgs", {
        __filename,
        functionName: "getHostableOrgs",
      });
      const userId = req.context.userId;
      const hostableOrgs = await studentOrgService.getHostableOrgs(userId);
      res.status(200).json(hostableOrgs);
    } catch (error) {
      next(error);
    }
  };

  subscribeOrg = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("subscribe org", {
        __filename,
        functionName: "subscribeOrg",
      });
      const userId = req.context.userId;
      const orgId = req.query.orgId as string;
      await studentOrgService.subscribeOrg(userId, orgId);
      res.send({ status: "Success" }).status(200);
    } catch (error) {
      next(error);
    }
  };
}
export const studentOrgController = new StudentOrgController();
