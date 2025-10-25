import { GardenError } from '../../errors/GardenError.js';
import { Name } from '../value_objets/Name.js';

export class Garden {
  constructor(gardenProps) {
    try {
      this.name = gardenProps?.name ? new Name(gardenProps.name).value : undefined;
      this.createAt = gardenProps?.createAt ? gardenProps.createAt : undefined;
      this.updatedAt = gardenProps?.updatedAt ? gardenProps.updatedAt : undefined;
    } catch (error) {
      throw GardenError.Validation(error);
    }
  }
}
