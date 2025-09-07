import { GardenError } from '../../errors/GardenError.js';
import { Name } from '../value_objets/Name.js';

export class Garden {
  constructor(createUserDto) {
    try {
      this.name = new Name(createUserDto.name).value;
    } catch (error) {
      throw GardenError.Validation(error);
    }
  }
}
