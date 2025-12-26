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
import { requireGardenOwner } from '../../../middlewares/AuthMiddleware.js';
import { controllerManage } from '../../../dependencies/bindingcontroller.js';
import { TYPES } from '../../../dependencies/types.js';

const userGardenRouter = express.Router();
const userGardenController = controllerManage.get(TYPES.UserGardenSharedController);

userGardenRouter
  .get(
    '/:garden_id/users',
    validate(getGardenSchema, 'params'),
    userGardenController.getAllUsersInGarden,
  )
  .get(
    '/:garden_id/role',
    validate(getGardenSchema, 'params'),
    userGardenController.getCurrentUserRoleOfGarden,
  )
  .get(
    '/:garden_id/users/:user_id/role',
    validate(getUserInGardenSchema, 'params'),
    userGardenController.getUserRoleOfGarden,
  );
userGardenRouter.post(
  '/:garden_id/users',
  validate(getGardenSchema, 'params'),
  validate(addUserIntoGardenSchema, 'body'),
  requireGardenOwner,
  userGardenController.addUserToGarden,
);
userGardenRouter.put(
  '/:garden_id/users/:user_id',
  validate(updateUserInGardenSchema, 'params'),
  validate(updateUserRoleOfGardenSchema, 'body'),
  requireGardenOwner,
  userGardenController.updateUserRoleOfGarden,
);
userGardenRouter.delete(
  '/:garden_id/users/:user_id',
  validate(updateUserInGardenSchema, 'params'),
  requireGardenOwner,
  userGardenController.removeUserFromGarden,
);

export { userGardenRouter };
