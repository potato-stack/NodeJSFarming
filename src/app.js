import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;

import express from 'express';

// Packages
import morgan from 'morgan'; // Loggin
import cookieParser from 'cookie-parser'; // JWT manage for httponly cookie
import helmet from 'helmet'; // Secure HTTP header
import cors from 'cors'; // Cross origin request
import rateLimiter from 'express-rate-limit'; // Prevent bruteforce

import { deviceRouter } from './api/v1/router/DeviceRoutes.js';
import { userRouter, authRouter } from './api/v1/router/UserRoutes.js';
import { gardenRouter } from './api/v1/router/GardenRoutes.js';
import { userGardenRouter } from './api/v1/router/UserGardenRoutes.js';
import { validateCookie } from './middlewares/ValidateMiddleware.js';
import { validateTokenSchema } from './api/v1/schemas/UserSchemas.js';
import { authMiddleWare, requireGardenOwner } from './middlewares/AuthMiddleware.js';
import { errorHandlerMiddleware } from './middlewares/ErrorMiddleware.js';

// Express
const app = express();

// Middleware
app.use(
  rateLimiter({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: Number(process.env.RATE_LIMIT_MAX) || 60,
  })
);

app.use(helmet());
app.use(cors());
app.use(morgan());

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Auth do not require auth-middle
app.use('/auth', authRouter);
// Authentication middle ware
app.use(validateCookie(validateTokenSchema), authMiddleWare);
// Router
app.use('/gardens/:garden_id/devices', requireGardenOwner, deviceRouter);
app.use('/gardens', gardenRouter);
app.use('/gardens', userGardenRouter);
app.use('/', userRouter);

// Error handler
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log('Application listening at port: ', PORT);
});
