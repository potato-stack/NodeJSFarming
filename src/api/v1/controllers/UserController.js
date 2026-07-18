import { StatusCodes } from 'http-status-codes';
import { LoginDto, RegisterDto, UpdateUserDto } from '../../../dtos/User.dto.js';

export class UsersController {
  constructor(userService) {
    this.userService = userService;
  }

  register = async (req, res, next) => {
    try {
      const user = new RegisterDto(req.body);
      const createdUser = await this.userService.register(user);

      res.status(StatusCodes.CREATED).json(createdUser);
    } catch (error) {
      next(error);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const loginInfo = new LoginDto(req.body);
      const response = await this.userService.login(loginInfo);

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  getCurrentUserByID = async (req, res, next) => {
    try {
      const id = req.currentUser.id;
      const user = await this.userService.getUserByID(id);
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  };

  getAllUsers = async (req, res, next) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(StatusCodes.OK).json(users);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const id = req.params.user_id;
      const newUser = new UpdateUserDto(req.body);
      const response = await this.userService.updateUser(newUser, { id: id });
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const id = req.params.user_id;
      const user = await this.userService.deleteUser(id);
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  };
}
