import * as winston from "winston";

const logger = winston.createLogger({
  level: "debug" || "info" || "error",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

export default logger;
