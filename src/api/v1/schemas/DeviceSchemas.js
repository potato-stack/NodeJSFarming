import Joi from 'joi';

export const getDeviceSchema = Joi.object({
  id: Joi.number().integer().required(),
});

export const createDeviceSchema = Joi.object({
  type: Joi.string().required(),
  name: Joi.string(),
  location: Joi.string(),
  status: Joi.string(),
});