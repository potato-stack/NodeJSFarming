import { Garden } from '../../domains/entities/Garden.js';
import { User } from '../../domains/entities/User.js';
import { UserGardens } from '../persistence/sequelize/UserGarden.js';
import { UserGarden } from '../../domains/entities/UserGarden.js';

export class BaseRepository {
  addUserToGarden = async (entity) => {
    await sequelize.sync({ force: true });
    const record = await UserGardens.create({ ...entity });
    return new GardenUser(record);
  };

  getGardensOfUser = async (userId, where = {}) => {
    if (!userId) {
      throw new Error('userId is required');
    }
    const where = { userId, ...where };
    const records = await UserGardens.findAll({ where });
	return records.length ? records.map((r) => new UserGarden(r)) : null;
  };
}
