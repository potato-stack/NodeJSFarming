import Joi from 'joi';
import { ServerError } from '../../errors/ServerError.js';

export class DeviceType {
  constructor(value) {
    const schema = Joi.string()
      .valid('sensor', 'actuator', 'gateway')
      .required()
      .messages({ 'any.only': 'Invalid device type. Must be one of: sensor, actuator, gateway' });

    const { error } = schema.validate(value);
    if (error) {
      throw ServerError.DomainError(`Errors: ${error.details.map((d) => d.message).join(', ')}`);
    }
    this.value = value;
  }
}
