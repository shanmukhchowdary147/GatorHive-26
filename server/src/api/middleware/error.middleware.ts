import { NextFunction, Response, Request } from "express";
import logger from "../common/logger/logger";
import CustomError from "../common/errors/custom.error";

export const handler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error({
    ...err,
    __filename,
  });

  res
    .status(err instanceof CustomError ? err.statusCode : 500)
    .send(err.message);
};

export const resourceNotFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).send("Method not found");
};
