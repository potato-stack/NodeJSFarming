import { UserGardenRepository } from '../infrastructure/repository/UserGardenRepository.js';
import { GardenRepository } from '../infrastructure/repository/GardenRepository.js';
import { UserRepository } from '../infrastructure/repository/UserRepository.js';
import { HandleServerError } from '../errors/ServerError.js';
import { GardenError } from '../errors/GardenError.js';
import { UserError } from '../errors/UserError.js';

export class GardenManageService {
  addUserToGarden = async (userId, gardenId, role) => {
    try {
      const garden = GardenRepository.getByID(gardenId);
      if (!garden) throw GardenError.NotFound('Garden is not exist!');
      const userOfGarden = UserGardenRepository.get({ user_id: userId, garden_id: gardenId });
      if (userOfGarden) throw UserError.NotFound('User already belong to garden!');

      return await UserGardenRepository.create({ userId, gardenId, role });
    } catch (error) {
      HandleServerError(error);
    }
  };

  getGardenByUserId = async (userId) => {
    try {
      const user = UserRepository.getByID(userId);
      if (!user) throw UserError.NotFound('User not exist!');

      const gardensOfUser = UserGardenRepository.get({ user_id: userId });
      return gardensOfUser;
    } catch (error) {
      HandleServerError(error);
    }
  };

  getUserOfGardenRole = async (gardenId, userId) => {
    try {
      const userOfGarden = UserGardenRepository.get({ user_id: userId, garden_id: gardenId });
      if (!userOfGarden) throw UserError.NotFound('User not belong to garden!');
      return userOfGarden.role;
    } catch (error) {
      HandleServerError(error);
    }
  };

  removeUserFromGarden = async (gardenId, userId) => {
    try {
      const affectedCount = UserGardenRepository.delete({ user_id: userId, garden_id: gardenId });
      if (affectedCount === 0) {
        throw UserError.NotFound('User not belong to garden!');
      }
    } catch (error) {
      HandleServerError(error);
    }
  };

  updateUserRoleOfGarden = async (gardenId, userId, role) => {
    try {
      const [affectedCount] = await UserGardenRepository.update(
        { role: role },
        { where: { user_id: userId, garden_id: gardenId } },
      );
      if (affectedCount === 0) throw UserError.NotFound('User not found or cannot update role!');
    } catch (error) {
      HandleServerError(error);
    }
  };
}
