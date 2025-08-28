import { Users } from '../models/UserModel';
import { UserError } from '../errors/UserError';
import { HandleDBError } from '../errors/ServerError';

// CRUD
export class UsersService {
  // For mock only
  // I am so tried :((
  constructor() {
    this.gardens = [
      { id: 1, name: 'Rose Garden', location_text: 'North side of park' },
      { id: 2, name: 'Tropical Garden', location_text: 'Greenhouse' },
      { id: 3, name: 'Herb Garden', location_text: 'Backyard' },
    ];

    // To mock we will have a user hold abunch of garden in Array manner!
    this.userGardens = {};
  }
  
  async createUser(props) {
    try {
      const newUser = await Users.create({ ...props });
      return newUser;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') throw UserError.Conflict();
      HandleDBError(error);
    }
  }

  async getUserBy(id) {
    try {
      const user = await Users.findByPk(id);
      if (!user) {
        throw UserError.NotFound(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      HandleDBError(error);
    }
  }

  async getAllUsers() {
    try {
      const users = await Users.findAll();
      if (users.length === 0) {
        throw UserError.NotFound('No user found');
      }
      return users;
    } catch (error) {
      HandleDBError(error);
    }
  }

  async updateUser(id, props) {
    try {
      const [affectedCount] = await Users.update(id, { ...props });
      if (affectedCount === 0) {
        throw UserError.NotFound(`User with ID ${id} not found`);
      }
      return { status: 'success', message: `User with ID ${id} updated successfully` };
    } catch (error) {
      HandleDBError(error);
    }
  }

  async deleteUser(id) {
    try {
      const affectedCount = await Users.destroy({ where: { id } });

      if (affectedCount === 0) {
        throw UserError.NotFound();
      }
      return { status: 'success', message: `User of id: ${id} is deleted sucessfully` };
    } catch (error) {
      HandleDBError(error);
    }
  }

  async adduserToGarden(userId, gardenId, role) {
    const garden = this.gardens.find((garden) => garden.id === gardenId);
    if (!garden) throw UserError.NotFound('Cannot find garden to add user!');

    if (!this.userGardens[userId]) this.userGardens[userId] = [];
    else if (this.userGardens[userId].includes(gardenid)) {
      throw UserError.Conflict('User already assigned to this garden!');
    }

    this.userGardens[userId].push(gardenId);
    return { userId, gardenId, role };
  }

  async removeUserFromGarden(userId, gardenId) {
    try {
      if (!this.userGardens[userId] || !this.userGardens[userId].includes(gardenId)) {
        throw new UserError.NotFound('User is not assigned to this garden');
      }

      this.userGardens[userId] = this.userGardens[userId].filter((id) => id !== gardenId);
      return { userId, gardenId };
    } catch (error) {
      HandleDBError(error);
    }
  }

  async getAllGardensOfUser(userId) {
    if (!this.userGardens[userId]) return [];
    return this.gardens.filter((garden) => this.userGardens[userId].includes(garden.id));
  }
}
