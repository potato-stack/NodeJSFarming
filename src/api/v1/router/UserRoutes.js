import { UsersController } from '../controllers/UserController.js';
import { loginUserSchema, registerUserSchema, getUserByIdSchema } from '../schemas/UserSchemas.js';
import { validate } from '../../../middlewares/ValidateMiddleware.js';
import express from 'express';
import { controllerManage } from '../../../dependencies/bindingcontroller.js';
import { TYPES } from '../../../dependencies/types.js';

const userRouter = express.Router();
const authRouter = express.Router();
const controller = controllerManage.get(TYPES.UsersController);

authRouter
  .post('/register', validate(registerUserSchema, 'body'), controller.register)
  .post('/login', validate(loginUserSchema, 'body'), controller.loginUser);

userRouter.get('/me', validate(getUserByIdSchema), controller.getCurrentUserByID);

// Need user password update and info update -> do later

export { userRouter, authRouter };
