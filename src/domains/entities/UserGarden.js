import { ServerError } from '../../errors/ServerError.js';
import { UserError } from '../../errors/UserError.js';
import { Roles } from '../value_objets/roles.js';
import { Entities } from './Entities.js';

export class UserGarden extends Entities {
  constructor(userGardenProps) {
    super();
    // No need construct value here since two id only key
    this.user_id = userGardenProps?.user_id ? userGardenProps.user_id : undefined;
    this.garden_id = userGardenProps?.garden_id ? userGardenProps.garden_id : undefined;
    this.role = userGardenProps?.role ? new Roles(userGardenProps.role) : undefined;
    if (this.user_id === undefined) throw ServerError.DomainError('Invalid User ID');
    if (this.garden_id === undefined) throw ServerError.DomainError('Invalid Garden ID');
    if (this.role === undefined) this.role = 'guest';
  }

  isAdmin() {
    return this.role === Roles.owner;
  }

  isMember() {
    return this.role === Roles.member;
  }

  isGuest() {
    return this.role === Roles.guest;
  }

  getRole() {
    return this.role;
  }
}
