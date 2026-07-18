import { config } from './config/Env.js';
import express from 'express';

// Packages
import morgan from 'morgan'; // Loggin
import cookieParser from 'cookie-parser'; // JWT manage for httponly cookie
import helmet from 'helmet'; // Secure HTTP header
import cors from 'cors'; // Cross origin request
import rateLimiter from 'express-rate-limit'; // Prevent bruteforce

// Modules
import { validateCookie } from './middlewares/ValidateMiddleware.js';
import { validateTokenSchema } from './api/v1/schemas/UserSchemas.js';
import { authMiddleWare, requireGardenOwner } from './middlewares/AuthMiddleware.js';
import { errorHandlerMiddleware } from './middlewares/ErrorMiddleware.js';
import { TYPES } from './dependencies/types.js';
import { container } from './dependencies/container.js';

// Express
const app = express();

// Middleware
app.use(
  rateLimiter({
    windowMs: Number(config.RATE_LIMIT.WINDOW_MS),
    max: Number(config.RATE_LIMIT.RATE_LIMIT_MAX),
  }),
);

app.use(helmet());
app.use(cors());
app.use(morgan());

app.use(express.json());
app.use(cookieParser(config.AUTH.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Auth do not require auth-middle
app.use('/auth', container.get(TYPES.AuthRouter));
// Authentication middle ware
app.use(validateCookie(validateTokenSchema), authMiddleWare);
// Router
app.use('/gardens/:garden_id/devices', requireGardenOwner, container.get(TYPES.DeviceRouter));
app.use('/gardens', container.get(TYPES.GardenRouter));
app.use('/gardens',  container.get(TYPES.UserGardenRouter));
app.use('/', container.get(TYPES.UserRouter));

// Error handler
app.use(errorHandlerMiddleware);

app.listen(config.SERVER.PORT, () => {
  console.log('Application listening at port: ', config.SERVER.PORT);
});
