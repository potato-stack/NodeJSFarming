import { StatusCodes } from 'http-status-codes';
import { GardenManageService } from '../../../services/UserGardenService.js';
import { UsersService } from '../../../services/UserService.js';
import {
  AddUserToGardenDto,
  RemoveUserFromGardenDto,
  UpdateUserRoleDto,
  GetUserOfGardenDto,
  UserGardenInfoDto,
} from '../../../dtos/UserGarden.dto.js';
import { GardenError } from '../../../errors/GardenError.js';
import { UserError } from '../../../errors/UserError.js';

export class UserGardenSharedController {
  addUserToGarden = async (req, res, next) => {
    try {
      const dto = new GetUserOfGardenDto({
        garden_id: req.params.garden_id,
        user_id: req.currentUser.id,
      });
      const userRole =
        await GardenManageService.getInstance().getUserRoleOfGarden(dto);
      if (userRole.value !== 'owner')
        throw GardenError.BadRequest('This action must be done by the garden owner!');

      const relation = new AddUserToGardenDto({
        user_id: req.body.user_id,
        garden_id: req.params.garden_id,
        role: req.body.role,
      });
      const createdUserGarden =
        await GardenManageService.getInstance().addUserToGarden(relation);

      res.status(StatusCodes.CREATED).json(createdUserGarden);
    } catch (error) {
      next(error);
    }
  };

  removeUserFromGarden = async (req, res, next) => {
    try {
      const dto = new GetUserOfGardenDto({
        garden_id: req.params.garden_id,
        user_id: req.currentUser.id,
      });
      const userRole =
        await GardenManageService.getInstance().getUserRoleOfGarden(dto);
      if (userRole.value !== 'owner')
        throw GardenError.BadRequest('This action must be done by the garden owner!');

      const relation = new RemoveUserFromGardenDto({
        garden_id: req.params.garden_id,
        user_id: req.params.user_id,
      });
      if (dto.user_id == relation.user_id)
        throw GardenError.BadRequest('You cannot remove yourself from your garden.');
      const removedUserGarden =
        await GardenManageService.getInstance().removeUserFromGarden(relation);

      res.status(StatusCodes.OK).json(removedUserGarden);
    } catch (error) {
      next(error);
    }
  };

  updateUserRoleOfGarden = async (req, res, next) => {
    try {
      if (req.currentUser.id === req.user_id)
        throw UserError.BadRequest('You cannot change your admin role');
      const dto = new GetUserOfGardenDto({
        garden_id: req.params.garden_id,
        user_id: req.currentUser.id,
      });
      const userRole =
        await GardenManageService.getInstance().getUserRoleOfGarden(dto);
      if (userRole.value !== 'owner')
        throw GardenError.BadRequest('This action must be done by the garden owner!');

      const relation = new UpdateUserRoleDto({
        garden_id: req.params.garden_id,
        user_id: req.params.user_id,
        role: req.body.role,
      });
      const updatedUserGarden =
        await GardenManageService.getInstance().updateUserRoleOfGarden(relation);

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
      const userRole =
        await GardenManageService.getInstance().getUserRoleOfGarden(relation);

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
      const userRole =
        await GardenManageService.getInstance().getUserRoleOfGarden(relation);

      res.status(StatusCodes.OK).json(userRole);
    } catch (error) {
      next(error);
    }
  };

  getAllUsersInGarden = async (req, res, next) => {
    try {
      const users = await GardenManageService.getInstance().getUserByGardenId(
        req.params.garden_id,
      );
      const usersInfo = [];
      for (const user of users) {
        const info = {
          ...(await UsersService.getInstance().getUserByID(user.user_id)),
          role: user.role,
        };
        usersInfo.push(info);
      }
      res.status(StatusCodes.OK).json(usersInfo);
    } catch (error) {
      next(error);
    }
  };
}
