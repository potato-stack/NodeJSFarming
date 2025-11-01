import { StatusCodes } from 'http-status-codes';
import { GardenManageService } from '../../../services/UserGardenService.js';
import { GardenServices } from '../../../services/GardenService.js';
import { CreateGardenDto, updateGardenDto } from '../../../dtos/Garden.dto.js';
import { AddUserToGardenDto, GetUserOfGardenDto } from '../../../dtos/UserGarden.dto.js';
import { GardenError } from '../../../errors/GardenError.js';

export class GardenController {
  createGarden = async (req, res, next) => {
    try {
      // Mappers
      const garden = new CreateGardenDto(req.body);
      const currentUserId = req.currentUser.id;
      const createdGarden = await GardenServices.getInstance().createGarden(garden);
      const relation = new AddUserToGardenDto({
        garden_id: createdGarden.id,
        user_id: currentUserId,
        role: 'owner',
      });
      const createdUserGarden =
        await GardenManageService.getInstance().addUserToGarden(relation);

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
      const role = await GardenManageService.getInstance().getUserRoleOfGarden(relation);
      if (!role) throw GardenError.BadRequest('Not a member');
      const gardenInfo = await GardenServices.getInstance().getGardenByID(req.params.garden_id);
      res.status(StatusCodes.CREATED).json({...gardenInfo, role});
    } catch (error) {
      // Bubble up the error
      next(error);
    }
  };

  getAllGardens = async (req, res, next) => {
    try {
      const gardens = await GardenServices.getInstance().getAllGardens();
      res.status(StatusCodes.OK).json(gardens);
    } catch (error) {
      next(error);
    }
  };

  getGardensOfCurrentUser = async (req, res, next) => {
    try {
      const gardens = await GardenManageService.getInstance().getGardenByUserId(
        req.currentUser.id,
      );
      const gardensInfo = [];
      for (const garden of gardens) {
        gardensInfo.push(await GardenServices.getInstance().getGardenByID(garden.garden_id));
      }
      res.status(StatusCodes.OK).json(gardensInfo);
    } catch (error) {
      next(error);
    }
  };

  updateGarden = async (req, res, next) => {
    try {
      const newGarden = new updateGardenDto({ name: req.body.name, id: req.params.garden_id });
      const response = await GardenServices.getInstance().updateGarden(newGarden);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  deleteGarden = async (req, res, next) => {
    try {
      const response = await GardenServices.getInstance().deleteGarden(req.params.garden_id);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };
}
