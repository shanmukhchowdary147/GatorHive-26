import Joi from "joi";
import { passwordRegex } from "../constants/constants";

export const signupValidation = {
  body: Joi.object({
    password: Joi.string().regex(passwordRegex).required(),
    email: Joi.string().email().required(),
    firstName: Joi.string()
      .pattern(/^[a-zA-Z ]+$/, { name: "alphabets with spaces" })
      .required(),
    lastName: Joi.string()
      .pattern(/^[a-zA-Z ]+$/, { name: "alphabets with spaces" })
      .required(),
    phoneNumber: Joi.string().min(5).max(32),
  }),
};
