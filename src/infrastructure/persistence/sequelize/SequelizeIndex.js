import { Sequelize } from "sequelize";
import { TelemetryDevices } from "./Device.js";
import { Gardens } from "./Garden.js";
import { Users } from "./User.js";
import { UserGardens } from "./UserGarden.js";

Users.belongsToMany(Gardens, { through: UserGardens, foreignKey: "user_id" });
Gardens.belongsToMany(Users, { through: UserGardens, foreignKey: "garden_id" });

export { TelemetryDevices, Gardens, Users, UserGardens };