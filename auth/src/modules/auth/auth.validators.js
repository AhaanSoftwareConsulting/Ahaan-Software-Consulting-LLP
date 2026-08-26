const { isValidEmailFormat, passwordStrengthErrors } = require('../../utils/validators');
const { ValidationError } = require('../../utils/errors');

function validateRegisterInput({ email, password }) {
  const details = [];
  if (!isValidEmailFormat(email)) details.push({ field: 'email', message: 'Invalid email format' });
  passwordStrengthErrors(password).forEach((msg) => details.push({ field: 'password', message: msg }));
  if (details.length) throw new ValidationError('Invalid request data', details);
}

function validateLoginInput({ email, password }) {
  const details = [];
  if (!isValidEmailFormat(email)) details.push({ field: 'email', message: 'Invalid email format' });
  if (!password) details.push({ field: 'password', message: 'Password is required' });
  if (details.length) throw new ValidationError('Invalid request data', details);
}

module.exports = { validateRegisterInput, validateLoginInput };
