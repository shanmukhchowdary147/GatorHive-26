import * as bcrypt from "bcryptjs";
import { userRepository } from "../repositories/user.repository";
import { authHelper } from "../common/helpers/auth.helper";
import logger from "../common/logger/logger";
import { hashHelper } from "../common/helpers/hash.helper";
import { redisClient } from "../../config/redisClient";
import clientError from "../common/errors/client.error";
import AuthenticationError from "../common/errors/authentication.error";
import { loginDto, signupDto } from "../customTypes";

class AuthService {
  storeToken = async (token: string, userId: string): Promise<void> => {
    try {
      logger.info("store token in redis", {
        data: { userId },
        __filename,
        functionName: "storeToken",
      });
      const tokenPayload = authHelper.verifyAccessToken(token);
      const exp = tokenPayload.exp as number;
      await redisClient.setToken(userId, token, exp);
      logger.info("token storing successful", {
        data: { userId },
        __filename,
        functionName: "storeToken",
      });
    } catch (err) {
      throw err;
    }
  };

  registerUser = async (params: signupDto): Promise<string | null> => {
    try {
      logger.info("register user", {
        data: params,
        __filename,
        functionName: "registerUser",
      });
      const account = await userRepository.findOne({ email: params.email });
      if (account) {
        throw new clientError(
          "account with entered email already exists",
          params.email,
          409
        );
      }
      const passwordHash: string = await hashHelper.generateHash(
        params.password
      );
      const userData = {
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        passwordHash,
        phoneNumber: params.phoneNumber,
        lastLoggedInAtUtc: new Date(),
      };

      const user = await userRepository.create({ ...userData });
      const token = authHelper.createAccessToken(user.id);

      await this.storeToken(token, user.id);
      logger.info("register user successful", {
        data: { UserId: user.id },
        __filename,
        functionName: "registerUser",
      });
      return token;
    } catch (err) {
      throw err;
    }
  };
  login = async (params: loginDto): Promise<string> => {
    try {
      const account = await userRepository.findOne({ email: params.email });
      if (!account) {
        throw new AuthenticationError(params);
      }
      if (!(await bcrypt.compare(params.password, account.passwordHash))) {
        throw new AuthenticationError(params);
      }
      const userId = account.id as string;
      const accessToken: string = authHelper.createAccessToken(userId);
      await this.storeToken(accessToken, userId);
      await userRepository.update(
        { id: userId },
        { lastLoggedInAtUtc: new Date() }
      );

      logger.info({
        message: "User logged in",
        data: { email: params.email },
      });

      return accessToken;
    } catch (err) {
      throw err;
    }
  };
}

export const authService = new AuthService();
