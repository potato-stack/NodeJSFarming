import { Sequelize } from "sequelize";
import { TelemetryDevices } from "./Device";
import { Gardens } from "./Garden";
import { Users } from "./User";
import { UserGardens } from "./UserGarden";

Users.belongsToMany(Gardens, { through: UserGardens, foreignKey: "user_id" });
Gardens.belongsToMany(Users, { through: UserGardens, foreignKey: "garden_id" });

export { TelemetryDevices, Gardens, Users, UserGardens };