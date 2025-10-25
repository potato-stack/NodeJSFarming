import Joi from 'joi';
import { ServerError } from '../../errors/ServerError.js';
import bcrypt from 'bcrypt'

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 12);
};
export class Password {
   constructor(value) {
    const schema = Joi.string()
      .min(8)
      .required()
      .messages({ 'string.min': 'Password must be atleast 8 characters long' });

    const { error } = schema.validate(value);
    if (error) {
      throw ServerError.DomainError(`Pass Error: ${error.details.map((d) => d.message).join(', ')}`);
    }
    this.value = hashPassword(value);
  }

  equals = async (input) => {
    return bcrypt.compare(input, this.hash);
  } 
}
