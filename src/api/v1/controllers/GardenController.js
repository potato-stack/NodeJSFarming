import { StatusCodes } from 'http-status-codes';
import { CreateGardenDto, updateGardenDto } from '../../../dtos/Garden.dto.js';
import { AddUserToGardenDto, GetUserOfGardenDto } from '../../../dtos/UserGarden.dto.js';
import { GardenError } from '../../../errors/GardenError.js';
import { serviceManage } from '../../../dependencies/bindingService.js';
import { TYPES } from '../../../dependencies/types.js';

const gardenManageService = serviceManage.get(TYPES.GardenManageService);
const gardenServices = serviceManage.get(TYPES.GardenServices);

export class GardenController {
  createGarden = async (req, res, next) => {
    try {
      // Mappers
      const garden = new CreateGardenDto(req.body);
      const currentUserId = req.currentUser.id;
      const createdGarden = await gardenServices.createGarden(garden);
      const relation = new AddUserToGardenDto({
        garden_id: createdGarden.id,
        user_id: currentUserId,
        role: 'owner',
      });
      const createdUserGarden = await gardenManageService.addUserToGarden(relation);

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
        garden_id: req.params.garden_id,
        user_id: req.currentUser.id,
      });
      const role = await gardenManageService.getUserRoleOfGarden(relation);
      if (!role) throw GardenError.BadRequest('Not a member');
      const gardenInfo = await gardenServices.getGardenByID(req.params.garden_id);
      res.status(StatusCodes.CREATED).json({ ...gardenInfo, role });
    } catch (error) {
      // Bubble up the error
      next(error);
    }
  };

  getAllGardens = async (req, res, next) => {
    try {
      const gardens = await gardenServices.getAllGardens();
      res.status(StatusCodes.OK).json(gardens);
    } catch (error) {
      next(error);
    }
  };

  getGardensOfCurrentUser = async (req, res, next) => {
    try {
      const gardens = await gardenManageService.getGardenByUserId(req.currentUser.id);
      const gardensInfo = [];
      for (const garden of gardens) {
        gardensInfo.push(await gardenServices.getGardenByID(garden.garden_id));
      }
      res.status(StatusCodes.OK).json(gardensInfo);
    } catch (error) {
      next(error);
    }
  };

  updateGarden = async (req, res, next) => {
    try {
      const newGarden = new updateGardenDto({ name: req.body.name, id: req.params.garden_id });
      const response = await gardenServices.updateGarden(newGarden);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  deleteGarden = async (req, res, next) => {
    try {
      const response = await gardenServices.deleteGarden(req.params.garden_id);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };
}
