import { StatusCodes } from 'http-status-codes';
import { GardenManageService } from '../../../services/UserGardenService.js';
import { GardenServices } from '../../../services/GardenService.js';
import { UsersService } from '../../../services/UserService.js';
import {
  AddUserToGardenDto,
  RemoveUserFromGardenDto,
  UpdateUserRoleDto,
  GetUserOfGardenDto,
} from '../../../dtos/UserGarden.dto.js';
import { GardenError } from '../../../errors/GardenError.js';
import { UserError } from '../../../errors/UserError.js';

export class UserGardenSharedController {
  static gardenServices = null;
  static gardenManageService = null;
  static usersService = null;

  static getGardenService() {
    if (!UserGardenSharedController.gardenServices) {
      UserGardenSharedController.gardenServices = new GardenServices();
    }
    return UserGardenSharedController.gardenServices;
  }

  static getGardenManageService() {
    if (!UserGardenSharedController.gardenServices) {
      UserGardenSharedController.gardenManageService = new GardenManageService();
    }
    return UserGardenSharedController.gardenManageService;
  }

  static getUserService() {
    if (!UserGardenSharedController.usersService) {
      UserGardenSharedController.usersService = new UsersService();
    }
    return UserGardenSharedController.usersService;
  }

  addUserToGarden = async (req, res, next) => {
    try {
      const currentUser = new GetUserOfGardenDto({
        garden_id: req.params.gardenId,
        user_id: req.currentUser.id,
      });
      const userRole =
        await UserGardenSharedController.getGardenManageService().getUserRoleOfGarden(currentUser);
      if (userRole !== 'admin')
        throw GardenError.BadRequest('This action must be done by the garden owner!');

      const relation = new AddUserToGardenDto(req.body);
      const createdUserGarden =
        await UserGardenSharedController.getGardenManageService().addUserToGarden(relation);

      res.status(StatusCodes.CREATED).json(createdUserGarden);
    } catch (error) {
      next(error);
    }
  };

  removeUserFromGarden = async (req, res, next) => {
    try {
      const currentUser = new GetUserOfGardenDto({
        garden_id: req.params.garden_id,
        user_id: req.currentUser.id,
      });
      const userRole =
        await UserGardenSharedController.getGardenManageService().getUserRoleOfGarden(currentUser);
      if (userRole !== 'admin')
        throw GardenError.BadRequest('This action must be done by the garden owner!');

      const relation = new RemoveUserFromGardenDto(req.body);
      const removedUserGarden =
        await UserGardenSharedController.getGardenManageService().removeUserFromGarden(relation);

      res.status(StatusCodes.OK).json(removedUserGarden);
    } catch (error) {
      next(error);
    }
  };

  updateUserRoleOfGarden = async (req, res, next) => {
    try {
      if (req.currentUser.id === req.user_id)
        throw UserError.BadRequest('You cannot change your admin role');
      const currentUser = new GetUserOfGardenDto({
        garden_id: req.params.garden_id,
        user_id: req.currentUser.id,
      });
      const userRole =
        await UserGardenSharedController.getGardenManageService().getUserRoleOfGarden(currentUser);
      if (userRole !== 'admin')
        throw GardenError.BadRequest('This action must be done by the garden owner!');

      const relation = new UpdateUserRoleDto(req.body);
      const updatedUserGarden =
        await UserGardenSharedController.getGardenManageService().updateUserRoleOfGarden(relation);

      res.status(StatusCodes.OK).json(updatedUserGarden);
    } catch (error) {
      next(error);
    }
  };

  getUserRoleOfGarden = async (req, res, next) => {
    try {
      const relation = new GetUserOfGardenDto({
        garden_id: req.params.garden_id,
        user_id: req.currentUser.id,
      });

      const userRole =
        await UserGardenSharedController.getGardenManageService().getUserRoleOfGarden(relation);

      res.status(StatusCodes.OK).json(userRole);
    } catch (error) {
      next(error);
    }
  };

  getAllUsersInGarden = async (req, res, next) => {
    try {
      const users = UserGardenSharedController.getGardenManageService().getUserByGardenId(
        req.params.garden_id,
      );
      const usersInfo = [];
      for (const user of users) {
        usersInfo.push(await UserGardenSharedController.getUserService().getUserByID(user.user_id));
      }
      res.status(StatusCodes.OK).json(usersInfo);
    } catch (error) {
      next(error);
    }
  };
}
