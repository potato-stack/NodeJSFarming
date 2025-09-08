import { GardenRepository } from '../infrastructure/repository/GardenRepository.js';
import { GardenError } from '../errors/GardenError.js';
import { HandleServerError } from '../errors/ServerError.js';
import { Garden } from '../domains/entities/Garden.js';

const gardenRepository = new GardenRepository();

export class TelemetryServices {
  async createGarden(createGardenDto) {
	try {
	  const garden = new Garden(createGardenDto);
	  return await gardenRepository.create(garden);
	} catch (error) {
	  if (error.name === 'SequelizeUniqueConstraintError') throw GardenError.Conflict();
	  HandleServerError(error);
	}
  }

  async getGardenByID(getGardenDto) {
	try {
	  const id = getGardenDto.id;
	  const garden = await gardenRepository.getByID(id);
	  if (!garden) {
		throw GardenError.NotFound(`Garden with ID ${id} not found`);
	  }
	  return garden;
	} catch (error) {
	  HandleServerError(error);
	}
  }

  async getAllGardens() {
	try {
	  const gardens = await gardenRepository.get();
	  return gardens;
	} catch (error) {
	  HandleServerError(error);
	}
  }

  async updateGarden(updateGardenDto) {
	try {
	  const garden = new Garden(updateGardenDto);
	  const targetId = updateGardenDto.id;
	  const [affectedCount] = await gardenRepository.update(garden, {id: targetId});
	  if (affectedCount === 0) {
		throw GardenError.NotFound(`Garden with ID ${id} not found`);
	  }
	  return { status: 'success', message: `Garden with ID ${id} updated successfully` };
	} catch (error) {
	  HandleServerError(error);
	}
  }

  async deleteDevice(id) {
	try {
	  const affectedCount = await gardenRepository.delete(id);

	  if (affectedCount === 0) {
		throw GardenError.NotFound();
	  }
	  return { status: 'success', message: `Garden of id: ${id} is deleted sucessfully` };
	} catch (error) {
	  HandleServerError(error);
	}
  }
}
