import { GardenError } from '../../errors/GardenError.js';
import { Name } from '../value_objets/Name.js';
import { Entities } from './Entities.js';
import { v4 as uuidv4 } from 'uuid';

export class Garden extends Entities {
  constructor(gardenProps) {
    super()
    this.id = gardenProps?.id ? gardenProps.id : undefined;
    this.name = gardenProps?.name ? new Name(gardenProps.name) : undefined;
    this.createdAt = gardenProps?.createdAt ? gardenProps.createdAt : undefined;
    this.updatedAt = gardenProps?.updatedAt ? gardenProps.updatedAt : undefined;
    if (this.id === undefined) throw GardenError.DomainError('Garden entity error - no id');
    if (this.name === undefined) this.name = new Name('garden' + Date.now());
  }
}
