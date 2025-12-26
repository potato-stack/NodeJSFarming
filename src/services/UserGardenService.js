import { GardenError } from '../errors/GardenError.js';
import { UserError } from '../errors/UserError.js';
import { UserGarden } from '../domains/entities/UserGarden.js';
import { UserGardenRelationDto } from '../dtos/UserGarden.dto.js';
import { repositoryManage } from '../dependencies/bindingInfra.js';
import { TYPES } from '../dependencies/types.js';

const gardenRepository = repositoryManage.get(TYPES.GardenRepository);
const userGardenRepository = repositoryManage.get(TYPES.UserGardenRepository);
const userRepository = repositoryManage.get(TYPES.UserRepository);

export class GardenManageService {
  addUserToGarden = async (GardenUsersRelationDto) => {
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
  };

  getGardenByUserId = async (userId) => {
    const user = userRepository.getByID(userId);
    if (!user) throw UserError.NotFound('User not exist!');

    const gardensOfUser = await userGardenRepository.get({ user_id: userId });
    return gardensOfUser.map((r) => new UserGardenRelationDto(r));
  };

  getUserByGardenId = async (gardenId) => {
    const garden = await gardenRepository.getByID(gardenId);
    if (!garden) throw UserError.NotFound('Garden not exist!');

    const usersOfGarden = await userGardenRepository.get({ garden_id: gardenId });
    return usersOfGarden.map((r) => new UserGardenRelationDto(r));
  };

  getUserRoleOfGarden = async (GardenUserDto) => {
    const userOfGarden = await userGardenRepository.get({
      user_id: GardenUserDto.user_id,
      garden_id: GardenUserDto.garden_id,
    });
    if (!userOfGarden || userOfGarden.length === 0)
      throw UserError.NotFound('User not belong to garden!');
    const [info] = userOfGarden;
    return info.role;
  };

  removeUserFromGarden = async (GardenUserDto) => {
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
  };

  updateUserRoleOfGarden = async (GardenUsersRelationDto) => {
    const newUpdate = new UserGarden(GardenUsersRelationDto);
    const sucess = await userGardenRepository.update(newUpdate, {
      user_id: GardenUsersRelationDto.user_id,
      garden_id: GardenUsersRelationDto.garden_id,
    });
    if (!sucess) throw UserError.NotFound('User not found or cannot update role!');
    return { status: 'success', message: `Update user role sucessfully!` };
  };

  static instance = null;
  static getInstance() {
    if (!GardenManageService.instance) {
      GardenManageService.instance = new GardenManageService();
    }
    return GardenManageService.instance;
  }
}
