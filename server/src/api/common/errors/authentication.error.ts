import { loginDto } from "../../customTypes";
import CustomError from "./custom.error";

class AuthenticationError extends CustomError {
  errorType = this.constructor.name;
  constructor(data: loginDto) {
    super({
      message: "Invalid credentials",
      statusCode: 401,
      data: data,
    });
  }
}

export default AuthenticationError;
