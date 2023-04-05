import * as redis from "redis";
import logger from "../api/common/logger/logger";
import { redisConfig } from "./vars";
import RedisError from "../api/common/errors/redis.error";

class RedisClient {
  connected: boolean;
  client: redis.RedisClientType;

  constructor() {
    this.connected = false;
    this.client = redis.createClient({
      legacyMode: true,
      password: redisConfig.password,
      socket: {
        host: redisConfig.host,
        port: parseInt(redisConfig.port as string),
      },
    });
    this.client
      .connect()
      .then(() => {
        logger.info({ message: "Redis client connected" });
      })
      .catch((err: any) =>
        logger.error({ message: "Redis client connection issue", error: err })
      );
  }

  setToken = async (
    userId: string,
    token: string,
    exp: number
  ): Promise<void> => {
    try {
      await this.client.SET(userId, token);
      await this.client.EXPIREAT(userId, exp);
    } catch (err) {
      logger.error({
        message: "Unable to store token",
        error: err,
        __filename,
      });
      throw new RedisError("Unable to store token", err);
    }
  };

  isTokenInCache = async (userId: string): Promise<number> => {
    try {
      const isTokenAvailable: number = await this.client.EXISTS(userId);
      logger.info(isTokenAvailable);

      return isTokenAvailable;
    } catch (err) {
      logger.error({
        message: "Unable to find token",
        error: err,
        __filename,
      });

      throw new RedisError("Unable to find token", err);
    }
  };

  deleteTokenInCache = async (id: string): Promise<number> => {
    try {
      return await this.client.DEL(id);
    } catch (err) {
      logger.error({
        message: "Unable to delete token from redis",
        error: err,
        __filename,
      });
      throw new RedisError("Unable to delete token from redis", err);
    }
  };
}

export const redisClient = new RedisClient();
