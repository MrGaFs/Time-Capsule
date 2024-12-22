import Joi from "joi";

export const registerValidation = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  confirmPassword: Joi.string().required()
    .valid(Joi.ref("password")).messages({
      'any.only': 'Confirm Password Must Match Password'
    }),
  dob: Joi.date().required(),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
