import { User } from '../domains/entities/User.js';
import { UserRepository } from '../infrastructure/repository/userRepository.js';
import { UserError } from '../errors/UserError.js';
import { HandleServerError } from '../errors/ServerError.js';
import jwt from 'jsonwebtoken';
import { UserInfoDto, LoginResponseDto } from '../dtos/User.dto.js';

const userRepository = new UserRepository();
// Private methods
const createJWT = (payload, expireTime) => {
  return { token: jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expireTime }) };
};

export class UsersService {
  register = async (userDto) => {
    try {
      const user = new User(userDto);
      user.password.hashPassword();
      const newUser = await userRepository.create(user);
      return new UserInfoDto(newUser);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') throw UserError.Conflict();
      HandleServerError(error);
    }
  };

  login = async (loginDto) => {
    try {
      const { email, password } = loginDto;
      const users = await userRepository.get({ email });
      if (users.length == 0) {
        throw UserError.NotFound();
      }
      const [user] = users;
      const isMatch = await user.password.equals(password);
      if (!isMatch) {
        throw UserError.Unauthorized('Wrong password! Please re-enter');
      }
      // Use private method
      const token = createJWT({ id: user.id, email: user.email }, '24h');
      return new LoginResponseDto(token);
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
      return new UserInfoDto(user);
    } catch (error) {
      HandleServerError(error);
    }
  };

  getAllUsers = async () => {
    try {
      const users = await userRepository.get();
      return users.map((r) => new UserInfoDto(r));
    } catch (error) {
      HandleServerError(error);
    }
  };

  updateUser = async (userDto) => {
    try {
      const targetUpdate = new User(userDto);
      const targetId = userDto.targetId;
      const [affectedCount] = await userRepository.update(targetUpdate, { id: targetId });
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
      const affectedCount = await userRepository.delete({ id: id });

      if (affectedCount === 0) {
        throw UserError.NotFound();
      }
      return { status: 'success', message: `User of id: ${id} is deleted sucessfully` };
    } catch (error) {
      HandleServerError(error);
    }
  };

  static instance = null;
  static getInstance() {
    if (!UsersService.instance) {
      UsersService.instance = new UsersService();
    }
    return UsersService.instance;
  }
}
