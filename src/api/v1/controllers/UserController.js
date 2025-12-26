import { StatusCodes } from 'http-status-codes';
import { LoginDto, RegisterDto, UpdateUserDto } from '../../../dtos/User.dto.js';
import { serviceManage } from '../../../dependencies/bindingService.js';
import { TYPES } from '../../../dependencies/types.js';

const userService = serviceManage.get(TYPES.UsersService);

export class UsersController {
  register = async (req, res, next) => {
    try {
      const user = new RegisterDto(req.body);
      const createdUser = await userService.register(user);

      res.status(StatusCodes.CREATED).json(createdUser);
    } catch (error) {
      next(error);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const loginInfo = new LoginDto(req.body);
      const response = await userService.login(loginInfo);

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  getCurrentUserByID = async (req, res, next) => {
    try {
      const id = req.currentUser.id;
      const user = await userService.getUserByID(id);
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  };

  getAllUsers = async (req, res, next) => {
    try {
      const users = await userService.getAllUsers();
      res.status(StatusCodes.OK).json(users);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const id = req.params.user_id;
      const newUser = new UpdateUserDto(req.body);
      const response = await userService.updateUser(newUser, { id: id });
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const id = req.params.user_id;
      const user = await userService.deleteUser(id);
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  };
}
