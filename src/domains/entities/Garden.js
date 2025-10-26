import { GardenError } from '../../errors/GardenError.js';
import { Name } from '../value_objets/Name.js';
import { Entities } from './Entities.js';

export class Garden extends Entities{
  constructor(gardenProps) {
    try {
      super();
      this.id = gardenProps?.id ? gardenProps.id : undefined;
      this.name = gardenProps?.name ? new Name(gardenProps.name): undefined;
      this.createdAt = gardenProps?.createdAt ? gardenProps.createdAt : undefined;
      this.updatedAt = gardenProps?.updatedAt ? gardenProps.updatedAt : undefined;
    } catch (error) {
      throw GardenError.Validation(error);
    }
  }
}
