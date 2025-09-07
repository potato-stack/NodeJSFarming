import { UserError } from '../../errors/UserError.js';
import { Roles } from '../value_objets/roles.js';

export class UserGarden {
  constructor(userGardenData) {
    try {
      // No need construct value here since two id only key
      this.user_id = userGardenData.user_id;
      this.garden_id = userGardenData.garden_id;
      this.role = new Roles(userGardenData.role);
    } catch (error) {
      throw UserError.Validation(error);
    }
  }

  isAdmin() {
    return this.role === 'admin';
  }

  isMember() {
    return this.role === 'member';
  }

  isUser() {
    return this.role === 'user';
  }

  setRole(newRole) {
	this.role = new Roles(newRole);
  }
}
