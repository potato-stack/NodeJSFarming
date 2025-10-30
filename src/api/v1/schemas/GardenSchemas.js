import Joi from "joi";

export const createGardenSchema = Joi.object({
	name: Joi.string().required(),
});

export const getGardenSchema = Joi.object({
  garden_id: Joi.string().uuid({ version: "uuidv4" }).required(),
});
