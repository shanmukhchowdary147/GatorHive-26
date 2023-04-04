import CustomError from "./custom.error";

class APIError extends CustomError {
  errorType = this.constructor.name;
  constructor(message: string, data: any, err: any) {
    super({
      message: message || err.message,
      stack: err.stack,
      statusCode: 400,
      data: data,
    });
  }
}

export default APIError;
