import { UserGardenRepository } from '../infrastructure/repository/UserGardenRepository.js';
import { GardenRepository } from '../infrastructure/repository/GardenRepository.js';
import { UserRepository } from '../infrastructure/repository/UserRepository.js';
import { HandleServerError } from '../errors/ServerError.js';
import { GardenError } from '../errors/GardenError.js';
import { UserError } from '../errors/UserError.js';
import { UserGarden } from '../domains/entities/UserGarden.js';
import { AddUserToGardenDto, UserGardenRelationDto } from '../dtos/UserGarden.dto.js';

export class GardenManageService {
  addUserToGarden = async (GardenUsersRelationDto) => {
    try {
      const garden = GardenRepository.getByID(GardenUsersRelationDto.gardenId);
      if (!garden) throw GardenError.NotFound('Garden is not exist!');
      const userOfGarden = UserGardenRepository.get({
        user_id: GardenUsersRelationDto.user_id,
        garden_id: GardenUsersRelationDto.garden_id,
      });
      if (userOfGarden) throw UserError.NotFound('User already belong to garden!');

      const userGarden = new UserGarden(GardenUsersRelationDto);
      const newUserOfGarden = await UserGardenRepository.create(userGarden);
      return new UserGardenRelationDto(newUserOfGarden);
    } catch (error) {
      HandleServerError(error);
    }
  };

  getGardenByUserId = async (userId) => {
    try {
      const user = UserRepository.getByID(userId);
      if (!user) throw UserError.NotFound('User not exist!');

      const gardensOfUser = UserGardenRepository.get({ user_id: userId });
      return gardensOfUser.map((r) => new UserGardenRelationDto(gardensOfUser));
    } catch (error) {
      HandleServerError(error);
    }
  };

  getUserRoleOfGarden = async (GardenUserDto) => {
    try {
      const userOfGarden = UserGardenRepository.get({
        user_id: GardenUserDto.user_id,
        garden_id: GardenUserDto.garden_id,
      });
      if (!userOfGarden) throw UserError.NotFound('User not belong to garden!');
      return userOfGarden.role;
    } catch (error) {
      HandleServerError(error);
    }
  };

  removeUserFromGarden = async (GardenUserDto) => {
    try {
      const affectedCount = UserGardenRepository.delete({
        user_id: GardenUserDto.user_id,
        garden_id: GardenUserDto.garden_id,
      });
      if (affectedCount === 0) {
        throw UserError.NotFound('User not belong to garden!');
      }
      return { status: 'success', message: `Deleted user ${user_id} from garden ${garden_id}`};
    } catch (error) {
      HandleServerError(error);
    }
  };

  updateUserRoleOfGarden = async (GardenUsersRelationDto) => {
    try {
      const newUpdate = new UserGarden(GardenUsersRelationDto);
      const [affectedCount] = await UserGardenRepository.update(newUpdate, {
        user_id: GardenUsersRelationDto.user_id,
        garden_id: GardenUsersRelationDto.garden_id,
      });
      if (affectedCount === 0) throw UserError.NotFound('User not found or cannot update role!');
      return { status: 'success', message: `Update user ${user_id} from garden ${garden_id}`};
    } catch (error) {
      HandleServerError(error);
    }
  };
}
