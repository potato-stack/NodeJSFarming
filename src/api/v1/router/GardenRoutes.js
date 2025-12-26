import { GardenController } from '../controllers/GardenController.js';
import { createGardenSchema, getGardenSchema } from '../schemas/GardenSchemas.js';
import { validate } from '../../../middlewares/ValidateMiddleware.js';
import express from 'express';
import { requireGardenOwner } from '../../../middlewares/AuthMiddleware.js';
import { controllerManage } from '../../../dependencies/bindingcontroller.js';
import { TYPES } from '../../../dependencies/types.js';

const gardenRouter = express.Router();
const controller = controllerManage.get(TYPES.GardenController);

gardenRouter.get('/:garden_id', validate(getGardenSchema, 'params'), controller.getGardenById).get('/', controller.getGardensOfCurrentUser);
gardenRouter.post('/', validate(createGardenSchema, 'body'), controller.createGarden);
gardenRouter.put('/:garden_id', validate(getGardenSchema, 'params'), requireGardenOwner, controller.updateGarden);
gardenRouter.delete('/:garden_id', validate(getGardenSchema, 'params'), requireGardenOwner, controller.deleteGarden);

export { gardenRouter };
