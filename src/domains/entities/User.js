import { UserError } from '../../errors/UserError.js';
import { Name } from '../value_objets/Name.js';
import { Password } from '../value_objets/Password.js';
import { Email } from '../value_objets/Email.js';
import { Entities } from './Entities.js';
import { v4 as uuidv4 } from 'uuid';

export class User extends Entities {
  constructor(userProps) {
    super();
    this.id = userProps?.id ? userProps.id : uuidv4();
    this.name = userProps?.name ? new Name(userProps.name) : undefined;
    this.email = userProps?.email ? new Email(userProps.email) : undefined;
    this.password = userProps?.password ? new Password(userProps.password) : undefined;
    if (this.id === undefined) throw UserError.DomainError('Invalid User ID');
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getPass() {
    return this.password;
  }
}
