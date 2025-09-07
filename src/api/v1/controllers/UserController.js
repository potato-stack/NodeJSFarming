import { StatusCodes } from 'http-status-codes';
import { UsersService } from '../../../services/UserService.js';
import { LoginDto, RegisterDto } from '../../../dtos/User.dto.js';

export class UsersController {
  static userServices = null;

  static getService() {
    if (!UsersController.userServices) {
      UsersController.userServices = new UsersService();
    }
    return UsersController.userServices;
  }

  register = async (req, res, next) => {
    try {
      const user = new RegisterDto(req.body);
      const createdUser = await UsersController.getService().register(user);

      res.status(StatusCodes.CREATED).json(createdUser);
    } catch (error) {
      next(error);
    }
  }

  loginUser = async (req, res, next) => {
    try {
      const loginInfo = new LoginDto(req.body);
      const response = await UsersController.getService().login(loginInfo);

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  getUserByID = async (req, res, next) => {
    try {
      const id = req.user.id;
      const device = await UsersController.getService().getUserByID(id);
      res.status(StatusCodes.OK).json(device);
    } catch (error) {
      next(error);
    }
  }

  getAllUsers = async (req, res, next) => {
    try {
      const users = await UsersController.getService().getAllUsers();
      res.status(StatusCodes.OK).json(users);
    } catch (error) {
      next(error);
    }
  }

  updateUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      const newUser = new RegisterDto(req.body);
      const response = await UsersController.getService().createUser(newUser, {
        where: { id: id },
      });
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(errora);
    }
  }

  deleteUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await UsersController.getService().deleteUser(id);
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  }
}
