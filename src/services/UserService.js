import { User } from '../domains/entities/User.js';
import { UserRepository } from '../infrastructure/repository/UserRepository.js';
import { UserError } from '../errors/UserError.js';
import { HandleServerError } from '../errors/ServerError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userRepository = new UserRepository();
// Private methods
const createJWT = (payload, expireTime) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expireTime });
};

export class UsersService {
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
      const [user] = await userRepository.get({ email });
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
      return users;
    } catch (error) {
      HandleServerError(error);
    }
  };

  updateUser = async (userDto, where) => {
    try {
      const targetUpdate = new User(userDto);
      const [affectedCount] = await userRepository.update(targetUpdate, where);
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
}
