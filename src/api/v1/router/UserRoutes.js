import { UsersController } from '../controllers/UserController.js';
import {
  loginUserSchema,
  registerUserSchema,
  getUserByIdSchema,
  validateTokenSchema,
} from '../schemas/UserSchemas.js';
import { validate } from '../../../middlewares/ValidateMiddleware.js';
import express from 'express';

const userRouter = express.Router();
const authRouter = express.Router();
const controller = new UsersController();

authRouter
  .post('/register', validate(registerUserSchema, 'body'), controller.register)
  .post('/login', validate(loginUserSchema, 'body'), controller.loginUser);

userRouter.get(
  '/me',
  validate(getUserByIdSchema),
  controller.getCurrentUserByID,
);

// Need user password update and info update -> do later

export { userRouter, authRouter };
