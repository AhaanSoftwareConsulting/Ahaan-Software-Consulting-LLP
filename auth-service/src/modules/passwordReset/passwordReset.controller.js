const service = require('./passwordReset.service');
const { isValidEmailFormat, passwordStrengthErrors } = require('../../utils/validators');
const { ValidationError } = require('../../utils/errors');

async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    if (!isValidEmailFormat(email)) throw new ValidationError('Invalid email');

    await service.requestReset(email);
    res.status(200).json({ message: "If an account with that email exists, we've sent instructions." });
  } catch (err) {
    next(err);
  }
}

async function resetPassword(req, res, next) {
  try {
    const { token, new_password: newPassword } = req.body;
    const errors = passwordStrengthErrors(newPassword);
    if (errors.length) throw new ValidationError('Invalid password', errors.map((message) => ({ message })));

    await service.resetPassword(token, newPassword);
    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (err) {
    next(err);
  }
}

module.exports = { forgotPassword, resetPassword };
