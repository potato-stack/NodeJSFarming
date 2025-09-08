import { UserGardens } from '../persistence/sequelize/SequelizeIndex.js';
import { UserGarden } from '../../domains/entities/UserGarden.js';
import { BaseRepository } from './Repository.js';

export class UserGardenRepository extends BaseRepository {
  constructor() {
    super(UserGardens, UserGarden);
  }

  getByID = async (id) => {
    throw new Error("getById is not supported for UserGardens (composite key)");
  }
}
