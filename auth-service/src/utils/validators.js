const config = require('../config/config');

function passwordStrengthErrors(password) {
  const errors = [];
  const minLength = config.loginPolicy.minPasswordLength;

  if (!password || password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }
  if (!/[A-Z]/.test(password || '')) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password || '')) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password || '')) {
    errors.push('Password must contain at least one digit');
  }
  return errors;
}

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function isValidEmailFormat(email) {
  return EMAIL_REGEX.test(email || '');
}

module.exports = { passwordStrengthErrors, isValidEmailFormat };
