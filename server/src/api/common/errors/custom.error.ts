class CustomError extends Error {
  data: any;
  statusCode: number;
  errorType: string;
  constructor({ message, statusCode, stack, data, errorType }: any) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = statusCode;
    this.stack = stack;
    this.data = data;
    this.errorType = errorType;
  }
}

export default CustomError;
