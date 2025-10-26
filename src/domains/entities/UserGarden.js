import { UserError } from '../../errors/UserError.js';
import { Roles } from '../value_objets/roles.js';
import { Entities } from './Entities.js';

export class UserGarden extends Entities{
  constructor(userGardenProps) {
    try {
      super();
      // No need construct value here since two id only key
      this.user_id = userGardenProps?.user_id ? userGardenProps.user_id : undefined;
      this.garden_id = userGardenProps?.garden_id ? userGardenProps.garden_id : undefined;
      this.role = userGardenProps?.role ? new Roles(userGardenProps.role) : undefined;
    } catch (error) {
      throw UserError.Validation(error);
    }
  }

  isAdmin() {
    return this.role === 'owner';
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
