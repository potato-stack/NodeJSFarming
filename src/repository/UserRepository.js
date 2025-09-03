import { User } from '../domains/UserModel';
import { Users } from './sequelize/User';

// Private methods
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

export class userRepository {
  getByID = async (id) => {
    const user = await Users.findByPk(id);
    if (!user) return null;
    return new User(user);
  };

  getAll = async (where) => {
    const users = await Users.findAll(Object.keys(where).length > 0 ? { where } : undefined);
    if (users.length === 0) return null;
    return users.map((user) => new User(user));
  };

  create = async (user) => {
    const newUser = await Users.create({ ...user });
    return new User(newUser);
  };

  updateUser = async (newUser, where) => {
    const [affectedCount] = await Users.update(newUser, { where });
    return affectedCount > 0;
  };

  deleteUser = async (where) => {
    const affectedCount = await Users.destroy({ where });
    return affectedCount > 0;
  };
}
