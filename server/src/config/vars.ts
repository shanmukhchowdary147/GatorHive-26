import path from "path";
import * as dotenv from "dotenv";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export const dbconfig = {
  dbConnectionURL: `${process.env.DB_DIALECT}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  pool: {
    max: parseInt(process.env.DB_MAX_CONNECTION_POOL as string, 10),
    min: parseInt(process.env.DB_MIN_CONNECTION_POOL as string, 10),
    acquire: parseInt(process.env.DB_ACQUIRE_CONNECTION_POOL as string, 10),
    idle: parseInt(process.env.DB_IDLE_CONNECTION_POOL as string, 10),
  },
  dialect: "mysql",
};
export const migrationsPath = path.join(__dirname, "../migrations");

export const shouldRunMigrations = process.env.SHOULD_RUN_MIGRATIONS === "true";
export const shouldForceSyncDb = process.env.SHOULD_FORCE_SYNC_DB === "true";
export const shouldSyncDB = process.env.SHOULD_SYNC_DB === "true";
export const redisConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  URI: process.env.REDIS_URI as string,
  password: process.env.REDIS_PASSWORD,
};
export const posterDir = path.join(process.cwd(), "./temp/posters");
export const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
export const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
export const bucketName = process.env.AWS_BUCKET_NAME;
