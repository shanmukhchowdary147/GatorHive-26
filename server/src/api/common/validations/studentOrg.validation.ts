import Joi from "joi";

export const createOrgValidation = {
  body: Joi.object({
    clubName: Joi.string().required(),
    secondaryEmail: Joi.string(),
  }),
};
