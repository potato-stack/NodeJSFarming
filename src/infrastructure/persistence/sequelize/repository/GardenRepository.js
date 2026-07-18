import { BaseRepository } from './Repository.js';
import { Garden } from '../../../../domains/entities/Garden.js';
import { Gardens } from '../SequelizeIndex.js';

export class GardenRepository extends BaseRepository {
  constructor() {
    super(Gardens, Garden);
  }
}
