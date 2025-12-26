import { ServerError } from '../errors/ServerError.js';
import xss from 'xss';

// So been caring much about security mr Duy
// If you read this comment then rating this part
// I really dont' have much time and reading document is driving me nut
// I want to WANK

// Sanitizer
const sanitizer = (input) => {
  if (Array.isArray(input)) {
    // Handle array
    for (let i = 0; i < input.length; i++) {
      if (typeof input[i] === 'string') {
        input[i] = xss(input[i]);
      } else if (typeof input[i] === 'object' && input[i] !== null) {
        sanitizeInPlace(input[i]); // recurse
      }
    }
  } else if (typeof input === 'object' && input !== null) {
    // Handle object
    for (const key in input) {
      if (typeof input[key] === 'string') {
        input[key] = xss(input[key]);
      } else if (typeof input[key] === 'object' && input[key] !== null) {
        sanitizeInPlace(input[key]); // recurse
      }
    }
  }
};

export const validate = (schema, property) => (req, res, next) => {
  // Sanitized
  sanitizer(req.body);
  sanitizer(req.query);
  sanitizer(req.params);

  // Parsing
  const { error } = schema.validate(req[property], { abortEarly: false });
  if (error) return next(ServerError.BadRequest(error.details.map((d) => d.message).join(', ')));
  next();
};

export const validateCookie = (schema, next) => (req, res, next) => {
  const { error } = schema.validate(req.cookies);
  if (error) return next(ServerError.BadRequest(error.details.map((d) => d.message).join(', ')));
  next();
};
