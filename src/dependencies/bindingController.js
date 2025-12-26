import { Container } from 'inversify';
import { TYPES } from './types.js';
import { TelemetryController } from '../api/v1/controllers/DeviceController.js';
import { UsersController } from '../api/v1/controllers/UserController.js';
import { GardenController } from '../api/v1/controllers/GardenController.js';
import { UserGardenSharedController } from '../api/v1/controllers/UserGardenController.js';

const registerController = (container) => {
  container.bind(TYPES.TelemetryController).toConstantValue(new TelemetryController());
  container.bind(TYPES.UsersController).toConstantValue(new UsersController());
  container.bind(TYPES.GardenController).toConstantValue(new GardenController());
  container.bind(TYPES.UserGardenSharedController).toConstantValue(new UserGardenSharedController());
};

const controllerManage = new Container();
registerController(controllerManage);

export { controllerManage };
