import { Response, Request, NextFunction } from "express";
import logger from "../common/logger/logger";
import { authService } from "../services/auth.service";

class AuthController {
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token: string = await authService.login(req.body);
      logger.info({
        message: "Successfully logged in",
      });
      res.status(200).json({ accessToken: token });
    } catch (err: any) {
      next(err);
    }
  };

  registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("register user", {
        data: { ...req.body },
        __filename,
        functionName: "registerUser",
      });
      const token: string | null = await authService.registerUser({
        ...req.body,
      });
      logger.info("user sucessfully registered", {
        status: 200,
        __filename,
        functionName: "registerUser",
      });
      res.send({ token: token });
    } catch (error) {
      next(error);
    }
  };
}

export const authController = new AuthController();
