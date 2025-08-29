import Joi from 'joi';

export const getDeviceSchema = Joi.object({
  id: Joi.number().integer().required(),
});

export const createDeviceSchema = Joi.object({
  id: Joi.number().integer(),
  type: Joi.string().valid('actuator', 'sensor').required(),
  name: Joi.string(),
  location: Joi.string(),
  status: Joi.string().valid('online', 'offline', 'unknown'),
});