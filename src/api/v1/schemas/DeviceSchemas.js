import Joi from 'joi';

export const getDeviceSchema = Joi.object({
  device_id: Joi.string().uuid({ version: "uuidv4" }).required(),
});

export const createDeviceSchema = Joi.object({
  type: Joi.string().required(),
  name: Joi.string(),
  location: Joi.string(),
  status: Joi.string(),
});