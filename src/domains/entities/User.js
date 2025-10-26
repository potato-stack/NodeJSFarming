import { UserError } from '../../errors/UserError.js';
import { Name } from '../value_objets/Name.js';
import { Password } from '../value_objets/Password.js';
import { Email } from '../value_objets/Email.js';
import { Entities } from './Entities.js';

export class User extends Entities{
  constructor(userProps) {
    try {
      super();
      this.id = userProps?.id ? userProps.id : undefined;
      this.name = userProps?.name ? new Name(userProps.name) : undefined;
      this.email = userProps?.email ? new Email(userProps.email) : undefined;
      this.password = userProps?.password ? new Password(userProps.password) : undefined;
    } catch (error) {
      throw UserError.Validation(error);
    }
  }
}
