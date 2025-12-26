import Joi from 'joi';
import { ServerError } from '../../errors/ServerError.js';

export class DeviceLocation {
  constructor(value) {
    const schema = Joi.string().optional().empty('').default('Unknow');

    const { error } = schema.validate(value);
    // Optional, call 3rd party to validate the location
    if (error) {
      throw ServerError.DomainError(`Errors: ${error.details.map((d) => d.message).join(', ')}`);
    }
    this.value = value;
  }
}
