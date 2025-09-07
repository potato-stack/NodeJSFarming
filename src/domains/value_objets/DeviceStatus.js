import Joi from 'joi';
import { ServerError } from '../../errors/ServerError.js';

export class DeviceStatus {
  constructor(value) {
    const schema = Joi.string()
      .valid('online', 'offline', 'error')
      .required()
      .messages({ 'any.only': 'Invalid status . Must be one of: online, offline, error' });

    const { error } = schema.validate(value);
    if (error) {
      throw ServerError.DomainError(`Errors: ${error.details.map((d) => d.message).join(', ')}`);
    }
    this.value = value;
  }
}
