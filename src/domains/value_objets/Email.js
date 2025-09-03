import Joi from 'joi';
import { ServerError } from '../../errors/ServerError.js';

export class Email {
  constructor(value) {
    const schema = Joi.string()
      .email()
      .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
      .required()
      .messages({
        'string.pattern.base': 'Only Gmail addresses are allowed',
        'string.email': 'Must be a valid email address',
      });

    const { error } = schema.validate(value);
    if (error) {
      ServerError.DomainError(`Emails Error: ${error.details.map((d) => d.message).join(', ')}`);
    }
    this.value = value;
  }
}
