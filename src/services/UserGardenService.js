import { GardenError } from '../errors/GardenError.js';
import { UserError } from '../errors/UserError.js';
import { UserGarden } from '../domains/entities/UserGarden.js';
import { UserGardenInfoDto, UserGardenRelationDto } from '../dtos/UserGarden.dto.js';

export class UserGardenService {
  constructor(userGardenRepository, userService, gardenService) {
    this.userGardenRepository = userGardenRepository;
    this.userService = userService;
    this.gardenService = gardenService;
  }

  addUserToGarden = async (GardenUsersRelationDto) => {
    const garden = await this.gardenService.getGardenByID(GardenUsersRelationDto.garden_id);
    if (!garden) throw GardenError.NotFound('Garden is not exist!');

    const userOfGarden = await this.userGardenRepository.get({
      user_id: GardenUsersRelationDto.user_id,
      garden_id: GardenUsersRelationDto.garden_id,
    });
    if (userOfGarden && userOfGarden.length > 0)
      throw UserError.NotFound('User already belong to garden!');

    const userGarden = new UserGarden(GardenUsersRelationDto);
    const newUserOfGarden = await this.userGardenRepository.create(userGarden);
    return new UserGardenRelationDto(newUserOfGarden);
  };

  getGardenByUserId = async (userId) => {
    await this.userService.getUserByID(userId);

    const relations = await this.userGardenRepository.get({ user_id: userId });
    const gardens = [];
    for (const relation of relations) {
      gardens.push(await this.gardenService.getGardenByID(relation.garden_id));
    }
    return gardens;
  };

  getUserByGardenId = async (gardenId) => {
    const garden = await this.gardenService.getGardenByID(gardenId);
    if (!garden) throw UserError.NotFound('Garden not exist!');

    const usersOfGarden = await this.userGardenRepository.get({ garden_id: gardenId });
    const usersInfo = [];
    for (const relation of usersOfGarden) {
      const userInfo = await this.userService.getUserByID(relation.user_id);
      usersInfo.push(
        new UserGardenInfoDto({
          user: userInfo,
          role: relation.role,
        }),
      );
    }
    return usersInfo;
  };

  getUserRoleOfGarden = async (GardenUserDto) => {
    const userOfGarden = await this.userGardenRepository.get({
      user_id: GardenUserDto.user_id,
      garden_id: GardenUserDto.garden_id,
    });
    if (!userOfGarden || userOfGarden.length === 0)
      throw UserError.NotFound('User not belong to garden!');
    const [info] = userOfGarden;
    return info.role;
  };

  removeUserFromGarden = async (GardenUserDto) => {
    const affectedCount = await this.userGardenRepository.delete({
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
    const sucess = await this.userGardenRepository.update(newUpdate, {
      user_id: GardenUsersRelationDto.user_id,
      garden_id: GardenUsersRelationDto.garden_id,
    });
    if (!sucess) throw UserError.NotFound('User not found or cannot update role!');
    return { status: 'success', message: `Update user role sucessfully!` };
  };
}
