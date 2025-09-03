import { UserError } from '../../errors/UserError.js';
import { Name } from '../value_objets/Name.js';
import { Password } from '../value_objets/Password.js';
import { Email } from '../value_objets/Email.js';

export class User {
  constructor(createUserDto) {
    try {
      this.name = new Name(createUserDto.name).value;
      this.email = new Email(createUserDto.email).value;
      this.password = new Password(createUserDto.password).value;
    } catch (error) {
      throw UserError.Validation(error);
    }
  }
}
