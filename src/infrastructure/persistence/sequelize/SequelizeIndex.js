import { Devices } from "./models/Device.js";
import { Gardens } from "./models/Garden.js";
import { Users } from "./models/User.js";
import { UserGardens } from "./models/UserGarden.js";

Users.belongsToMany(Gardens, { through: UserGardens, foreignKey: "user_id" });
Gardens.belongsToMany(Users, { through: UserGardens, foreignKey: "garden_id" });

Gardens.hasMany(Devices, {foreignKey: "garden_id"});
Devices.belongsTo(Gardens, {foreignKey: "garden_id"});

export { Devices, Gardens, Users, UserGardens };