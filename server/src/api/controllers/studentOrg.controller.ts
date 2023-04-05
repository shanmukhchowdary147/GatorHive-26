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
}
export const studentOrgController = new StudentOrgController();
