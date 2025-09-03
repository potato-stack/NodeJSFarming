import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;

import express, { application } from 'express';

// Packages
import morgan from 'morgan'; // Loggin
import cookieParser from 'cookie-parser'; // JWT manage for httponly cookie
import helmet from 'helmet'; // Secure HTTP header
import cors from 'cors'; // Cross origin request
import rateLimiter from 'express-rate-limit'; // Prevent bruteforce

import { deviceRouter } from './api/v1/router/deviceRouter.js';
import { userRouter } from './api/v1/router/userRouter.js';
import { validateCookie } from './middlewares/ValidateMiddleware.js';
import { validateTokenSchema } from './api/v1/schemas/UserSchemas.js';
import { authMiddleWare } from './middlewares/AuthMiddleware.js';
import { errorHandlerMiddleware } from './middlewares/ErrorMiddleware.js';

// Express
const app = express();

// Middleware
app.use(
  rateLimiter({
    windowsMs: 15 * 60 * 1000,
    max: 60,
  }),
);

app.use(helmet());
app.use(cors());
app.use(morgan());

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Router
app.use('/devices', validateCookie(validateTokenSchema), authMiddleWare, deviceRouter);
app.use('/users', userRouter);

// Error handler
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log('Application listening at port: ', PORT);
});
