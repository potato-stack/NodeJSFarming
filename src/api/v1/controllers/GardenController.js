import { StatusCodes } from 'http-status-codes';
import { CreateGardenDto, updateGardenDto } from '../../../dtos/Garden.dto.js';
import { AddUserToGardenDto, GetUserOfGardenDto } from '../../../dtos/UserGarden.dto.js';
import { GardenError } from '../../../errors/GardenError.js';
export class GardenController {
  constructor(gardenService, userGardenService) {
    this.gardenService = gardenService;
    this.userGardenService = userGardenService;
  }

  createGarden = async (req, res, next) => {
    try {
      // Mappers
      const garden = new CreateGardenDto(req.body);
      const currentUserId = req.currentUser.id;
      const createdGarden = await this.gardenService.createGarden(garden);
      const relation = new AddUserToGardenDto({
        garden_id: createdGarden.id,
        user_id: currentUserId,
        role: 'owner',
      });
      const createdUserGarden = await this.userGardenService.addUserToGarden(relation);

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
      const role = await this.userGardenService.getUserRoleOfGarden(relation);
      if (!role) throw GardenError.BadRequest('Not a member');
      const gardenInfo = await this.gardenService.getGardenByID(req.params.garden_id);
      res.status(StatusCodes.CREATED).json({ ...gardenInfo, role });
    } catch (error) {
      // Bubble up the error
      next(error);
    }
  };

  getAllGardens = async (req, res, next) => {
    try {
      const gardens = await this.gardenService.getAllGardens();
      res.status(StatusCodes.OK).json(gardens);
    } catch (error) {
      next(error);
    }
  };

  updateGarden = async (req, res, next) => {
    try {
      const newGarden = new updateGardenDto({ name: req.body.name, id: req.params.garden_id });
      const response = await this.gardenService.updateGarden(newGarden);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  deleteGarden = async (req, res, next) => {
    try {
      const response = await this.gardenService.deleteGarden(req.params.garden_id);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };
}
