import { BaseRepository } from './Repository.js';
import { User } from '../../domains/entities/User.js';
import { Users } from '../persistence/sequelize/User.js';

export class UserRepository extends BaseRepository {
  constructor() {
    super(Users, User);
  }
}
