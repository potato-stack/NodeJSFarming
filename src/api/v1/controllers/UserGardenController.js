import { StatusCodes } from 'http-status-codes';
import {
  AddUserToGardenDto,
  RemoveUserFromGardenDto,
  UpdateUserRoleDto,
  GetUserOfGardenDto,
} from '../../../dtos/UserGarden.dto.js';
import { GardenError } from '../../../errors/GardenError.js';
import { UserError } from '../../../errors/UserError.js';

export class UserGardenController {
  constructor(userGardenService) {
    this.userGardenService = userGardenService;
  };

  addUserToGarden = async (req, res, next) => {
    try {
      const relation = new AddUserToGardenDto({
        user_id: req.body.user_id,
        garden_id: req.params.garden_id,
        role: req.body.role,
      });
      const createdUserGarden = await this.userGardenService.addUserToGarden(relation);

      res.status(StatusCodes.CREATED).json(createdUserGarden);
    } catch (error) {
      next(error);
    }
  };

  removeUserFromGarden = async (req, res, next) => {
    try {
      const relation = new RemoveUserFromGardenDto({
        garden_id: req.params.garden_id,
        user_id: req.params.user_id,
      });
      if (dto.user_id == relation.user_id)
        throw GardenError.BadRequest('You cannot remove yourself from your garden.');
      const removedUserGarden = await this.userGardenService.removeUserFromGarden(relation);

      res.status(StatusCodes.OK).json(removedUserGarden);
    } catch (error) {
      next(error);
    }
  };

  updateUserRoleOfGarden = async (req, res, next) => {
    try {
      if (req.currentUser.id === req.user_id)
        throw UserError.BadRequest('You cannot change your admin role');

      const relation = new UpdateUserRoleDto({
        garden_id: req.params.garden_id,
        user_id: req.params.user_id,
        role: req.body.role,
      });
      const updatedUserGarden = await this.userGardenService.updateUserRoleOfGarden(relation);

      res.status(StatusCodes.OK).json(updatedUserGarden);
    } catch (error) {
      next(error);
    }
  };

  getUserRoleOfGarden = async (req, res, next) => {
    try {
      const relation = new GetUserOfGardenDto({
        garden_id: req.params.garden_id,
        user_id: req.params.user_id,
      });
      const userRole = await this.userGardenService.getUserRoleOfGarden(relation);

      res.status(StatusCodes.OK).json(userRole);
    } catch (error) {
      next(error);
    }
  };

  getCurrentUserRoleOfGarden = async (req, res, next) => {
    try {
      const relation = new GetUserOfGardenDto({
        garden_id: req.params.garden_id,
        user_id: req.currentUser.id,
      });
      const userRole = await this.userGardenService.getUserRoleOfGarden(relation);

      res.status(StatusCodes.OK).json(userRole);
    } catch (error) {
      next(error);
    }
  };

  getAllUsersInGarden = async (req, res, next) => {
    try {
      const usersInfo = await this.userGardenService.getUserByGardenId(req.params.garden_id);
      res.status(StatusCodes.OK).json(usersInfo);
    } catch (error) {
      next(error);
    }
  };

  getGardensOfCurrentUser = async (req, res, next) => {
    try {
      const gardens = await this.userGardenService.getGardenByUserId(req.currentUser.id);
      res.status(StatusCodes.OK).json(gardens);
    } catch (error) {
      next(error);
    }
  };
}
