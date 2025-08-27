import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;

import express, { application } from 'express';

// Packages
import morgan from 'morgan';                  // Loggin
import cookieParser from 'cookie-parser';     // JWT
import helmet from 'helmet';                  // Secure HTTP header
import cors from 'cors';                      // Cross origin request
import rateLimiter from 'express-rate-limit'; // Prevent bruteforce

import { deviceRouter } from './api/v1/router/deviceRouter.js';
import { errorHandlerMiddleware } from './api/v1/middlewares/ErrorMiddleware.js';

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
app.use(morgan())
// app.use(xss());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// Router
app.use('/devices', deviceRouter)


// Error handler
app.use(errorHandlerMiddleware)

app.listen(PORT, () => {
  console.log('Application listening at port: ', PORT);
});
