import Joi from 'joi';
import { ServerError } from '../../errors/ServerError.js';

export class Roles {
  constructor(value) {
    const schema = Joi.string()
      .valid('owner', 'member', 'guest')
      .required()
      .messages({ 'any.only': 'Invalid role . Must be one of: owner, member, guest' });

    const { error } = schema.validate(value);
    if (error) {
      throw ServerError.DomainError(`Errors: ${error.details.map((d) => d.message).join(', ')}`);
    }
    this.value = value;
  }

  static owner = 'owner';
  static member = 'member';
  static guest = 'guest';
}
