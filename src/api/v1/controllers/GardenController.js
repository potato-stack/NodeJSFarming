import { StatusCodes } from 'http-status-codes';
import { GardenManageService } from '../../../services/UserGardenService.js';
import { GardenServices } from '../../../services/GardenService.js';
import { CreateGardenDto, updateGardenDto } from '../../../dtos/Garden.dto.js';
import { AddUserToGardenDto, GetUserOfGardenDto } from '../../../dtos/UserGarden.dto.js';
import { GardenError } from '../../../errors/GardenError.js';

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
    if (!GardenController.gardenManageService) {
      GardenController.gardenManageService = new GardenManageService();
    }
    return GardenController.gardenManageService;
  }

  createGarden = async (req, res, next) => {
    try {
      // Mappers
      const garden = new CreateGardenDto(req.body);
      const currentUserId = req.currentUser.id;
      const createdGarden = await GardenController.getGardenService().createGarden(garden);
      const relation = new AddUserToGardenDto({
        garden_id: createdGarden.id,
        user_id: currentUserId,
        role: 'owner',
      });
      const createdUserGarden =
        await GardenController.getGardenManageService().addUserToGarden(relation);

      res.status(StatusCodes.CREATED).json(createdUserGarden);
    } catch (error) {
      // Bubble up the error
      next(error);
    }
  };

  getGardenById = async (req, res, next) => {
    try {
      // Mappers
      const relation = new GetUserOfGardenDto({
        garden_id: req.params.id,
        user_id: req.currentUser.id,
      });
      const role = await GardenController.getGardenManageService().getUserRoleOfGarden(relation);
      if (!role) throw GardenError.BadRequest('Not a member');
      const gardenInfo = await GardenController.getGardenService().getGardenByID(req.params.id);
      res.status(StatusCodes.CREATED).json(gardenInfo);
    } catch (error) {
      // Bubble up the error
      next(error);
    }
  };

  getAllGardens = async (req, res, next) => {
    try {
      const gardens = await GardenController.getGardenService().getAllGardens();
      res.status(StatusCodes.OK).json(gardens);
    } catch (error) {
      next(error);
    }
  };

  getGardensOfCurrentUser = async (req, res, next) => {
    try {
      const gardens = await GardenController.getGardenManageService().getGardenByUserId(
        req.currentUser.id,
      );
      const gardensInfo = [];
      for (const garden of gardens) {
        gardensInfo.push(
          await GardenController.getGardenService().getGardenByID(garden.garden_id),
        );
      }
      res.status(StatusCodes.OK).json(gardensInfo);
    } catch (error) {
      next(error);
    }
  };

  updateGarden = async (req, res, next) => {
    try {
      const relation = new GetUserOfGardenDto({
        garden_id: req.params.id,
        user_id: req.currentUser.id,
      });
      const userRole =
        await GardenController.getGardenManageService().getUserRoleOfGarden(relation);
      if (userRole.value !== 'owner')
        throw GardenError.BadRequest('This action must be done by the garden owner!');

      const newGarden = new updateGardenDto({name: req.body.name, targetId: req.params.id});
      const response = await GardenController.getGardenService().updateGarden(newGarden);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  deleteGarden = async (req, res, next) => {
    try {
      const relation = new GetUserOfGardenDto({
        garden_id: req.params.id,
        user_id: req.currentUser.id,
      });
      const userRole =
      await GardenController.getGardenManageService().getUserRoleOfGarden(relation);
      if (userRole.value !== 'owner')
        throw GardenError.BadRequest('This action must be done by the garden owner!');

      const response = await GardenController.getGardenService().deleteGarden(req.params.id);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };
}
