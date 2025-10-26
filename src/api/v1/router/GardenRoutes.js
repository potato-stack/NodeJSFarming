import { GardenController } from '../controllers/GardenController.js';
import { createGardenSchema, getGardenSchema } from '../schemas/GardenSchemas.js';
import { validate } from '../../../middlewares/ValidateMiddleware.js';
import express from 'express';

const gardenRouter = express.Router();
const controller = new GardenController();

gardenRouter.get('/:id', validate(getGardenSchema, 'body'), controller.getGardenById).get('/', controller.getGardensOfCurrentUser);
gardenRouter.post('/', validate(createGardenSchema, 'body'), controller.createGarden);
gardenRouter.put('/:id', validate(getGardenSchema, 'params'), controller.updateGarden);
gardenRouter.delete('/:id', validate(getGardenSchema, 'params'), controller.deleteGarden);

export { gardenRouter };
