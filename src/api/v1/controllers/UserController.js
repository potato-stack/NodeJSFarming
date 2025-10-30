import { StatusCodes } from 'http-status-codes';
import { UsersService } from '../../../services/UserService.js';
import { LoginDto, RegisterDto, UpdateUserDto } from '../../../dtos/User.dto.js';

export class UsersController {
  register = async (req, res, next) => {
    try {
      const user = new RegisterDto(req.body);
      const createdUser = await UsersService.getInstance().register(user);

      res.status(StatusCodes.CREATED).json(createdUser);
    } catch (error) {
      next(error);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const loginInfo = new LoginDto(req.body);
      const response = await UsersService.getInstance().login(loginInfo);

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  getCurrentUserByID = async (req, res, next) => {
    try {
      const id = req.currentUser.id;
      const device = await UsersService.getInstance().getUserByID(id);
      res.status(StatusCodes.OK).json(device);
    } catch (error) {
      next(error);
    }
  };

  getAllUsers = async (req, res, next) => {
    try {
      const users = await UsersService.getInstance().getAllUsers();
      res.status(StatusCodes.OK).json(users);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const id = req.params.user_id;
      const newUser = new UpdateUserDto(req.body);
      const response = await UsersService.getInstance().updateUser(newUser, { id: id });
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const id = req.params.user_id;
      const user = await UsersService.getInstance().deleteUser(id);
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  };
}
