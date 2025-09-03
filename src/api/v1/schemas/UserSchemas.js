import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const getUserByIdSchema = Joi.object({
  id: Joi.number().integer().required(),
});

export const validateTokenSchema = Joi.object({
  token: Joi.string().required(),
});
