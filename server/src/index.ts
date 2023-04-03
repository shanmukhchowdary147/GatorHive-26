// import { runMigrations } from "./config/migrate";
import { mysqlProxy } from "./api/database/proxy/mysql.proxy";
import { expressApp } from "./config/express";
import logger from "./api/common/logger/logger";
import {
  shouldRunMigrations,
  shouldForceSyncDb,
  shouldSyncDB,
} from "./config/vars";

class Server {
  static bootstrap() {
    return new Server();
  }

  constructor() {
    this.initializeDB(() => {
      this.configureServer();
    });
  }

  configureServer() {
    expressApp.configureApp();
    expressApp.start();
  }

  async initializeDB(callback: any) {
    try {
      await mysqlProxy.sync(shouldSyncDB, shouldForceSyncDb);
      // if (shouldRunMigrations) {
      //   // await runMigrations(mysqlProxy.sequelize);
      //   logger.info(
      //     "Migrations ran successfully",
      //     {},
      //     __filename,
      //     "initializeDB"
      //   );
      // }
      console.log("Database connection has been established successfully.");
      // console.log("Migrations ran successfully");
      callback();
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      callback(error);
    }
  }
}

process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error(`Unhandled Rejection at: ${promise} reason: ${reason}`, {
    promise,
    reason,
  });
});

exports = Server.bootstrap();
