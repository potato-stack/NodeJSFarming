import { UserError } from '../../errors/UserError.js';
import { Name } from '../value_objets/Name.js';
import { Password } from '../value_objets/Password.js';
import { Email } from '../value_objets/Email.js';

export class User {
  constructor(userProps) {
    try {
      this.name = userProps?.name ? new Name(userProps.name).value : undefined;
      this.email = userProps?.email ? new Email(userProps.email).value : undefined;
      this.password = userProps?.password ? new Password(userProps.password).value : undefined;
    } catch (error) {
      throw UserError.Validation(error);
    }
  }
}
