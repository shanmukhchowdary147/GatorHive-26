import Joi from "joi";
import { passwordRegex } from "../constants/constants";

export const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(passwordRegex).required(),
  }),
};
