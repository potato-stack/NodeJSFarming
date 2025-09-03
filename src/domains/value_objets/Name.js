import Joi from 'joi';
import { ServerError } from '../../errors/ServerError.js';

export class Name {
  constructor(value) {
    const schema = Joi.string().min(1).max(50).required().messages({
      'string.min': 'Name must be atleast 1 character',
      'string.max': 'Name must not exceed 50 character',
    });
    const { error } = schema.validate(value);
    if (error) {
      throw ServerError.DomainError(`Name Error: ${error.details.map((d) => d.message).join(', ')}`);
    }
	this.value = value;
  }
}
