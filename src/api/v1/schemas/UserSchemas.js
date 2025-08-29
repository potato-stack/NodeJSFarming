import Joi from 'joi';

export const registerUserSchema = Joi.object({
  id: Joi.number().integer(),
  name: Joi.string().required(),
  email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
    .required()
    .messages({
      'string.pattern.base': 'Only Gmail addresses are allowed',
      'string.email': 'Must be a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string().min(8).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
    .required()
    .messages({
      'string.pattern.base': 'Only Gmail addresses are allowed',
      'string.email': 'Must be a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string().min(8).required(),
});

export const getUserByIdSchema = Joi.object({
  id: Joi.number().integer().required(),
});

export const validateTokenSchema = Joi.object({
  token: Joi.string().required(),
});
