import { User } from '../domains/entities/User.js';
import { UserError } from '../errors/UserError.js';
import jwt from 'jsonwebtoken';
import { UserInfoDto, LoginResponseDto } from '../dtos/User.dto.js';
import { repositoryManage } from '../dependencies/bindingInfra.js';
import { TYPES } from '../dependencies/types.js';
import { config } from '../config/Env.js';

const userRepository = repositoryManage.get(TYPES.UserRepository);
// Private methods
const createJWT = (payload, expireTime) => {
  return { token: jwt.sign(payload, config.AUTH.JWT_SECRET, { expiresIn: expireTime }) };
};

export class UsersService {
  register = async (userDto) => {
    const user = new User(userDto);
    user.password.hashPassword();
    const newUser = await userRepository.create(user);
    return new UserInfoDto(newUser);
  };

  login = async (loginDto) => {
    const { email, password } = loginDto;
    const users = await userRepository.get({ email });
    if (!users || users.length == 0) {
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
  };

  getUserByID = async (id) => {
    const user = await userRepository.getByID(id);
    if (!user) {
      throw UserError.NotFound(`User with ID ${id} not found`);
    }
    return new UserInfoDto(user);
  };

  getAllUsers = async () => {
    const users = await userRepository.get();
    return users.map((r) => new UserInfoDto(r));
  };

  updateUser = async (userDto) => {
    const targetUpdate = new User(userDto);
    const id = userDto.id;
    const [affectedCount] = await userRepository.update(targetUpdate, { id: id });
    if (affectedCount === 0) {
      throw UserError.NotFound(`User with ID ${targetUpdate.id} not found`);
    }
    return { status: 'success', message: `User with ID ${targetUpdate.id} updated successfully` };
  };

  deleteUser = async (id) => {
    const affectedCount = await userRepository.delete({ id: id });

    if (affectedCount === 0) {
      throw UserError.NotFound();
    }
    return { status: 'success', message: `User of id: ${id} is deleted sucessfully` };
  };

  static instance = null;
  static getInstance() {
    if (!UsersService.instance) {
      UsersService.instance = new UsersService();
    }
    return UsersService.instance;
  }
}
