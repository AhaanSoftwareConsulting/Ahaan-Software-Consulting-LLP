const service = require('./emailVerification.service');
const { isValidEmailFormat } = require('../../utils/validators');
const { ValidationError } = require('../../utils/errors');

async function resend(req, res, next) {
  try {
    const { email } = req.body;
    if (!isValidEmailFormat(email)) throw new ValidationError('Invalid email');

    await service.sendVerification(email);
    res.status(200).json({ message: 'If an account with that email exists, a verification link has been sent.' });
  } catch (err) {
    next(err);
  }
}

async function verify(req, res, next) {
  try {
    const { token } = req.body;
    await service.verify(token);
    res.status(200).json({ message: 'Email verified successfully.' });
  } catch (err) {
    next(err);
  }
}

module.exports = { resend, verify };
