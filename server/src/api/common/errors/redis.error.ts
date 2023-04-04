import CustomError from "./custom.error";

class RedisError extends CustomError {
  errorType = this.constructor.name;
  constructor(message: string, err: any) {
    super({
      message: message || err.message,
      stack: err.stack,
      statusCode: err.status,
    });
  }
}

export default RedisError;
