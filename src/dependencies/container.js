import { Container } from "inversify";
import { TYPES } from "./types.js";
import { config } from "../config/Env.js";

// repo
import { UserRepository } from "../infrastructure/persistence/sequelize/repository/UserRepository.js";
import { GardenRepository } from "../infrastructure/persistence/sequelize/repository/GardenRepository.js";
import { DeviceRepository } from "../infrastructure/persistence/sequelize/repository/DeviceRepository.js";
import { UserGardenRepository } from "../infrastructure/persistence/sequelize/repository/userGardenRepository.js";

// service 
import { UsersService } from "../services/UserService.js";
import { GardenService } from "../services/GardenService.js";
import { TelemetryServices } from "../services/TelemetryService.js";
import { UserGardenService } from "../services/UserGardenService.js";

//controller
import { UsersController } from "../api/v1/controllers/UserController.js";
import { GardenController } from "../api/v1/controllers/GardenController.js";
import { TelemetryController } from "../api/v1/controllers/DeviceController.js";
import { UserGardenController } from "../api/v1/controllers/UserGardenController.js";
import { createGardenRouter } from "../api/v1/router/GardenRoutes.js";
import { createUserRouter } from "../api/v1/router/UserRoutes.js";
import { createDeviceRouter } from "../api/v1/router/DeviceRoutes.js";
import { createUserGardenRouter } from "../api/v1/router/UserGardenRoutes.js";
import { createRequireGardenOwner } from "../middlewares/AuthMiddleware.js";


// container
const container = new Container();

//Bind all repo
//TODO: might use multiple database, must consider this. 
container.bind(TYPES.UserRepository).toConstantValue(new UserRepository());
container.bind(TYPES.GardenRepository).toConstantValue(new GardenRepository());
container.bind(TYPES.DeviceRepository).toConstantValue(new DeviceRepository());
container.bind(TYPES.UserGardenRepository).toConstantValue(new UserGardenRepository());

//Services -> repo. 
container.bind(TYPES.UsersService).toConstantValue(
    new UsersService(container.get(TYPES.UserRepository),
    ),
);
container.bind(TYPES.GardenService).toConstantValue(
    new GardenService(container.get(TYPES.GardenRepository),
    ),
);
container.bind(TYPES.TelemetryServices).toConstantValue(
    new TelemetryServices(container.get(TYPES.DeviceRepository),
    ),
);
container.bind(TYPES.UserGardenService).toConstantValue(
    new UserGardenService(
        container.get(TYPES.UserGardenRepository),
        container.get(TYPES.UsersService),
        container.get(TYPES.GardenService),
    ),
);

//Controllers -> services
container.bind(TYPES.UsersController).toConstantValue(
    new UsersController(container.get(TYPES.UsersService),
    ),
);
container.bind(TYPES.GardenController).toConstantValue(
    new GardenController(container.get(TYPES.GardenService),
        container.get(TYPES.UserGardenService),
    ),
);
container.bind(TYPES.TelemetryController).toConstantValue(
    new TelemetryController(container.get(TYPES.TelemetryServices),
    ),
);
container.bind(TYPES.UserGardenController).toConstantValue(
    new UserGardenController(container.get(TYPES.UserGardenService),
    ),
);
container.bind(TYPES.RequireGardenOwner).toConstantValue(
    createRequireGardenOwner(
        container.get(TYPES.UserGardenService),
    ),
);

//Routes -> controller
const [authRouter, userRouter] = createUserRouter(container.get(TYPES.UsersController));
container.bind(TYPES.AuthRouter).toConstantValue(authRouter);
container.bind(TYPES.UserRouter).toConstantValue(userRouter);

container.bind(TYPES.GardenRouter).toConstantValue(
    createGardenRouter(
        container.get(TYPES.GardenController),
        container.get(TYPES.UserGardenController),
        container.get(TYPES.RequireGardenOwner),
    ),
);

container.bind(TYPES.DeviceRouter).toConstantValue(
    createDeviceRouter(
        container.get(TYPES.TelemetryController),
    ),
);

container.bind(TYPES.UserGardenRouter).toConstantValue(
    createUserGardenRouter(
        container.get(TYPES.UserGardenController),
        container.get(TYPES.RequireGardenOwner),
    ),
);

export { container };