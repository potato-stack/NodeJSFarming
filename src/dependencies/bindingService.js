import { Container } from 'inversify';
import { GardenServices } from '../services/GardenService.js';
import { TelemetryServices } from '../services/TelemetryService.js';
import { GardenManageService } from '../services/UserGardenService.js';
import { UsersService } from '../services/UserService.js';
import { TYPES } from './types.js';

const registerService = (container) => {
  container.bind(TYPES.UsersService).toConstantValue(new UsersService());
  container.bind(TYPES.GardenServices).toConstantValue(new GardenServices());
  container.bind(TYPES.TelemetryServices).toConstantValue(new TelemetryServices());
  container.bind(TYPES.GardenManageService).toConstantValue(new GardenManageService());
};

const serviceManage = new Container();
registerService(serviceManage);

export { serviceManage };
