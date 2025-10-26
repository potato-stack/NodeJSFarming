import Joi from 'joi';

export const addUserIntoGardenSchema = Joi.object({
  user_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
  garden_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
  role: Joi.string().required(),
});

export const getUserRoleOfGardenSchema = Joi.object({
  garden_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
});

export const updateUserOfGardenSchema = Joi.object({
  user_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
  garden_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
  role: Joi.string().required(),
});

export const updateUserInGardenSchema = Joi.object({
  user_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
  garden_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
});

export const getUserInGardenSchema = Joi.object({
  user_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
  garden_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
});
