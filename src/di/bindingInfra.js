import { UserRepository } from '../infrastructure/repository/userRepository.js';
import { GardenRepository } from '../infrastructure/repository/GardenRepository.js';
import { DeviceRepository } from '../infrastructure/repository/DeviceRepository.js';
import { UserGardenRepository } from '../infrastructure/repository/userGardenRepository.js';
import { TYPES } from './types.js';

export const registerInfra = (container) => {
  container.bind(TYPES.UserRepository).toConstantValue(UserRepository);
  container.bind(TYPES.GardenRepository).toConstantValue(GardenRepository);
  container.bind(TYPES.DeviceRepository).toConstantValue(DeviceRepository);
  container.bind(TYPES.UserGardenRepository).toConstantValue(UserGardenRepository);
};
