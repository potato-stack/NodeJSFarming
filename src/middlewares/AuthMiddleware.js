import jwt from 'jsonwebtoken';
import { UserError } from '../errors/UserError.js';
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleWare = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the payload back to the request
   req.currentUser = payload;
    next();
  } catch (err) {
    next(UserError.Unauthorized(err));
  }
};
