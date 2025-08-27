import { DeviceError } from "../errors/DeviceError.js";
import Joi from "joi";

export const getDeviceSchema = Joi.object({
  id: Joi.number().integer().required(),
});

export const createDeviceSchema = Joi.object({
  id: Joi.number().integer(),
  name: Joi.string(),
  location: Joi.string(),
  status: Joi.string().valid("online", "offline", "unknown"),
});

export const validate = (schema, property = "body") => (req, res, next) => {
  const { error } = schema.validate(req[property], { abortEarly: false });
  if (error) return next(DeviceError.Validation(error.details.map(d => d.message).join(", ")));
  next();
};