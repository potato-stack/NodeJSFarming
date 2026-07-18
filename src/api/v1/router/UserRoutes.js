import { loginUserSchema, registerUserSchema, getUserByIdSchema } from '../schemas/UserSchemas.js';
import { validate } from '../../../middlewares/ValidateMiddleware.js';
import express from 'express';

export const createUserRouter = (userController) => {
  const authRouter = express.Router();
  authRouter
    .post('/register', validate(registerUserSchema, 'body'), userController.register)
    .post('/login', validate(loginUserSchema, 'body'), userController.loginUser);

  const userRouter = express.Router();
  userRouter.get('/me', validate(getUserByIdSchema), userController.getCurrentUserByID);
  // Need user password update and info update -> do later

  return [authRouter, userRouter];
}
