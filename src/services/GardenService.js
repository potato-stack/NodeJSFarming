import { GardenRepository } from '../infrastructure/repository/GardenRepository.js';
import { GardenError } from '../errors/GardenError.js';
import { HandleServerError } from '../errors/ServerError.js';
import { Garden } from '../domains/entities/Garden.js';
import { GardenInfoDto } from '../dtos/Garden.dto.js';

const gardenRepository = new GardenRepository();

export class GardenServices {
  async createGarden(createGardenDto) {
	try {
	  const garden = new Garden(createGardenDto);
	  const newGarden = await gardenRepository.create(garden);
	  return new GardenInfoDto(newGarden);
	} catch (error) {
	  if (error.name === 'SequelizeUniqueConstraintError') throw GardenError.Conflict();
	  HandleServerError(error);
	}
  }

  async getGardenByID(id) {
	try {
	  const garden = await gardenRepository.getByID(id);
	  if (!garden) {
		throw GardenError.NotFound(`Garden with ID ${id} not found`);
	  }
	  return new GardenInfoDto(garden);
	} catch (error) {
	  HandleServerError(error);
	}
  }

  async getAllGardens() {
	try {
	  const gardens = await gardenRepository.get();
	  return gardens.map((r) => new GardenInfoDto(r));
	} catch (error) {
	  HandleServerError(error);
	}
  }

  async updateGarden(updateGardenDto) {
	try {
	  const garden = new Garden(updateGardenDto);
	  const targetId = updateGardenDto.targetId;
	  const affectedCount = await gardenRepository.update(garden, {id: targetId});
	  if (!affectedCount) {
		throw GardenError.NotFound(`Garden with ID ${targetId} not found`);
	  }
	  return { status: 'success', message: `Garden with ID ${targetId} updated successfully` };
	} catch (error) {
	  HandleServerError(error);
	}
  }

  async deleteGarden(id) {
	try {
	  const affectedCount = await gardenRepository.delete({id: id});

	  if (affectedCount === 0) {
		throw GardenError.NotFound();
	  }
	  return { status: 'success', message: `Garden of id: ${id} is deleted sucessfully` };
	} catch (error) {
	  HandleServerError(error);
	}
  }
}
