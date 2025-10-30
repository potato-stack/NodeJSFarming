import { UserGardenSharedController } from '../controllers/UserGardenController.js';
import {
  addUserIntoGardenSchema,
  updateUserInGardenSchema,
  getUserInGardenSchema,
  updateUserRoleOfGardenSchema,
} from '../schemas/UserGardenSchemas.js';
import { validate } from '../../../middlewares/ValidateMiddleware.js';
import express from 'express';
import { getGardenSchema } from '../schemas/GardenSchemas.js';

const userGardenRouter = express.Router();
const userGardenController = new UserGardenSharedController();

userGardenRouter
  .get('/:garden_id/users', validate(getGardenSchema, 'params'), userGardenController.getAllUsersInGarden)
  .get('/:garden_id/role', validate(getGardenSchema, 'params'), userGardenController.getCurrentUserRoleOfGarden)
  .get(
    '/:garden_id/users/:user_id/role',
    validate(getUserInGardenSchema, 'params'),
    userGardenController.getUserRoleOfGarden,
  );
userGardenRouter.post(
  '/:garden_id/users',
  validate(getGardenSchema, 'params'),
  validate(addUserIntoGardenSchema, 'body'),
  userGardenController.addUserToGarden,
);
userGardenRouter.put(
  '/:garden_id/users/:user_id',
  validate(updateUserInGardenSchema, 'params'),
  validate(updateUserRoleOfGardenSchema, 'body'),
  userGardenController.updateUserRoleOfGarden,
);
userGardenRouter.delete(
  '/:garden_id/users/:user_id',
  validate(updateUserInGardenSchema, 'params'),
  userGardenController.removeUserFromGarden,
);

export { userGardenRouter };
