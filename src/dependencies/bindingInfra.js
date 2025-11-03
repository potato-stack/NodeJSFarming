import { UserRepository } from '../infrastructure/repository/userRepository.js';
import { GardenRepository } from '../infrastructure/repository/GardenRepository.js';
import { DeviceRepository } from '../infrastructure/repository/DeviceRepository.js';
import { UserGardenRepository } from '../infrastructure/repository/userGardenRepository.js';
import { TYPES } from './types.js';
import { Container } from 'inversify';

const registerInfra = (container) => {
  container.bind(TYPES.UserRepository).toConstantValue(new UserRepository());
  container.bind(TYPES.GardenRepository).toConstantValue(new GardenRepository());
  container.bind(TYPES.DeviceRepository).toConstantValue(new DeviceRepository());
  container.bind(TYPES.UserGardenRepository).toConstantValue(new UserGardenRepository());
};

const repositoryManage = new Container();
registerInfra(repositoryManage);

export { repositoryManage };
