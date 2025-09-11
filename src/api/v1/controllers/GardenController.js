import { StatusCodes } from 'http-status-codes';
import { GardenManageService } from '../../../services/UserGardenService.js';
import { GardenServices } from '../../../services/GardenService.js';
import { CreateGardenDto, updateGardenDto, GardenInfoDto } from '../../../dtos/Garden.dto.js';
import {
  GardenUserDto,
  AddUserToGardenDto,
  RemoveUserFromGardenDto,
  UpdateUserRoleDto,
  GetUserOfGardenDto,
} from '../../../dtos/UserGarden.dto.js';
import { GardenError } from '../../../errors/GardenError.js';
import { UserError } from '../../../errors/UserError.js';

export class GardenController {
  static gardenServices = null;
  static gardenManageService = null;

  static getGardenService() {
    if (!GardenController.gardenServices) {
      GardenController.gardenServices = new GardenServices();
    }
    return GardenController.gardenServices;
  }

  static getGardenManageService() {
    if (!GardenController.gardenServices) {
      GardenController.gardenManageService = new GardenManageService();
    }
    return GardenController.gardenManageService;
  }

  createGarden = async (req, res, next) => {
    try {
      // Mappers
      const currentUserId = req.user.id;
      const garden = new CreateGardenDto(req.body);
      const createdGarden = await GardenController.getGardenService().createdDevice(garden);
      const relation = new AddUserToGardenDto({
        gardenId: createdGarden.id,
        userId: currentUserId,
        role: 'admin',
      });
      const createdUserGarden =
        await GardenController.getGardenManageService().addUserToGarden(relation);

      res.status(StatusCodes.CREATED).json(createdUserGarden);
    } catch (error) {
      // Bubble up the error
      next(error);
    }
  };

  addUserToGarden = async (req, res, next) => {
    try {
      if (req.user.role !== 'admin')
        throw GardenError.BadRequest('This action must be done by the garden owner!');

      const relation = new AddUserToGardenDto(req.body);
      const createdUserGarden =
        await GardenController.getGardenManageService().addUserToGarden(relation);

      res.status(StatusCodes.CREATED).json(createdUserGarden);
    } catch (error) {
      next(error);
    }
  };

  removeUserToGarden = async (req, res, next) => {
    try {
      if (req.user.role !== 'admin')
        throw GardenError.BadRequest('This action must be done by the garden owner!');

      const relation = new RemoveUserFromGardenDto(req.body);
      const removedUserGarden =
        await GardenController.getGardenManageService().removeUserFromGarden(relation);

      res.status(StatusCodes.OK).json(removedUserGarden);
    } catch (error) {
      next(error);
    }
  };

  updateUserRoleOfGarden = async (req, res, next) => {
    try {
      if (req.user.role !== 'admin')
        throw GardenError.BadRequest('This action must be done by the garden owner!');

      if (req.user.id === req.user_id)
        throw UserError.BadRequest('You cannot change your admin role');

      const relation = new UpdateUserRoleDto(req.body);
      const updatedUserGarden =
        await GardenController.getGardenManageService().updateUserRoleOfGarden(relation);

      res.status(StatusCodes.OK).json(updatedUserGarden);
    } catch (error) {
      next(error);
    }
  };

  getGardensOfUser = async (req, res, next) => {
    try {
      const relation = new GetUserOfGardenDto(req.body);

      const userGarden =
        await GardenController.getGardenManageService().getUserRoleOfGarden(relation);

      res.status(StatusCodes.OK).json(userGarden);
    } catch (error) {
      next(error);
    }
  };

  getUserRole = async (req, res, next) => {
    try {
      if (req.user.role !== 'admin')
        throw GardenError.BadRequest('This action must be done by the garden owner!');
      const gardens = await GardenController.getGardenManageService().getGardenByUserId(
        req.body.use_id,
      );
      const gardensInfo = [];
      for (const garden of gardens) {
        gardensInfo.push(await GardenController.getGardenService().getGardenByID(garden.garden_id));
      }
      res.status(StatusCodes.OK).json(gardensInfo);
    } catch (error) {
      next(error);
    }
  };
}
