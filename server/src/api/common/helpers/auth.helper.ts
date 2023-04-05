/* eslint-disable @typescript-eslint/no-explicit-any */
import * as jwt from "jsonwebtoken";
import logger from "../logger/logger";

class AuthHelper {
  public createAccessToken = (userId: string): string => {
    try {
      logger.info("get access token", {
        userId,
        __filename,
        functionName: "getAccessToken",
      });

      const secretKey: string = process.env.SECRET_KEY as string;
      const token: string = jwt.sign({ id: userId }, secretKey, {
        expiresIn: "30d",
      });

      logger.info("access token created succesfully", {
        userId,
        __filename,
        functionName: "getAccessToken",
      });

      return token;
    } catch (error) {
      logger.error("Unable to create token");
      throw new Error(`Unable to create token - userId:${userId}`);
    }
  };
  public verifyAccessToken = (token: string): jwt.JwtPayload => {
    try {
      logger.info("Verify access token", {
        __filename,
        functionName: "verifyAccessToken",
      });
      const secretKey: string = process.env.SECRET_KEY as string;
      const payload: jwt.JwtPayload = jwt.verify(
        token,
        secretKey
      ) as jwt.JwtPayload;

      logger.info(
        "Access token verified successfully",
        { id: payload.id },
        __filename,
        "verifyAccessToken"
      );

      return payload;
    } catch (error) {
      logger.info("Incorrect access token");
      throw Error(`Unable to verify token-${token} `);
    }
  };
}
export const authHelper = new AuthHelper();
