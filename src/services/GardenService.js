import { GardenError } from '../errors/GardenError.js';
import { Garden } from '../domains/entities/Garden.js';
import { GardenInfoDto } from '../dtos/Garden.dto.js';
import { dependencies } from '../di/container.js';
import { TYPES } from '../di/types.js';

const gardenRepository = dependencies.get(TYPES.GardenRepository);

export class GardenServices {
  async createGarden(createGardenDto) {
    const garden = new Garden(createGardenDto);
    const newGarden = await gardenRepository.create(garden);
    return new GardenInfoDto(newGarden);
  }

  async getGardenByID(id) {
    const garden = await gardenRepository.getByID(id);
    if (!garden) {
      throw GardenError.NotFound(`Garden with ID ${id} not found`);
    }
    return new GardenInfoDto(garden);
  }

  async getAllGardens() {
    const gardens = await gardenRepository.get();
    return gardens.map((r) => new GardenInfoDto(r));
  }

  async updateGarden(updateGardenDto) {
    const garden = new Garden(updateGardenDto);
    const id = updateGardenDto.id;
    const affectedCount = await gardenRepository.update(garden, { id: id });
    if (!affectedCount) {
      throw GardenError.NotFound(`Garden with ID ${id} not found`);
    }
    return { status: 'success', message: `Garden with ID ${id} updated successfully` };
  }

  async deleteGarden(id) {
    const affectedCount = await gardenRepository.delete({ id: id });

    if (affectedCount === 0) {
      throw GardenError.NotFound();
    }
    return { status: 'success', message: `Garden of id: ${id} is deleted sucessfully` };
  }

  static instance = null;
  static getInstance() {
    if (!GardenServices.instance) {
      GardenServices.instance = new GardenServices();
    }
    return GardenServices.instance;
  }
}
