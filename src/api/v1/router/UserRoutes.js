import { UsersController } from '../controllers/UserController.js';
import {
  loginUserSchema,
  registerUserSchema,
  getUserByIdSchema,
  validateTokenSchema,
} from '../schemas/UserSchemas.js';
import { validateCookie, validate } from '../../../middlewares/ValidateMiddleware.js';
import { authMiddleWare } from '../../../middlewares/AuthMiddleware.js';
import express from 'express';

const userRouter = express.Router();
const controller = new UsersController();

userRouter
  .post('/auth/register', validate(registerUserSchema, 'body'), controller.register)
  .post('/auth/login', validate(loginUserSchema, 'body'), controller.loginUser);
userRouter.get(
  '/me',
  validateCookie(validateTokenSchema),
  authMiddleWare,
  validate(getUserByIdSchema),
  controller.getCurrentUserByID,
);

export { userRouter };
