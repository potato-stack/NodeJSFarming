import { GardenError } from '../errors/GardenError.js';
import { Garden } from '../domains/entities/Garden.js';
import { GardenInfoDto } from '../dtos/Garden.dto.js';

export class GardenService {
  constructor(gardenRepository) {
    this.gardenRepository = gardenRepository;
  }

  async getGardenByID(id) {
    const garden = await this.gardenRepository.getByID(id);
    if (!garden) {
      throw GardenError.NotFound(`Garden with ID ${id} not found`);
    }
    return new GardenInfoDto(garden);
  }

  async getAllGardens() {
    const gardens = await this.gardenRepository.get();
    return gardens.map((r) => new GardenInfoDto(r));
  }

  async updateGarden(updateGardenDto) {
    const garden = new Garden(updateGardenDto);
    const id = updateGardenDto.id;
    const affectedCount = await this.gardenRepository.update(garden, { id: id });
    if (!affectedCount) {
      throw GardenError.NotFound(`Garden with ID ${id} not found`);
    }
    return { status: 'success', message: `Garden with ID ${id} updated successfully` };
  }

  async deleteGarden(id) {
    const affectedCount = await this.gardenRepository.delete({ id: id });

    if (affectedCount === 0) {
      throw GardenError.NotFound();
    }
    return { status: 'success', message: `Garden of id: ${id} is deleted sucessfully` };
  }
}
