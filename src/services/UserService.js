import { User } from '../domains/entities/User.js';
import { UserRepository } from '../infrastructure/repository/UserRepository.js';
import { UserError } from '../errors/UserError.js';
import { HandleServerError } from '../errors/ServerError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const userRepository = new UserRepository();
// Private methods
const createJWT = (payload, expireTime) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expireTime });
};

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

  // Public
  register = async (userDto) => {
    try {
      const user = new User(userDto, true);
      return await userRepository.create(user);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') throw UserError.Conflict();
      HandleServerError(error);
    }
  };

  login = async (loginDto) => {
    try {
      const { email, password } = loginDto;
      const [user] = await userRepository.get({email});
      if (!user) {
        throw UserError.NotFound();
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw UserError.Unauthorized('Wrong password! Please re-enter');
      }
      // Use private method
      const token = createJWT({ id: user.id, email: user.email }, '30m');
      return { token, user };
    } catch (error) {
      HandleServerError(error);
    }
  };

  getUserByID = async (id) => {
    try {
      const user = await userRepository.getByID(id);
      if (!user) {
        throw UserError.NotFound(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      HandleServerError(error);
    }
  };

  getAllUsers = async () => {
    try {
      const users = await userRepository.get();
      if (users.length === 0) {
        throw UserError.NotFound('No user found');
      }
      return users;
    } catch (error) {
      HandleServerError(error);
    }
  };

  updateUser = async (userDto) => {
    try {
      const targetUpdate = new User(userDto);
      const [affectedCount] = await userRepository.update(targetUpdate);
      if (affectedCount === 0) {
        throw UserError.NotFound(`User with ID ${targetUpdate.id} not found`);
      }
      return { status: 'success', message: `User with ID ${targetUpdate.id} updated successfully` };
    } catch (error) {
      HandleServerError(error);
    }
  };

  deleteUser = async (id) => {
    try {
      const affectedCount = await userRepository.delete(id);

      if (affectedCount === 0) {
        throw UserError.NotFound();
      }
      return { status: 'success', message: `User of id: ${id} is deleted sucessfully` };
    } catch (error) {
      HandleServerError(error);
    }
  };

  adduserToGarden = async (userId, gardenId, role) => {
    const garden = this.gardens.find((garden) => garden.id === gardenId);
    if (!garden) throw UserError.NotFound('Cannot find garden to add user!');

    if (!this.userGardens[userId]) this.userGardens[userId] = [];
    else if (this.userGardens[userId].includes(gardenid)) {
      throw UserError.Conflict('User already assigned to this garden!');
    }

    this.userGardens[userId].push(gardenId);
    return { userId, gardenId, role };
  };

  removeUserFromGarden = async (userId, gardenId) => {
    try {
      if (!this.userGardens[userId] || !this.userGardens[userId].includes(gardenId)) {
        throw new UserError.NotFound('User is not assigned to this garden');
      }

      this.userGardens[userId] = this.userGardens[userId].filter((id) => id !== gardenId);
      return { userId, gardenId };
    } catch (error) {
      HandleServerError(error);
    }
  };

  getAllGardensOfUser = async (userId) => {
    if (!this.userGardens[userId]) return [];
    return this.gardens.filter((garden) => this.userGardens[userId].includes(garden.id));
  };
}
