import { UserGardenRepository } from '../infrastructure/repository/userGardenRepository.js';
import { GardenRepository } from '../infrastructure/repository/GardenRepository.js';
import { UserRepository } from '../infrastructure/repository/userRepository.js';
import { HandleServerError } from '../errors/ServerError.js';
import { GardenError } from '../errors/GardenError.js';
import { UserError } from '../errors/UserError.js';
import { UserGarden } from '../domains/entities/UserGarden.js';
import { AddUserToGardenDto, UserGardenRelationDto } from '../dtos/UserGarden.dto.js';

const gardenRepository = new GardenRepository();
const userGardenRepository = new UserGardenRepository();
const userRepository = new UserRepository();

export class GardenManageService {
  addUserToGarden = async (GardenUsersRelationDto) => {
    try {
      const garden = await gardenRepository.getByID(GardenUsersRelationDto.garden_id);
      if (!garden) throw GardenError.NotFound('Garden is not exist!');
      const userOfGarden = await userGardenRepository.get({
        user_id: GardenUsersRelationDto.user_id,
        garden_id: GardenUsersRelationDto.garden_id,
      });
      if (userOfGarden) throw UserError.NotFound('User already belong to garden!');

      const userGarden = new UserGarden(GardenUsersRelationDto);
      const newUserOfGarden = await userGardenRepository.create(userGarden);
      return new UserGardenRelationDto(newUserOfGarden);
    } catch (error) {
      HandleServerError(error);
    }
  };

  getGardenByUserId = async (userId) => {
    try {
      const user = userRepository.getByID(userId);
      if (!user) throw UserError.NotFound('User not exist!');

      const gardensOfUser = await userGardenRepository.get({ user_id: userId });
      return gardensOfUser.map((r) => new UserGardenRelationDto(r));
    } catch (error) {
      HandleServerError(error);
    }
  };

  getUserByGardenId = async (gardenId) => {
    try {
      const garden = await gardenRepository.getByID(gardenId);
      if (!garden) throw UserError.NotFound('Garden not exist!');

      const usersOfGarden = await userGardenRepository.get({ garden_id: gardenId });
      return usersOfGarden.map((r) => new UserGardenRelationDto(r));
    } catch (error) {
      HandleServerError(error);
    }
  };

  getUserRoleOfGarden = async (GardenUserDto) => {
    try {
      const userOfGarden = await userGardenRepository.get({
        user_id: GardenUserDto.user_id,
        garden_id: GardenUserDto.garden_id,
      });
      if (!userOfGarden || userOfGarden.length === 0)
        throw UserError.NotFound('User not belong to garden!');
      const [info] = userOfGarden;
      return info.role;
    } catch (error) {
      HandleServerError(error);
    }
  };

  removeUserFromGarden = async (GardenUserDto) => {
    try {
      const affectedCount = await userGardenRepository.delete({
        user_id: GardenUserDto.user_id,
        garden_id: GardenUserDto.garden_id,
      });
      if (!affectedCount) {
        throw UserError.NotFound('User not belong to garden!');
      }
      return {
        status: 'success',
        message: `Deleted user ${GardenUserDto.user_id} from garden ${GardenUserDto.garden_id}`,
      };
    } catch (error) {
      HandleServerError(error);
    }
  };

  updateUserRoleOfGarden = async (GardenUsersRelationDto) => {
    try {
      const newUpdate = new UserGarden(GardenUsersRelationDto);
      const sucess = await userGardenRepository.update(newUpdate, {
        user_id: GardenUsersRelationDto.user_id,
        garden_id: GardenUsersRelationDto.garden_id,
      });
      if (!sucess) throw UserError.NotFound('User not found or cannot update role!');
      return { status: 'success', message: `Update user role sucessfully!` };
    } catch (error) {
      HandleServerError(error);
    }
  };

  static instance = null;
  static getInstance() {
    if (!GardenManageService.instance) {
      GardenManageService.instance = new GardenManageService();
    }
    return GardenManageService.instance;
  }
}
