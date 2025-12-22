import { UserRepository } from '../infrastructure/persistence/sequelize/repository/UserRepository.js';
import { GardenRepository } from '../infrastructure/persistence/sequelize/repository/GardenRepository.js';
import { DeviceRepository } from '../infrastructure/persistence/sequelize/repository/DeviceRepository.js';
import { UserGardenRepository } from '../infrastructure/persistence/sequelize/repository/userGardenRepository.js';
import { TYPES } from './types.js';
import { Container } from 'inversify';
import { config } from '../config/Env.js';

const DB_ADAPTER = config.DATABASE.ADAPTER;
console.log(DB_ADAPTER);

const databaseORMType = {
  sequelize: UserRepository,
  // mongo: UserRepositoryMongo,
};

const bindRepo = (container, typeSymbol) => {
  const RepoClass = databaseORMType[DB_ADAPTER];
  if (!RepoClass) throw new Error(`No repository for DB_ADAPTER=${DB_ADAPTER}`);

  container.bind(typeSymbol).toConstantValue(new RepoClass());
};

const registerInfra = (container) => {
  bindRepo(container, TYPES.UserRepository);
  bindRepo(container, TYPES.GardenRepository);
  bindRepo(container, TYPES.DeviceRepository);
  bindRepo(container, TYPES.UserGardenRepository);
};

const repositoryManage = new Container();
registerInfra(repositoryManage);

export { repositoryManage };
