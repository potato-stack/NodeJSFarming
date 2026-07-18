import express from 'express';
import { validate } from '../../../middlewares/ValidateMiddleware.js';
import { requireGardenOwner } from '../../../middlewares/AuthMiddleware.js';
import { createGardenSchema, getGardenSchema } from '../schemas/GardenSchemas.js';

export const createGardenRouter = (gardenController, userGardenController) => {
    const gardenRouter = express.Router();

    gardenRouter.get('/:garden_id', validate(getGardenSchema, 'params'), gardenController.getGardenById).get('/', userGardenController.getGardensOfCurrentUser);
    gardenRouter.post('/', validate(createGardenSchema, 'body'), gardenController.createGarden);
    gardenRouter.put('/:garden_id', validate(getGardenSchema, 'params'), requireGardenOwner, gardenController.updateGarden);
    gardenRouter.delete('/:garden_id', validate(getGardenSchema, 'params'), requireGardenOwner, gardenController.deleteGarden);

    return gardenRouter;
};
