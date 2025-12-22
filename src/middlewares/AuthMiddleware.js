import jwt from 'jsonwebtoken';
import { config } from '../config/Env.js';
import { UserError } from '../errors/UserError.js';
import { GardenError } from '../errors/GardenError.js';
import { GetUserOfGardenDto } from '../dtos/UserGarden.dto.js';
import { GardenManageService } from '../services/UserGardenService.js';

export const authMiddleWare = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const payload = jwt.verify(token, config.AUTH.JWT_SECRET);
    // Attach the payload back to the request
    req.currentUser = payload;
    next();
  } catch (err) {
    next(UserError.Unauthorized(err));
  }
};

export const requireGardenOwner = async (req, res, next) => {
  try {
    const dto = new GetUserOfGardenDto({
      garden_id: req.params.garden_id,
      user_id: req.currentUser.id,
    });
    const userRole =
    await GardenManageService.getInstance().getUserRoleOfGarden(dto);
    if (userRole.value !== 'owner')
      throw GardenError.BadRequest('This action must be done by the garden owner!');
    next();
  } catch (err) {
    next(err);
  }
};
